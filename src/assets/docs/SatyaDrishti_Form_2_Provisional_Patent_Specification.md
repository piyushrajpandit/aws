# FORM 2
### THE PATENTS ACT, 1970
**(39 of 1970)**
### &
### THE PATENTS RULES, 2003
## PROVISIONAL SPECIFICATION
*(See section 10 and rule 13)*

---

### 1. TITLE OF THE INVENTION
**AN AUTONOMOUS COMPUTER-IMPLEMENTED SYSTEM AND METHOD FOR MULTI-MODAL LEGAL METROLOGY COMPLIANCE VERIFICATION, PACKAGING GEOMETRY AUDITING, AND AUTOMATED STATUTORY NOTICE GENERATION**

---

### 2. APPLICANT(S)
- **Name(s):** [Team SatyaDrishti / Core Innovators]
- **Nationality:** Indian
- **Address:** India

---

### 3. PREAMBLE TO THE DESCRIPTION
**THE FOLLOWING SPECIFICATION DESCRIBES THE INVENTION:**

---

### 4. FIELD OF THE INVENTION
The present invention relates generally to computer-implemented regulatory technology (RegTech) and computer vision systems. More particularly, the invention relates to an autonomous, distributed computing architecture and method for automated scanning, geometrical optical character analysis, multi-attribute statutory compliance validation under the Legal Metrology (Packaged Commodities) Rules, 2011, and cryptographic generation of legally actionable Show Cause Notices (SCN).

---

### 5. BACKGROUND OF THE INVENTION AND LIMITATIONS OF PRIOR ART

In India, packaging and labelling mandates are governed by the Legal Metrology Act, 2009 and the Legal Metrology (Packaged Commodities) Rules, 2011 (hereinafter "PCR, 2011"), administered by the Department of Consumer Affairs. Rule 6 of PCR, 2011 mandates distinct statutory declarations on every pre-packaged commodity, including but not limited to:
1. Maximum Retail Price (MRP) inclusive of all taxes,
2. Standardized Unit Sale Price (USP) per gram, milliliter, or number,
3. Net quantity in standard metric units of weights and measures,
4. Manufacturer, packer, or importer name and registered address with consumer care coordinates,
5. Country of origin for imported goods, and
6. Date of manufacture/packaging and expiry/best-before date.

Furthermore, Rule 9 and the Second Schedule of PCR, 2011 strictly mandate minimum font height proportions based on the Principal Display Panel (PDP) surface area.

#### Limitations of Existing Solutions:
1. **Manual Inspection Bottleneck:** Enforcement wings of the Central and State Legal Metrology departments inspect fewer than 0.01% of physical retail units due to severe human resource constraints. In e-commerce ecosystems, manual auditing across millions of dynamic Stock Keeping Units (SKUs) is physically impossible.
2. **Deficiencies in General-Purpose OCR and Multimodal LLMs:** Standard Optical Character Recognition (OCR) engines (e.g., vanilla Tesseract, EasyOCR) and general-purpose Vision-Language Models (VLMs) process packaging labels as flat planar 2D text documents. They fail to compute non-planar surface curvatures (e.g., on cylindrical bottles, flexible polymer pouches, or metallic cans), leading to incorrect surface area calculations under Rule 9.
3. **Lack of Legal Determinism & Hallucination Risks:** Generative AI models frequently hallucinate non-existent compliance declarations or miss subtle statutory violations (e.g., font height being 1.8mm instead of the statutory minimum 2.0mm for a $150\,\text{cm}^2$ PDP). Standard AI architectures lack deterministic rule-evaluation engines required for evidence admissible before quasi-judicial authorities.
4. **Absence of End-to-End Enforcement Workflows:** Current tools merely highlight bounding boxes without generating legally standardized statutory documentation (e.g., Section 48 compounding notices or Rule 32 inspection memos) linked to tamper-evident audit trails.

There is therefore an urgent, unmet technical necessity for an automated, deterministic, computer-implemented system that integrates physical packaging geometry extraction, multi-tier optical verification, statutory compliance evaluation, and automated notice dispatch.

---

### 6. OBJECTS OF THE INVENTION

