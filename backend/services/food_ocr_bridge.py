"""
SatyaDrishti Local Food Package OCR Bridge
Integrates /Users/piyushraj/Desktop/food_package_ocr directly into SatyaDrishti backend.
Can be dropped into /Users/piyushraj/Desktop/aws/backend/services/food_ocr_bridge.py
"""

import sys
import os
from typing import Dict, Any, Union
import numpy as np

# Dynamically resolve food_package_ocr location on this Mac
POSSIBLE_PATHS = [
    os.path.expanduser("~/Desktop/food_package_ocr"),
    "/Users/piyushraj/Desktop/food_package_ocr",
    os.path.join(os.path.dirname(__file__), "..", "..", "..", "food_package_ocr")
]
for p in POSSIBLE_PATHS:
    p_abs = os.path.abspath(p)
    if os.path.exists(p_abs) and p_abs not in sys.path:
        sys.path.insert(0, p_abs)

try:
    from food_extractor import extract_package_data, get_engine
    BRIDGE_READY = True
except ImportError:
    BRIDGE_READY = False

def run_local_packaging_ocr(image_input: Union[str, bytes, np.ndarray]) -> Dict[str, Any]:
    """
    Executes local PaddleOCR / Apple Vision extraction and returns
    SatyaDrishti-formatted statutory declarations.
    
    Accepts:
      - File path (str)
      - Raw image bytes (bytes)
      - OpenCV image array (np.ndarray)
      - Base64 string (str)
      
    Returns dictionary mapped directly to SatyaDrishti Legal Metrology fields:
      - mrp
      - netQuantity
      - manufacturingDate
      - expiryDate
      - batchNumber
      - customerCare
      - fssaiLicNo
      - dietaryType
      - ingredients
    """
    if not BRIDGE_READY:
        return {
            "success": False,
            "error": "food_package_ocr module could not be imported from Desktop.",
            "fields": {}
        }
        
    res = extract_package_data(image_input)
    
    # Map to Legal Metrology compliance keys
    mapped_fields = {
        "mrp": res.get("mrp"),
        "netQuantity": res.get("net_weight"),
        "manufacturingDate": res.get("mfg_date"),
        "expiryDate": res.get("expiry_date") or res.get("best_before"),
        "batchNumber": res.get("batch_number"),
        "customerCare": res.get("customer_care"),
        "fssaiLicNo": res.get("fssai_lic_no"),
        "dietaryType": res.get("dietary_type"),
        "ingredients": res.get("ingredients", [])
    }
    
    return {
        "success": True,
        "raw_text": res.get("full_text", ""),
        "fields": mapped_fields,
        "latency_ms": res.get("latency_ms", 0.0),
        "total_regions": res.get("total_detected_regions", 0)
    }

if __name__ == "__main__":
    sample_path = os.path.join(os.path.dirname(__file__), "images", "synthetic_maggi_pack.jpg")
    if not os.path.exists(sample_path):
        sample_path = "/Users/piyushraj/Desktop/food_package_ocr/images/synthetic_maggi_pack.jpg"
    print("Testing Food OCR Bridge...")
    result = run_local_packaging_ocr(sample_path)
    import pprint
    pprint.pprint(result)
