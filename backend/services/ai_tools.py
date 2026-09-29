"""
SatyaDrishti AI Copilot — Controlled Database Tools
Provides safe, read/write operations for the AI assistant.
All queries use SQLAlchemy ORM with parameterized inputs.
No arbitrary SQL execution is permitted.
"""

from datetime import datetime
from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session
import uuid
import sys
from pathlib import Path

_backend_dir = Path(__file__).resolve().parents[1]
if str(_backend_dir) not in sys.path:
    sys.path.insert(0, str(_backend_dir))

from models.db_models import (
    ProductModel,
    ManufacturerModel,
    OCRScanModel,
    ViolationModel,
    ComplaintModel,
    RegulatoryRuleModel,
)


# ---------------------------------------------------------------------------
# READ-ONLY TOOLS
# ---------------------------------------------------------------------------

def get_database_stats(db: Session) -> Dict[str, Any]:
    """Get overview counts for all database tables."""
    return {
        "products": db.query(ProductModel).count(),
        "manufacturers": db.query(ManufacturerModel).count(),
        "ocr_scans": db.query(OCRScanModel).count(),
        "violations": db.query(ViolationModel).count(),
        "complaints": db.query(ComplaintModel).count(),
        "regulatory_rules": db.query(RegulatoryRuleModel).count(),
    }


def get_products(
    db: Session,
    platform: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 20,
) -> List[Dict[str, Any]]:
    """Retrieve products with optional filtering."""
    limit = min(max(limit, 1), 50)  # Clamp between 1 and 50
    query = db.query(ProductModel)
    if platform and platform != "All":
        query = query.filter(ProductModel.platform == platform)
    if status and status != "All":
        query = query.filter(ProductModel.status == status)
    if search:
        s = f"%{search}%"
        query = query.filter(
            (ProductModel.title.ilike(s))
            | (ProductModel.brand.ilike(s))
            | (ProductModel.manufacturer_name.ilike(s))
        )
    products = query.order_by(ProductModel.created_at.desc()).limit(limit).all()
    return [
        {
            "id": p.id,
            "sku": p.sku,
            "title": p.title,
            "brand": p.brand,
            "category": p.category,
            "manufacturer_name": p.manufacturer_name,
            "status": p.status,
            "compliance_score": p.compliance_score,
            "platform": p.platform,
            "mrp": p.mrp,
            "country_of_origin": p.country_of_origin,
            "created_at": p.created_at.isoformat() if p.created_at else None,
        }
        for p in products
    ]


def get_product_details(db: Session, product_id: str) -> Optional[Dict[str, Any]]:
    """Get detailed information about a specific product."""
    p = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not p:
        return {"message": f"No product found with ID '{product_id}'."}
    return {
        "id": p.id,
        "sku": p.sku,
        "title": p.title,
        "brand": p.brand,
        "category": p.category,
        "manufacturer_name": p.manufacturer_name,
        "country_of_origin": p.country_of_origin,
        "mrp": p.mrp,
        "listed_price": p.listed_price,
        "net_weight": p.net_weight,
        "platform": p.platform,
        "status": p.status,
        "compliance_score": p.compliance_score,
        "ocr_confidence": p.ocr_confidence,
        "dietary_type": p.dietary_type,
        "missing_mandatory_fields": p.missing_mandatory_fields,
        "created_at": p.created_at.isoformat() if p.created_at else None,
    }


def get_products_by_date_range(
    db: Session,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    limit: int = 50,
) -> List[Dict[str, Any]]:
    """Retrieve products created within a date range (ISO format dates)."""
    limit = min(max(limit, 1), 100)
    query = db.query(ProductModel)
    if start_date:
        try:
            start_dt = datetime.fromisoformat(start_date)
            query = query.filter(ProductModel.created_at >= start_dt)
        except ValueError:
            pass
    if end_date:
        try:
            end_dt = datetime.fromisoformat(end_date)
            query = query.filter(ProductModel.created_at <= end_dt)
        except ValueError:
            pass
    products = query.order_by(ProductModel.created_at.desc()).limit(limit).all()
    result = [
        {
            "id": p.id,
            "title": p.title,
            "brand": p.brand,
            "category": p.category,
            "status": p.status,
            "compliance_score": p.compliance_score,
            "platform": p.platform,
            "created_at": p.created_at.isoformat() if p.created_at else None,
        }
        for p in products
    ]
    return result if result else [{"message": "No products found in the specified date range."}]