- **Primary Object:** To provide a computer-implemented system capable of autonomously detecting, parsing, and verifying all mandatory declarations under the Legal Metrology (Packaged Commodities) Rules, 2011 across physical packaging imagery and digital e-commerce storefronts.
- **Secondary Object:** To provide a deterministic geometrical calculation module that computes the physical/optical surface area of the Principal Display Panel (PDP) and verifies font height ratios against statutory tables under Rule 9(1).
- **Tertiary Object:** To implement a hybrid dual-tier OCR arbitration engine combining high-speed deterministic edge parsing with contextual multimodal intelligence to ensure zero false positives in legal citations.
- **Quaternary Object:** To autonomously generate digitally signed, standardized Show Cause Notices (SCN) citing exact contravened statutory sections, compoundable penalty matrices, and verifiable evidentiary bounding proofs.

---

### 7. DETAILED DESCRIPTION OF THE INVENTION

The present invention comprises an autonomous multi-tier compliance intelligence engine named **"SatyaDrishti"**, comprising five interconnected computational subsystems:

#### 1. Geometric Principal Display Panel (PDP) Segmentation Subsystem
The system receives one or more digital images or video frames of a packaged commodity. A deep learning bounding pipeline detects packaging boundaries, packaging shape (rectangular box, cylindrical container, tetrahedral pouch), and isolates the Principal Display Panel ($PDP$).
The PDP area ($A_{PDP}$) is computed as:
$$A_{PDP} = \alpha \cdot (W_{PDP} \times H_{PDP})$$
where $\alpha$ is a packaging geometry correction factor determined by container topology ($\alpha = 1.0$ for planar faces, $\alpha = 0.40$ for cylindrical wrap-arounds as prescribed under Rule 9(2)).

The system isolates individual glyph bounding polygons for mandatory declarations (MRP, Net Quantity, Expiry) and computes the relative font height ($h_f$) normalized against reference fiducials or packaging scale:
$$h_{norm} = \frac{h_f}{H_{PDP}} \times H_{actual}$$
The calculated height is cross-referenced against the statutory lookup matrix under Rule 9, Table 1. If $h_{norm} < h_{threshold}(A_{PDP})$, an automated Rule 9 violation event is registered.

#### 2. Hybrid Dual-Tier Optical Extraction Pipeline
To achieve real-time operational efficiency without sacrificing OCR accuracy:
- **Tier-1 (Deterministic Fast Engine):** Uses localized adaptive contrast thresholding and character segmentation to extract alphanumeric strings with confidence score $C_1$.
- **Tier-2 (Multimodal Fallback Arbiter):** If $C_1 < \tau$ (where $\tau = 0.88$), or if statutory fields (e.g., Unit Sale Price format `₹ / g`) fail regex validation, the raw pixel crop is dispatched to an attention-based multimodal visual language parser with prompt constraints bound to the statutory schema.

#### 3. Deterministic PCR 2011 Statutory Rule Engine
The extracted attributes are evaluated against a codified deterministic compliance state machine:
- **Rule 6(1)(e) - MRP Verification:** Evaluates syntax (`MRP Rs. XX.XX incl. of all taxes`), detects hidden surcharges, and flags missing tax declarations.
- **Rule 6(11) - Unit Sale Price (USP) Calculation:** Autonomously computes:
  $$USP_{calc} = \frac{MRP}{Net\,Quantity}$$
  Validates whether the declared USP matches $USP_{calc}$ within a tolerance of $\pm 0.01$ and follows standard metric denominators ($1\,\text{g}$, $100\,\text{g}$, $1\,\text{kg}$, $1\,\text{ml}$, $100\,\text{ml}$, $1\,\text{l}$, or $1\,\text{piece}$).
- **Rule 6(1)(d) & Rule 12 - Date & Net Weight Compliance:** Parses date formats, detects expired shelf-life, and checks net weight against standard packaging schedules.
- **FSSAI & Regulatory Alignment:** Identifies mandatory green/red dietary indicator glyphs and cross-verifies circular diameter dimensions.

