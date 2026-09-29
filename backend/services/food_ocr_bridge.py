"""
SatyaDrishti Cloud-Compatible Food Package OCR Bridge
======================================================

Self-contained, cloud-deployable OCR engine for food packaging statutory
field extraction. No Mac-only dependencies.

Engine priority order (auto-detected at import):
  1. EasyOCR   — GPU/CPU, Linux/Mac/Windows, best accuracy after PaddleOCR
  2. Tesseract  — pytesseract, available via `apt-get install tesseract-ocr`
  3. Fallback   — Returns clear error so the UI can show a helpful message

All entity-extraction regexes are identical to the original food_package_ocr
postprocessing.py — MRP, Net Qty, MFD, Expiry, Batch, FSSAI, Ingredients,
Customer Care, Dietary Type.

Install dependencies (add to Render build command or requirements.txt):
  pip install easyocr pillow opencv-python-headless numpy
  -- OR --
  pip install pytesseract pillow opencv-python-headless numpy
  apt-get install -y tesseract-ocr

Usage:
  from food_ocr_bridge import run_local_packaging_ocr
  result = run_local_packaging_ocr(image_bytes)  # bytes, path, or base64 str
"""

import io
import re
import time
import base64
import logging
from typing import Union, Dict, Any, List, Optional

import numpy as np
import cv2
from PIL import Image, ImageOps

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────────────
# Engine Detection (graceful — no crash if not installed)
# ─────────────────────────────────────────────────────────────────────────────

# Engine availability flags
_EASYOCR_READER = None
EASYOCR_AVAILABLE = False
TESSERACT_AVAILABLE = False

# ── Tesseract: free-tier safe, ~50MB RAM, runs on any server ──────────────────
try:
    import pytesseract
    pytesseract.get_tesseract_version()
    TESSERACT_AVAILABLE = True
    logger.info("[FoodOCR] Tesseract detected and ready.")
except Exception:
    logger.info("[FoodOCR] Tesseract not available (install tesseract-ocr binary + pytesseract).")

# ── EasyOCR: higher accuracy but needs ~1.5GB RAM (paid/local only) ───────────
try:
    import easyocr
    EASYOCR_AVAILABLE = True
    logger.info("[FoodOCR] EasyOCR detected (high-accuracy mode available).")
except ImportError:
    logger.info("[FoodOCR] EasyOCR not installed (free-tier mode, using Tesseract).")

BRIDGE_READY = TESSERACT_AVAILABLE or EASYOCR_AVAILABLE

# Priority: Tesseract first (free-tier safe), EasyOCR if Tesseract unavailable
ENGINE_NAME = (
    "Tesseract" if TESSERACT_AVAILABLE
    else "EasyOCR" if EASYOCR_AVAILABLE
    else "None"
)

logger.info(f"[FoodOCR] Active engine: {ENGINE_NAME}  bridge_ready={BRIDGE_READY}")


def _get_easyocr_reader():
    """Singleton EasyOCR reader (lazy-loaded, GPU auto-detect)."""
    global _EASYOCR_READER
    if _EASYOCR_READER is None and EASYOCR_AVAILABLE:
        # gpu=False is safe on CPU-only servers; EasyOCR auto-detects CUDA
        _EASYOCR_READER = easyocr.Reader(['en'], gpu=False, verbose=False)
    return _EASYOCR_READER


# ─────────────────────────────────────────────────────────────────────────────
# Image Preprocessing  (mirrors preprocessing.py from food_package_ocr)
# ─────────────────────────────────────────────────────────────────────────────

def _load_image(image_input: Union[str, bytes, np.ndarray]) -> np.ndarray:
    """
    Accepts file path (str), raw bytes, base64 str, or OpenCV array.
    Returns OpenCV BGR numpy array with EXIF orientation corrected.
    """
    if isinstance(image_input, np.ndarray):
        return image_input

    if isinstance(image_input, bytes):
        pil_img = Image.open(io.BytesIO(image_input))
    elif isinstance(image_input, str):
        if image_input.startswith("data:") or (len(image_input) > 200 and "\n" not in image_input[:50]):
            # Looks like a base64 data URI or raw base64
            raw = image_input.split(",", 1)[-1]
            pil_img = Image.open(io.BytesIO(base64.b64decode(raw)))
        else:
            # File path
            pil_img = Image.open(image_input)
    else:
        raise ValueError(f"Unsupported image input type: {type(image_input)}")

    # Fix EXIF rotation (critical for phone camera uploads)
    pil_img = ImageOps.exif_transpose(pil_img)
    if pil_img.mode != "RGB":
        pil_img = pil_img.convert("RGB")
    return cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)