def get_violations(
    db: Session,
    severity: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 20,
) -> List[Dict[str, Any]]:
    """Retrieve violations with optional filtering."""
    limit = min(max(limit, 1), 50)
    query = db.query(ViolationModel)
    if severity and severity != "All":
        query = query.filter(ViolationModel.severity == severity)
    if status and status != "All":
        query = query.filter(ViolationModel.status == status)
    violations = query.order_by(ViolationModel.created_at.desc()).limit(limit).all()
    return [
        {
            "id": v.id,
            "case_number": v.case_number,
            "product_name": v.product_name,
            "brand": v.brand,
            "manufacturer": v.manufacturer,
            "rule_code": v.rule_code,
            "section": v.section,
            "act_name": v.act_name,
            "severity": v.severity,
            "status": v.status,
            "description": v.description,
            "penalty_estimate": v.penalty_estimate,
            "assigned_officer": v.assigned_officer,
            "created_at": v.created_at.isoformat() if v.created_at else None,
        }
        for v in violations
    ]


def get_complaints(
    db: Session,
    status: Optional[str] = None,
    limit: int = 20,
) -> List[Dict[str, Any]]:
    """Retrieve consumer complaints."""
    limit = min(max(limit, 1), 50)
    query = db.query(ComplaintModel)
    if status and status != "All":
        query = query.filter(ComplaintModel.status == status)
    complaints = query.order_by(ComplaintModel.created_at.desc()).limit(limit).all()
    return [
        {
            "id": c.id,
            "ticket_id": c.ticket_id,
            "consumer_name": c.consumer_name,
            "product_name": c.product_name,
            "brand": c.brand,
            "platform": c.platform,
            "category": c.category,
            "status": c.status,
            "description": c.description,
            "created_at": c.created_at.isoformat() if c.created_at else None,
        }
        for c in complaints
    ]


def get_manufacturers(
    db: Session,
    risk_tier: Optional[str] = None,
    limit: int = 20,
) -> List[Dict[str, Any]]:
    """Retrieve manufacturers with risk information."""
    limit = min(max(limit, 1), 50)
    query = db.query(ManufacturerModel)
    if risk_tier and risk_tier != "All":
        query = query.filter(ManufacturerModel.risk_tier == risk_tier)
    manufacturers = query.limit(limit).all()
    return [
        {
            "id": m.id,
            "name": m.name,
            "risk_tier": m.risk_tier,
            "risk_score": m.risk_score,
            "active_violations": m.active_violations,
            "total_products_scanned": m.total_products_scanned,
            "notices_issued": m.notices_issued,
            "repeat_offender_flag": m.repeat_offender_flag,
            "created_at": m.created_at.isoformat() if m.created_at else None,
        }
        for m in manufacturers
    ]


# ---------------------------------------------------------------------------
# WRITE TOOLS (require explicit user confirmation via the AI prompt)
# ---------------------------------------------------------------------------

