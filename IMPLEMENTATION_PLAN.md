123456# 📋 SatyaDrishti — Implementation Plan

---

## What Already Exists ✅

### Roles (Already built — DO NOT TOUCH)
| Role | Email | What they see |
|------|-------|---------------|
| **Consumer** | consumer@demo.gov.in | Scan + Complaints |
| **Inspector** | inspector@demo.gov.in | Scanner + Violations + Complaints |
| **Supervisor (Admin)** | admin@demo.gov.in | Everything + Analytics + RAG |

### Pages Already Built
| Page | Route | Status |
|------|-------|--------|
| ProductScanner | /dashboard/scanner | ✅ OCR works |
| ViolationsLedger | /dashboard/violations | ✅ Built |
| ConsumerComplaintsPortal | /dashboard/complaints | ✅ Built |
| OverviewDashboard | /dashboard | ✅ Built |
| AnalyticsIntelligence | /dashboard/analytics | ✅ Built |
| ManufacturerRiskRanking | /dashboard/manufacturers | ✅ Built |
| EcommerceCrawler | /dashboard/crawler | ✅ Built |
| RegulatoryRAGPortal | /dashboard/regulatory-rag | ✅ Built |

### Core Services Already Built
- OCR scanning (Tesseract.js) ✅
- Compliance rules engine ✅
- Complaint service ✅
- Scan store (Zustand) ✅
- Auth store with 3 roles ✅

---

## What We Are ADDING 🚀

---

## Track 1 — Citizen Reports → Inspector Intelligence

### The Gap Right Now
- Consumer scans product → finds violation → reports it
- BUT: reports are individual, no aggregation, no location, inspector doesn't know where to go

### What We Add

#### Step 1 — Add Location to Every Report (Consumer side)
**File to modify:** `src/services/complaintService.ts`
- Add `latitude`, `longitude`, `city` fields to complaint object
- Capture GPS on report submission

**File to modify:** `src/pages/dashboard/ConsumerComplaintsPortal.tsx`
- Add "Attach my location" toggle when filing a complaint
- Show city name after capture

#### Step 2 — Brand Aggregation View (Inspector side)
**New file:** `src/pages/dashboard/BrandViolationHeatmap.tsx`
- Show: "Top 5 brands with most reports this week"
- Show: "Which city has most reports today"
- Show: "Same product reported 12 times — investigate this"
- Data comes from: existing `complianceStore` + `reportStore`

**File to modify:** `src/pages/dashboard/OverviewDashboard.tsx`
- Add "Hotspot Alert" widget for inspector/admin role
- Show top reported brand + city

#### Step 3 — "Where to Go Tomorrow" Card (Supervisor side)
**File to modify:** `src/pages/dashboard/AnalyticsIntelligence.tsx`
- Add AI recommendation card: "Based on 23 reports from Andheri West, prioritise Brand X inspection tomorrow"
- Logic: group reports by `city + brand`, sort by count, show top 3

---

## Track 2 — Personal Nutrition Filter (Consumer side)

### The Gap Right Now
- Scanner reads label fields: MRP, manufacturer, quantity
- BUT: does NOT read nutrition panel values
- No user health profile exists

### What We Add

#### Step 1 — User Health Profile Setup
**New file:** `src/pages/dashboard/HealthProfilePage.tsx`
- One-time setup screen for consumer
- Fields:
  - Condition: Diabetes / High BP / Pregnancy / Fitness / None
  - Daily goals (optional): Max sugar (g), Max sodium (mg), Min protein (g), Max calories
  - Diet type: Veg / Vegan / Gluten-free
- Save to localStorage via Zustand

**New file:** `src/store/healthProfileStore.ts`
- Store user's health profile
- Persist in localStorage

#### Step 2 — Nutrition Extraction from Scan
**File to modify:** `src/lib/fieldExtractors.ts` (or equivalent)
- Extend OCR extraction to pull:
  - Calories per serving
  - Total sugar (g)
  - Sodium (mg)
  - Protein (g)
  - Total fat (g)
  - Serving size

#### Step 3 — Verdict After Scan (Consumer only)
**File to modify:** `src/pages/dashboard/ProductScanner.tsx`
- After scan completes, show new section:

```
┌─────────────────────────────┐
│  🏥 Health Check for YOU    │
│                             │
│  ✅ Protein: Good (18g)     │
│  ❌ Sugar: Too high (32g)   │
│     Your limit: 10g/day     │
│  ⚠️  Sodium: borderline     │
│                             │
│  VERDICT: ❌ Avoid          │
│  "High sugar — not for      │
│   diabetics"                │
└─────────────────────────────┘
```

---

## Implementation Order

| Priority | Task | Effort |
|----------|------|--------|
| 1 | `healthProfileStore.ts` — new store | Small |
| 2 | `HealthProfilePage.tsx` — setup UI | Medium |
| 3 | Nutrition extraction from OCR | Medium |
| 4 | Verdict widget in ProductScanner | Medium |
| 5 | Location capture in complaints | Small |
| 6 | Brand aggregation in OverviewDashboard | Medium |
| 7 | `BrandViolationHeatmap.tsx` | Medium |
| 8 | "Where to go tomorrow" in Analytics | Small |

---

## Files to Create (New)
- `src/store/healthProfileStore.ts`
- `src/pages/dashboard/HealthProfilePage.tsx`
- `src/pages/dashboard/BrandViolationHeatmap.tsx`

## Files to Modify (Existing)
- `src/pages/dashboard/ProductScanner.tsx` — add nutrition verdict
- `src/pages/dashboard/OverviewDashboard.tsx` — add hotspot widget
- `src/pages/dashboard/AnalyticsIntelligence.tsx` — add "where to go" card
- `src/services/complaintService.ts` — add location fields
- `src/pages/dashboard/ConsumerComplaintsPortal.tsx` — add location capture
- `src/App.tsx` — add HealthProfile route

---

## What We Are NOT Changing
- Auth system (3 roles are perfect)
- OCR engine
- Compliance rules engine
- EcommerceCrawler
- RegulatoryRAGPortal
- ManufacturerRiskRanking
- ViolationsLedger