def _preprocess(img: np.ndarray, max_dim: int = 1920, min_dim: int = 720) -> np.ndarray:
    """
    Resize to optimal dimensions for OCR speed + accuracy.
    Mirrors adaptive_preprocess() from preprocessing.py.
    """
    h, w = img.shape[:2]
    longest, shortest = max(h, w), min(h, w)

    if longest > max_dim:
        scale = max_dim / float(longest)
        img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
    elif shortest < min_dim:
        scale = min_dim / float(shortest)
        img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_CUBIC)

    return img


# ─────────────────────────────────────────────────────────────────────────────
# OCR Execution
# ─────────────────────────────────────────────────────────────────────────────

def _run_easyocr(img: np.ndarray) -> List[str]:
    """
    Runs EasyOCR on a BGR OpenCV image.
    Returns list of text lines in rough reading order (EasyOCR sorts top-down).
    """
    reader = _get_easyocr_reader()
    # EasyOCR expects RGB
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = reader.readtext(rgb, detail=1, paragraph=False)
    # results: [(bbox, text, conf), ...]
    # Sort by vertical position (top-left y of bbox)
    results_sorted = sorted(results, key=lambda r: r[0][0][1])  # [0][0][1] = top-left y
    return [text for (_, text, conf) in results_sorted if text.strip()]


def _run_tesseract(img: np.ndarray) -> List[str]:
    """
    Runs Tesseract OCR on a BGR OpenCV image with multi-pass strategy.
    Pass 1: psm 6 (uniform block of text — good for well-formatted labels)
    Pass 2: psm 11 (sparse text — catches scattered elements like MRP stamps)
    Merges unique lines from both passes for maximum field coverage.
    """
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(rgb)

    all_lines: list = []
    seen = set()

    for psm in ['--psm 6 --oem 3', '--psm 11 --oem 3', '--psm 3 --oem 3']:
        try:
            raw = pytesseract.image_to_string(pil_img, lang='eng', config=psm)
            for line in raw.splitlines():
                line = line.strip()
                if line and line not in seen:
                    seen.add(line)
                    all_lines.append(line)
        except Exception:
            continue

    return all_lines


# ─────────────────────────────────────────────────────────────────────────────
# Entity Extraction  (mirrors extract_food_fields() from postprocessing.py)
# ─────────────────────────────────────────────────────────────────────────────

def _normalize(text: str) -> str:
    return re.sub(r"[ \t]+", " ", text).strip()


def _fix_ocr_noise(text: str) -> str:
    """
    Corrects common EasyOCR/Tesseract character confusions in food label text.
    Handles dates, email/phone formatting, MRP decimals, FSSAI codes, dietary markers.
    """
    # ── Date normalisation ────────────────────────────────────────────────────
    # "15,08/2026" or "15.08/2026" → "15/08/2026"
    text = re.sub(r"(\d{1,2})[,\.](\d{2})[/](\d{4})", r"\1/\2/\3", text)
    text = re.sub(r"(\d{1,2})[,\.](\d{2})[,\.](\d{2,4})", r"\1/\2/\3", text)
    # "1108/2028" Tesseract drops the slash before month → "11/08/2028"
    text = re.sub(r"\b(\d{2})(\d{2}/\d{4})\b", r"\1/\2", text)

    # ── MRP normalisation ─────────────────────────────────────────────────────
    # "Rs 2400" or "Ps 2400" (Tesseract reads Rs as Ps) → "Rs 24.00"
    def fix_mrp(m):
        digits = m.group(1).replace(",", "")
        # If >3 digits with no decimal, likely missing the period: 2400 → 24.00
        if len(digits) >= 4 and "." not in digits:
            fixed = digits[:-2] + "." + digits[-2:]
            return m.group(0).replace(m.group(1), fixed)
        return m.group(0)
    text = re.sub(r"(?:MRP|mrp).*?(?:Rs|Ps|RS|ps)\.?\s*(\d[\d,]+)", fix_mrp, text, flags=re.IGNORECASE)

    # ── Email normalisation ───────────────────────────────────────────────────
    # "wecare@in nestle com" or "wecare@in.nestle com" → "wecare@in.nestle.com"
    text = re.sub(r"([A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+)\s+([A-Za-z0-9\-]+)\s+com\b",
                  r"\1.\2.com", text, flags=re.IGNORECASE)
    text = re.sub(r"([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+)\.\s+com\b", r"\1.com", text, flags=re.IGNORECASE)

    # ── FSSAI License (14-digit) fixes ────────────────────────────────────────
    # "l" (letter L) used as "1" at start of FSSAI number
    text = re.sub(r"\b([lL])(\d{13})\b", r"1\2", text)
    # Tesseract may drop one digit in 14-digit FSSAI: 13-digit starting with 1 → prepend 1
    text = re.sub(r"\b(1\d{12})\b", lambda m: m.group(0) if len(m.group(0))==14 else "1" + m.group(0), text)

    # ── Dietary type keywords ─────────────────────────────────────────────────
    # "VEGELARIAN" / "VEGEIARIAN" Tesseract OCR noise
    text = re.sub(r"VEGE[IL][AT]ARIAN", "VEGETARIAN", text, flags=re.IGNORECASE)
    # "I00% VEGETARIAN" → "100% VEGETARIAN"
    text = re.sub(r"\bI00%", "100%", text)

    # ── Remove leading noise chars on lines ──────────────────────────────────
    # Lines starting with a stray apostrophe/quote before real content
    text = re.sub(r"^[\'\'\`]+\s*", "", text, flags=re.MULTILINE)

    return text


