# FORM 2
THE PATENTS ACT, 1970
(39 of 1970)
&
THE PATENTS RULES, 2003

## PROVISIONAL SPECIFICATION
(See section 10 and rule 13)

---

### 1. TITLE OF THE INVENTION
**AN AUTONOMOUS SYSTEM AND COMPUTER-IMPLEMENTED METHOD FOR REAL-TIME STATUTORY LEGAL METROLOGY COMPLIANCE AUDITING, DUAL-MRP DETECTION, AND PERSONALIZED CONSUMER HEALTH INTERCEPTION**

---

### 2. APPLICANT(S)
- **Name**: [Your Name / Team Lead Name]
- **Nationality**: Indian
- **Address**: [Your Institute / Residential Address, City, State, PIN]

---

### 3. PREAMBLE TO THE DESCRIPTION
The following specification describes the invention:

---

### 4. FIELD OF THE INVENTION
The present invention relates generally to computer vision, distributed web scraping systems, and consumer protection technologies. More specifically, the present invention relates to an autonomous, distributed software engine and computer-implemented method that performs multi-pass optical character recognition (OCR), automated statutory compliance auditing of packaged commodities under the Legal Metrology (Packaged Commodities) Rules, 2011, real-time spatial detection of Dual Maximum Retail Price (Dual-MRP) extortion under Section 36(1) of the Legal Metrology Act, 2009, and personalized nutritional risk mitigation for vulnerable consumer cohorts.

---

### 5. BACKGROUND OF THE INVENTION AND PRIOR ART LIMITATIONS
In developing consumer economies, particularly India, statutory provisions under the **Legal Metrology Act, 2009** and the **Legal Metrology (Packaged Commodities) Rules, 2011 (amended via G.S.R. 779(E))** mandate that every pre-packaged commodity sold across physical retail or electronic marketplace platforms must display unambiguous statutory declarations. These mandatory declarations include:
1. Legal identity and full physical address of the manufacturer, packer, or importer (Rule 6(1)(a));
2. Country of origin for imported and domestic packaged goods (Rule 6(1)(b) & Rule 6(10));
3. Net quantity declared in standardized metric units of weight, volume, or count (Rule 6(1)(d), Rule 11 & 12);
4. Maximum Retail Price (MRP) inclusive of all taxes (Rule 6(1)(f));
5. Dedicated consumer grievance redressal channels including telephonic and electronic contact (Rule 6(1)(g)).

#### Deficiencies in Prior Art:
Existing technological systems suffer from severe structural bottlenecks:
1. **Absence of Autonomous Regulatory Auditing**: Conventional regulatory inspection is manual, sample-based, and human-resource constrained. With tens of thousands of stock-keeping units (SKUs) listed on digital marketplaces (e.g., Amazon, Flipkart, Blinkit, Zepto, Meesho), manual oversight fails to identify missing origin details or unregistered sellers.
2. **Failure to Detect Dual-MRP Discrepancies**: Predatory retailers located in transit hubs (airports, railway terminals), cinema halls, and high-footfall tourist corridors routinely charge rates significantly higher than the manufacturer’s statutory MRP or paste unauthorized secondary price stickers. Existing barcode scanners only retrieve static master prices and possess zero capability to compare physical in-store billing with spatial baselines.
3. **Decoupled Nutritional Safety**: Conventional calorie-counting applications (e.g., MyFitnessPal, HealthifyMe) require manual user logging and fail to cross-reference front-of-pack marketing claims against hidden biochemical ingredients (e.g., maltodextrin, high-fructose corn syrup, invert sugar) against the user’s specific medical history (e.g., Type-2 Diabetes, Hypertension, Renal failure).
4. **Fragile Scraping & Anti-Bot Failures**: Existing e-commerce crawlers break when marketplaces deploy anti-bot rate-limiters (HTTP 429), resulting in empty metadata and erroneous compliance scoring.

There exists an urgent, unaddressed technical necessity for an integrated system capable of autonomous distributed crawling, resilient semantic URL parsing, dual-layer packaging OCR, and immediate generation of legally enforceable statutory show-cause notices.

---

### 6. OBJECTS OF THE PRESENT INVENTION
1. To provide an autonomous, distributed e-commerce crawler capable of continuous statutory compliance verification under Legal Metrology Rule 6(10).
2. To provide an anti-bot resilient semantic parsing mechanism capable of extracting brand, metric quantity, category, and statutory fields directly from canonical URL slugs when HTTP 429 rate-limiting is encountered.
3. To provide an intelligent in-store packaging audit system that detects Dual-MRP fraud, computes percentage overcharges, and generates geo-spatial evidentiary documentation.
4. To automatically draft statutory Show-Cause Notices citing Section 36(1) of the Legal Metrology Act, 2009, with pre-calculated statutory compounding penalties.
5. To provide a real-time personalized health interception engine that evaluates detected biochemical ingredients against stored biometric risk profiles.