#### 4. Evidentiary Ledger and Cryptographic Chain of Custody
Every processed inspection generates a standardized compliance record containing:
- Unique Verification UUID,
- Cryptographic SHA-256 hash digest of the original high-resolution packaging image,
- Geolocation timestamp metadata,
- Extracted key-value pair dictionary with bounding box coordinate tensors.
This ensures absolute non-repudiation in judicial or quasi-judicial enforcement proceedings.

#### 5. Autonomous Show Cause Notice (SCN) Generator
Upon identification of one or more non-compliant attributes, the subsystem automatically compiles a formal legal notice under Section 48 of the Legal Metrology Act, 2009. The generated notice comprises:
- Manufacturer/Packer corporate identity and registered coordinates,
- High-resolution visual exhibits displaying highlighted non-compliant bounding boxes,
- Specific statutory sections violated (e.g., Section 36(1) read with Rule 6(1)(e)),
- Compoundable fine calculation under the prescribed statutory schedules,
- Secure QR code linking to the verifiable online inspection dossier.

---

### 8. PROVISIONAL CLAIMS

**WE CLAIM:**

1. A computer-implemented system for automated verification of legal metrology and statutory packaging compliance, the system comprising:
   - an image acquisition interface configured to receive packaging imagery of a pre-packaged commodity;
   - an optical character recognition (OCR) pipeline configured to extract textual and numerical declarations from the packaging imagery;
   - a geometric audit module configured to compute a Principal Display Panel (PDP) surface area and determine physical font height dimensions of statutory declarations on said packaging;
   - a deterministic rule validation engine configured to evaluate the extracted declarations and geometric dimensions against codified provisions of the Legal Metrology (Packaged Commodities) Rules, 2011; and
   - a report generator configured to output a compliance verdict and an evidentiary audit record.

2. The system as claimed in claim 1, wherein the geometric audit module applies topology-specific correction factors based on container geometry to determine the effective display area of non-planar or deformable packaging.

3. The system as claimed in claim 1, wherein the deterministic rule validation engine autonomously calculates a statutory Unit Sale Price (USP) based on extracted Maximum Retail Price (MRP) and Net Quantity declarations, and flags discrepancies where declared USP deviates from calculated USP.

4. The system as claimed in claim 1, wherein the OCR pipeline comprises a dual-tier architecture having a primary edge-based deterministic text recognizer and a secondary multimodal vision model triggered conditionally based on character confidence thresholds.

5. The system as claimed in claim 1, further comprising an autonomous notice generation subsystem that drafts a legally actionable Show Cause Notice citing specific contravened sections of the Legal Metrology Act, 2009, accompanied by annotated visual evidence exhibits.

6. The system as claimed in claim 1, wherein each compliance verdict is associated with a cryptographic hash digest of the input imagery to preserve chain of custody for quasi-judicial proceedings.

7. A computer-implemented method for auditing e-commerce and retail packaging compliance, comprising:
   - segmenting a packaging image into a Principal Display Panel and secondary panels;
   - extracting mandatory declarations comprising MRP, Unit Sale Price, Net Quantity, Expiry, and Manufacturer coordinates;
   - verifying compliance of said declarations against statutory rules; and
   - triggering an enforcement alert upon detecting missing, miscalculated, or geometrically undersized declarations.

---

### 9. ABSTRACT OF THE DISCLOSURE

The present invention discloses an autonomous, computer-implemented system and method for real-time verification of packaged commodities compliance under the Legal Metrology (Packaged Commodities) Rules, 2011. The system implements a geometric Principal Display Panel (PDP) segmentation pipeline to calculate physical surface areas on planar and non-planar packaging, a hybrid dual-tier OCR extraction engine for robust alphanumeric parsing, and a deterministic statutory rule engine that validates MRP syntax, Unit Sale Price (USP) mathematical accuracy, net quantity declarations, and font-to-surface area ratios under Rule 9. Upon identifying a violation, the system cryptographically seals an evidentiary audit trail and autonomously synthesizes a standardized statutory Show Cause Notice citing contravened legal sections, thereby enabling high-throughput automated enforcement across retail and e-commerce ecosystems.

---
*(Dated this 24th day of October, 2026)*
*(Signature of Applicant / Authorized Patent Agent)*