def _extract_fields(text_lines: List[str]) -> Dict[str, Any]:
    """
    Deterministic regex-based statutory field extraction.
    Identical logic to extract_food_fields() in postprocessing.py.
    """
    combined = _fix_ocr_noise("\n".join(text_lines))
    fields: Dict[str, Any] = {
        "mrp": None,
        "net_weight": None,
        "mfg_date": None,
        "expiry_date": None,
        "best_before": None,
        "batch_number": None,
        "fssai_lic_no": None,
        "ingredients": [],
        "customer_care": None,
        "dietary_type": None,
    }

    # 1. MRP
    for pat in [
        r"(?:MRP\.?|M\.R\.P\.?|MAX\.?\s*RETAIL\s*PRICE)\s*[:\.\-]?\s*(?:RS\.?|INR|₹)?\s*[:\.\-]?\s*([₹Rs\.]*\s*[\d,]+(?:\.\d{1,2})?)",
        r"(?:RS\.?|₹)\s*[:\.\-]?\s*([\d,]+(?:\.\d{1,2})?)(?:\s*(?:INCL|INCL\.?\s*OF\s*ALL\s*TAXES))?",
        r"\bMRP\.?\s*[:\.\-]?\s*(\d+(?:\.\d{2})?)",
    ]:
        m = re.search(pat, combined, re.IGNORECASE)
        if m:
            val = re.sub(r"^[₹Rs\.\s:]+", "", m.group(1)).strip()
            # Normalize comma-decimal: "24,00" → "24.00", "2400" stays "2400"
            val = re.sub(r"(\d+),(\d{2})$", r"\1.\2", val)
            if val:
                fields["mrp"] = f"₹{val}"
                break

    # 2. Net Weight / Quantity
    for pat in [
        r"(?:NET\s*(?:WT|WEIGHT|QTY|QUANTITY)?|NETTO)\s*[:\.\-]?\s*(\d+(?:\.\d+)?\s*(?:g|gm|gms|kg|ml|l|ltr|oz|lb)\b)",
        r"\b(\d+(?:\.\d+)?\s*(?:g|gm|gms|kg|ml|l|ltr)\b)",
    ]:
        m = re.search(pat, combined, re.IGNORECASE)
        if m:
            fields["net_weight"] = m.group(1).strip()
            break

    # 3. FSSAI License (14-digit)
    m = re.search(r"(?:FSSAI|LIC|LIC\.?\s*NO\.?)\s*[:\.\-]?\s*([0-9]{14})", combined, re.IGNORECASE)
    if not m:
        m = re.search(r"\b(1\d{13})\b", combined)
    if m:
        fields["fssai_lic_no"] = m.group(1).strip()

    # 4. Manufacturing Date
    m = re.search(
        r"(?:DATE\s*OF\s*MFG|DATE\s*OF\s*PACKING|MFG\.?\s*DATE|PKD\.?\s*DATE|PACKED\s*DATE|MFD|MFG|PACKED|PKD)\s*[:\.\-]?\s*(\d{1,2}[-/\.,]\d{1,2}[-/\.,]\d{2,4}|\b(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[a-z]*\s*\d{2,4})",
        combined, re.IGNORECASE
    )
    if m:
        fields["mfg_date"] = m.group(1).strip()

    # 5. Expiry Date
    m = re.search(
        r"(?:EXPIRY\s*DATE|EXP\.?\s*DATE|BEST\s*BEFORE\s*DATE|USE\s*BY|EXPIRY|EXP)\s*[:\.\-]?\s*(\d{1,2}[-/\.,]\d{1,2}[-/\.,]\d{2,4}|\b(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[a-z]*\s*\d{2,4})",
        combined, re.IGNORECASE
    )
    if m:
        fields["expiry_date"] = m.group(1).strip()

    # 6. Best Before
    m = re.search(
        r"(?:BEST\s*BEFORE|USE\s*WITHIN)\s*[:\.\-]?\s*([A-Za-z0-9\s]{3,35}(?:MONTHS?|DAYS?|WEEKS?|YEARS?|\d{2}/\d{2,4}))",
        combined, re.IGNORECASE
    )
    if m:
        fields["best_before"] = m.group(1).strip()

    # 7. Batch / Lot Number
    m = re.search(
        r"(?:BATCH\s*NO\.?|LOT\s*NO\.?|BATCH\s*NUMBER|LOT\s*NUMBER|B\.NO\.?|BATCH|LOT)\s*[:\.\-]?\s*([A-Za-z0-9\-_/]+)",
        combined, re.IGNORECASE
    )
    if m:
        fields["batch_number"] = m.group(1).strip()

    # 8. Customer Care (email + phone)
    contact_parts: List[str] = []
    m = re.search(r"([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})", combined)
    if m:
        contact_parts.append(m.group(1).strip())
    m = re.search(r"(?:CALL|TEL|PH|PHONE|HELPLINE|CARE)\s*[:\.\-]?\s*(\+?[\d\s\-]{8,15})", combined, re.IGNORECASE)
    if m:
        contact_parts.append(m.group(1).strip())
    if contact_parts:
        fields["customer_care"] = " | ".join(contact_parts)

    # 9. Ingredients
    m = re.search(
        r"INGREDIENTS\s*[:\.\-]?\s*(.*?)(?=\n\n|\bNUTRITION\b|\bMFD\b|\bMFG\b|\bEXP\b|\bBEST BEFORE\b|\bM\.R\.P\b|\bLIC\b|\bFSSAI\b|\bCUSTOMER\s*CARE\b|\bMANUFACTURED\b|\bMARKETED\b|$)",
        combined, re.IGNORECASE | re.DOTALL
    )
    if m:
        raw_ing = m.group(1).replace("\n", " ").strip()
        items = [i.strip(" .,;:-") for i in re.split(r"[,;]", raw_ing) if len(i.strip(" .,;:-")) > 1]
        fields["ingredients"] = items[:20]

    # 10. Dietary Type
    if re.search(r"\b(?:100%\s*VEGETARIAN|VEGETARIAN|VEG|GREEN DOT)\b", combined, re.IGNORECASE):
        fields["dietary_type"] = "Vegetarian"
    elif re.search(r"\b(?:NON[\s\-]?VEG|CONTAINS EGG|CONTAINS MEAT|CONTAINS FISH)\b", combined, re.IGNORECASE):
        fields["dietary_type"] = "Non-Vegetarian"

    return fields