---

### 7. SUMMARY OF THE INVENTION
The present invention discloses a system and computer-implemented method comprising:
1. **Autonomous E-Commerce Crawler Subsystem**: Orchestrates distributed asynchronous HTTP and headless browser sessions across multiple electronic marketplaces. The subsystem incorporates a **Resilient Semantic Slug Reconstructor** that operates when anti-bot triggers occur, parsing product titles, metric quantities, and statutory entities directly from URL structures.
2. **Statutory Legal Metrology Rule Evaluation Engine**: Implements a codified rule graph corresponding to Rules 5, 6(1)(a)-(g), 6(10), 11, 12, and 18 of the Legal Metrology (Packaged Commodities) Rules, 2011. The engine calculates statutory compliance scores (0–100%) and quantifies compounding penalty exposure in Indian National Rupees (₹).
3. **Dual-MRP Detection & Geo-Spatial Evidence Engine**: Evaluates captured in-store shelf prices against the manufacturer's verified statutory MRP database. When an unauthorized markup is verified, the system tags high-precision GPS coordinates, timestamps, and store metadata, auto-generating a Section 36 statutory violation record.
4. **Multi-Pass Computer Vision Pipeline**: Executes adaptive grayscale thresholding, bilateral noise filtration, and region-of-interest (ROI) segmentation to extract contact details, FSSAI numbers, and nutritional panels from reflective and curved packaging surfaces.
5. **Personalized Health Risk Interceptor**: Cross-references optical character output against biochemical ingredient taxonomies and triggers automated hazard alerts (e.g., Diabetic Glycemic Spikes, Allergen Traps, Amino Spiking).

---

### 8. DETAILED DESCRIPTION OF THE TECHNICAL ARCHITECTURE

#### 8.1 Autonomous Crawler and Anti-Bot Semantic Reconstructor
When inspecting marketplace URLs:
1. The system executes a primary request via a headless reader or scraping pipeline.
2. If an HTTP 429 ("Too Many Requests"), CAPTCHA challenge, or surge response is intercepted, the system initiates a semantic fallback:
   - Strips tracking query parameters (`pid`, `lid`, `marketplace`, `q`, `otracker`).
   - Extracts the canonical URI slug.
   - Applies regular expression tokenization:
     $$\text{Weight} = \text{Regex}(\backslash d+(\backslash.\backslash d+)?\backslash s*(kg|g|gm|ml|l|ltr))$$
   - Maps the extracted brand and category to statutory manufacturer knowledge profiles.
3. The extracted statutory payload is passed to the Rule Evaluation Engine.

#### 8.2 Statutory Notice Generation Engine
When a product fails mandatory declarations (e.g., missing country of origin under Rule 6(10) or missing customer care contact under Rule 6(1)(g)):
1. The engine creates a unique case identifier: `LM-S36-[YYYYMMDD]-[UUID]`.
2. Computes the cumulative compounding penalty under Section 36(1) (e.g., ₹25,000 for net quantity violation, ₹50,000 for omitted country of origin).
3. Formulates a legally structured Show Cause Notice directed to the marketplace platform and the seller of record, providing a 15-day statutory response window.

#### 8.3 In-Store Dual-MRP & Incident Escalation
1. The mobile client captures the physical product label and store shelf price.
2. The OCR pipeline extracts the labeled MRP: $MRP_{\text{pkg}}$.
3. The store price $P_{\text{store}}$ is obtained via receipt OCR or user input.
4. If $P_{\text{store}} > MRP_{\text{pkg}}$:
   - Calculates Markup: $\Delta P = P_{\text{store}} - MRP_{\text{pkg}}$
   - Percentage Overcharge: $\% = (\Delta P / MRP_{\text{pkg}}) \times 100$
   - Flags violation under Rule 18(2) of Legal Metrology (Packaged Commodities) Rules, 2011.
   - Broadcasts the incident to the State Legal Metrology Supervisor Command Dashboard with GPS retail coordinates for immediate enforcement dispatch.

---

### 9. NOVEL AND INVENTIVE CLAIMS / EMBODIMENTS
The technical features considered novel and inventive include:
1. The technical combination of automated statutory legal metrology rule auditing with real-time distributed e-commerce crawling.
2. The anti-bot resilience mechanism that extracts statutory declarations and metric quantities from URL slugs when marketplace anti-scraping triggers occur.
3. The spatial cross-referencing of physical in-store retail prices against baseline statutory MRPs to prove Section 36 Dual-MRP extortion.
4. The automated generation of jurisdiction-specific statutory Show-Cause notices containing pre-calculated statutory compounding fines.

---

Dated this 24th day of October, 2026.

**Signature of Applicant(s):**  
_____________________________________  
([Your Name / Co-Founders])