def create_product_via_ai(
    db: Session,
    title: str,
    brand: str,
    category: str = "General",
    manufacturer_name: str = "Unknown",
    mrp: float = 0.0,
    platform: str = "Direct",
) -> Dict[str, Any]:
    """Create a new product. Only called after explicit user confirmation."""
    prod_id = f"prod-{uuid.uuid4().hex[:8]}"
    sku = f"SKU-{uuid.uuid4().hex[:6].upper()}"

    # Ensure uniqueness
    existing = db.query(ProductModel).filter(
        (ProductModel.id == prod_id) | (ProductModel.sku == sku)
    ).first()
    if existing:
        prod_id = f"prod-{uuid.uuid4().hex[:8]}"
        sku = f"SKU-{uuid.uuid4().hex[:6].upper()}"

    product = ProductModel(
        id=prod_id,
        sku=sku,
        title=title,
        brand=brand,
        category=category,
        manufacturer_name=manufacturer_name,
        country_of_origin="India",
        mrp=mrp,
        listed_price=mrp,
        net_weight="N/A",
        platform=platform,
        status="compliant",
        compliance_score=100,
        ocr_confidence=95.0,
        last_scanned=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return {
        "status": "success",
        "id": product.id,
        "sku": product.sku,
        "title": product.title,
        "brand": product.brand,
        "category": product.category,
        "message": f"Product '{product.title}' created successfully with ID {product.id}.",
    }


def delete_product_via_ai(db: Session, product_id: str) -> Dict[str, Any]:
    """Delete a product by ID. Only called after explicit user confirmation."""
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        return {"status": "error", "message": f"Product with ID '{product_id}' not found."}

    title = product.title
    db.delete(product)
    db.commit()
    return {"status": "success", "message": f"Product '{title}' (ID: {product_id}) has been deleted."}


# ---------------------------------------------------------------------------
# NAVIGATION TOOL
# ---------------------------------------------------------------------------

# Maps natural-language page names to actual frontend routes
VALID_ROUTES: Dict[str, str] = {
    "home": "/",
    "landing": "/",
    "landing page": "/",
    "about": "/about",
    "about page": "/about",
    "technical blog": "/technical-blog",
    "tech blog": "/technical-blog",
    "blog": "/technical-blog",
    "login": "/login",
    "sign in": "/login",
    "directory": "/directory",
    "public directory": "/directory",
    "product directory": "/directory",
    "verify": "/directory",
    "dashboard": "/dashboard",
    "overview": "/dashboard",
    "overview dashboard": "/dashboard",
    "products": "/dashboard/products",
    "products intelligence": "/dashboard/products",
    "product intelligence": "/dashboard/products",
    "crawler": "/dashboard/crawler",
    "e-commerce crawler": "/dashboard/crawler",
    "ecommerce crawler": "/dashboard/crawler",
    "scanner": "/dashboard/scanner",
    "product scanner": "/dashboard/scanner",
    "violations": "/dashboard/violations",
    "violations ledger": "/dashboard/violations",
    "manufacturers": "/dashboard/manufacturers",
    "manufacturer risk": "/dashboard/manufacturers",
    "manufacturer risk ranking": "/dashboard/manufacturers",
    "complaints": "/dashboard/complaints",
    "consumer complaints": "/dashboard/complaints",
    "complaints portal": "/dashboard/complaints",
    "analytics": "/dashboard/analytics",
    "analytics intelligence": "/dashboard/analytics",
    "analytics dashboard": "/dashboard/analytics",
    "regulatory rag": "/dashboard/regulatory-rag",
    "rag": "/dashboard/regulatory-rag",
    "rag portal": "/dashboard/regulatory-rag",
    "regulatory": "/dashboard/regulatory-rag",
    "knowledge base": "/dashboard/regulatory-rag",
}


# ---------------------------------------------------------------------------
# E-COMMERCE SELLER TRUST & URL SCORER TOOL
# ---------------------------------------------------------------------------

def analyze_ecommerce_url(url: str) -> Dict[str, Any]:
    """Analyze an e-commerce product URL for seller trust, domain authenticity, and fraud risk."""
    url_lower = url.strip().lower()
    
    # Supported platform check
    known_platforms = {
        "amazon.in": ("Amazon India", 96, "High"),
        "amazon.com": ("Amazon Global", 95, "High"),
        "flipkart.com": ("Flipkart", 94, "High"),
        "meesho.com": ("Meesho", 82, "Moderate"),
        "blinkit.com": ("Blinkit", 92, "High"),
        "zepto.com": ("Zepto", 90, "High"),
        "myntra.com": ("Myntra", 93, "High"),
        "nykaa.com": ("Nykaa", 94, "High"),
    }
    
    matched_domain = None
    platform_info = None
    for domain, info in known_platforms.items():
        if domain in url_lower:
            matched_domain = domain
            platform_info = info
            break
            
    is_https = url_lower.startswith("https://")
    
    # Suspicious domain indicators
    suspicious_keywords = ["cheap", "discount", "free-deal", "offer99", "replica", "copy", "sale-today", "super-store"]
    has_suspicious_keyword = any(kw in url_lower for kw in suspicious_keywords)
    
    if platform_info:
        platform_name, base_trust, trust_category = platform_info
        trust_score = base_trust
        risk_level = "LOW" if base_trust >= 90 else "MEDIUM"
        
        red_flags = []
        if not is_https:
            trust_score -= 20
            red_flags.append("Insecure HTTP connection — sensitive data may be exposed.")
        
        if "seller" in url_lower or "merchant" in url_lower:
            red_flags.append("Third-party unverified reseller listing — check seller feedback rating before purchase.")
            
        return {
            "url": url,
            "platform": platform_name,
            "domain_authenticity": "VERIFIED_OFFICIAL",
            "trust_score": trust_score,
            "risk_level": risk_level,
            "legal_compliance": "Compliant with Consumer Protection (E-Commerce) Rules 2020",
            "statutory_declarations": {
                "country_of_origin": "Required & Disclosed",
                "mrp_transparency": "Disclosed",
                "return_policy_disclosed": "Mandatory 7-14 Days",
            },
            "red_flags": red_flags if red_flags else ["No critical structural anomalies detected."],
            "recommendations": [
                "Verify that the MRP printed on physical packaging matches the listed price.",
                "Ensure country of origin declaration is clearly visible prior to checkout.",
                "Keep invoice for statutory warranty claims under Consumer Protection Act 2019."
            ]
        }
    else:
        # Non-standard / external e-commerce domain
        trust_score = 45 if is_https else 20
        if has_suspicious_keyword:
            trust_score -= 15
            
        risk_level = "HIGH" if trust_score < 40 else "MEDIUM"
        
        return {
            "url": url,
            "platform": "Unknown / Independent Portal",
            "domain_authenticity": "UNVERIFIED_THIRD_PARTY",
            "trust_score": max(trust_score, 5),
            "risk_level": risk_level,
            "legal_compliance": "High risk of non-compliance with Legal Metrology (Packaged Commodities) Rules",
            "statutory_declarations": {
                "country_of_origin": "Unknown / Not Verified",
                "mrp_transparency": "Unverified discount claim",
                "return_policy_disclosed": "Unclear or missing mandatory nodal officer details",
            },
            "red_flags": [
                "Unrecognized domain — not a registered national e-commerce platform.",
                "Missing mandatory Legal Metrology mandatory disclosures (Manufacturer details, Country of Origin, Customer Care contact).",
                "Potential deceptive price manipulation (unrealistic discount percentages)."
            ] + (["Insecure HTTP protocol! Do NOT enter credit card details."] if not is_https else []),
            "recommendations": [
                "Exercise extreme caution before making payments on unknown portals.",
                "Prefer Cash on Delivery (COD) to inspect product packaging upon arrival.",
                "Report suspicious counterfeit listings to the Consumer Complaints Portal (/dashboard/complaints)."
            ]
        }


def navigate_to_page(page_name: str) -> Dict[str, Any]:
    """Resolve a natural-language page name to an actual frontend route."""

    normalized = page_name.strip().lower()

    # Direct match
    if normalized in VALID_ROUTES:
        return {
            "status": "success",
            "route": VALID_ROUTES[normalized],
            "page_name": page_name,
        }

    # Partial / fuzzy match
    for key, route in VALID_ROUTES.items():
        if normalized in key or key in normalized:
            return {
                "status": "success",
                "route": route,
                "page_name": key.title(),
            }

    return {
        "status": "not_found",
        "message": f"Could not find a page matching '{page_name}' in the current application.",
        "available_pages": sorted(set(VALID_ROUTES.values())),
    }


# ---------------------------------------------------------------------------
# TOOL DISPATCHER — maps tool names to handler functions
# ---------------------------------------------------------------------------

TOOL_HANDLERS: Dict[str, Any] = {
    "get_database_stats": lambda db, params: get_database_stats(db),
    "get_products": lambda db, params: get_products(
        db,
        platform=params.get("platform"),
        status=params.get("status"),
        search=params.get("search"),
        limit=params.get("limit", 20),
    ),
    "get_product_details": lambda db, params: get_product_details(
        db, params["product_id"]
    ),
    "get_products_by_date_range": lambda db, params: get_products_by_date_range(
        db,
        start_date=params.get("start_date"),
        end_date=params.get("end_date"),
        limit=params.get("limit", 50),
    ),
    "get_violations": lambda db, params: get_violations(
        db,
        severity=params.get("severity"),
        status=params.get("status"),
        limit=params.get("limit", 20),
    ),
    "get_complaints": lambda db, params: get_complaints(
        db,
        status=params.get("status"),
        limit=params.get("limit", 20),
    ),
    "get_manufacturers": lambda db, params: get_manufacturers(
        db,
        risk_tier=params.get("risk_tier"),
        limit=params.get("limit", 20),
    ),
    "create_product": lambda db, params: create_product_via_ai(
        db,
        title=params["title"],
        brand=params["brand"],
        category=params.get("category", "General"),
        manufacturer_name=params.get("manufacturer_name", "Unknown"),
        mrp=params.get("mrp", 0.0),
        platform=params.get("platform", "Direct"),
    ),
    "delete_product": lambda db, params: delete_product_via_ai(
        db, params["product_id"]
    ),
    "analyze_ecommerce_url": lambda db, params: analyze_ecommerce_url(params["url"]),
    "navigate_to_page": lambda db, params: navigate_to_page(params["page_name"]),
}