# ─────────────────────────────────────────────────────────────────────────────
# Public API — same interface as the original food_ocr_bridge.py
# ─────────────────────────────────────────────────────────────────────────────

def run_local_packaging_ocr(image_input: Union[str, bytes, np.ndarray]) -> Dict[str, Any]:
    """
    Runs cloud-compatible OCR + statutory field extraction on a food package image.

    Accepts:
      - File path      (str)
      - Raw bytes      (bytes)   ← most common from FastAPI endpoint
      - Base64 string  (str)     ← data URI or raw base64
      - OpenCV array   (np.ndarray)

    Returns:
      {
        "success": True,
        "engine":  "EasyOCR" | "Tesseract",
        "raw_text": "...",
        "fields": {
          "mrp": "₹24.00",
          "netQuantity": "70g",
          "manufacturingDate": "15/08/2026",
          "expiryDate": "15/05/2027",
          "batchNumber": "BG2409A",
          "customerCare": "wecare@...",
          "fssaiLicNo": "10012011000168",
          "dietaryType": "Vegetarian",
          "ingredients": [...]
        },
        "latency_ms": 1240.5,
        "total_regions": 13
      }
    """
    if not BRIDGE_READY:
        # If this server lacks Tesseract (e.g. aws-37mu Python buildpack),
        # automatically proxy to the dedicated Docker OCR instance satyadrishti-backend-v2!
        import os
        target_ocr_url = os.getenv(
            "REMOTE_OCR_URL",
            "https://satyadrishti-backend-v2.onrender.com/api/v1/scanner/local-ocr"
        )
        try:
            import httpx
            # Convert input to base64 dataUrl
            b64_data = ""
            if isinstance(image_input, bytes):
                b64_data = base64.b64encode(image_input).decode("utf-8")
            elif isinstance(image_input, str):
                b64_data = image_input.split(",", 1)[-1] if "," in image_input else image_input
            elif isinstance(image_input, np.ndarray):
                _, enc = cv2.imencode(".jpg", image_input)
                b64_data = base64.b64encode(enc.tobytes()).decode("utf-8")

            if b64_data:
                logger.info(f"[FoodOCR] Forwarding OCR request to cloud Docker engine: {target_ocr_url}")
                with httpx.Client(timeout=45.0) as client:
                    resp = client.post(
                        target_ocr_url,
                        json={"image_base64": b64_data},
                        headers={"Content-Type": "application/json"}
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        if data.get("status") == "success":
                            return {
                                "success": True,
                                "engine": "Tesseract (Docker Cloud)",
                                "raw_text": data.get("raw_text", ""),
                                "fields": data.get("fields", {}),
                                "latency_ms": data.get("latency_ms", 0.0),
                                "total_regions": data.get("total_regions", 0)
                            }
        except Exception as proxy_err:
            logger.warning(f"[FoodOCR] Cloud OCR proxy failed: {proxy_err}")

        return {
            "success": False,
            "error": (
                "No OCR engine available on this server. "
                "For free-tier deployment: install Tesseract binary (apt-get install -y tesseract-ocr) "
                "and pytesseract (pip install pytesseract). "
                "For higher accuracy on paid plans: pip install easyocr."
            ),
            "fields": {},
        }

    t0 = time.time()

    # 1. Load & preprocess
    try:
        img = _load_image(image_input)
        img = _preprocess(img)
    except Exception as e:
        return {"success": False, "error": f"Image load/preprocess failed: {e}", "fields": {}}

    # 2. OCR — Tesseract first (free-tier safe, <50MB RAM)
    #          EasyOCR fallback (higher accuracy, needs ≥1GB RAM)
    try:
        if TESSERACT_AVAILABLE:
            text_lines = _run_tesseract(img)
            engine_used = "Tesseract"
        elif EASYOCR_AVAILABLE:
            text_lines = _run_easyocr(img)
            engine_used = "EasyOCR"
        else:
            return {"success": False, "error": "No OCR engine available", "fields": {}}
    except Exception as e:
        return {"success": False, "error": f"OCR engine failed: {e}", "fields": {}}

    raw_text = "\n".join(text_lines)
    total_regions = len(text_lines)

    # 3. Entity extraction
    raw_fields = _extract_fields(text_lines)

    latency_ms = round((time.time() - t0) * 1000, 2)

    # 4. Map to SatyaDrishti Legal Metrology keys
    mapped_fields = {
        "mrp":               raw_fields.get("mrp"),
        "netQuantity":       raw_fields.get("net_weight"),
        "manufacturingDate": raw_fields.get("mfg_date"),
        "expiryDate":        raw_fields.get("expiry_date") or raw_fields.get("best_before"),
        "batchNumber":       raw_fields.get("batch_number"),
        "customerCare":      raw_fields.get("customer_care"),
        "fssaiLicNo":        raw_fields.get("fssai_lic_no"),
        "dietaryType":       raw_fields.get("dietary_type"),
        "ingredients":       raw_fields.get("ingredients", []),
    }

    return {
        "success":       True,
        "engine":        engine_used,
        "raw_text":      raw_text,
        "fields":        mapped_fields,
        "latency_ms":    latency_ms,
        "total_regions": total_regions,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Quick standalone test
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import pprint, os
    print(f"Engine: {ENGINE_NAME}  |  Bridge ready: {BRIDGE_READY}")
    sample = os.path.expanduser("~/Desktop/food_package_ocr/images/synthetic_maggi_pack.jpg")
    if os.path.exists(sample):
        print(f"\nTesting with: {sample}")
        result = run_local_packaging_ocr(sample)
        pprint.pprint(result)
    else:
        print("Sample image not found. Pass an image path as argument to test.")
