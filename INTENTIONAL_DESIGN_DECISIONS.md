# 📌 Intentional Design Decisions & Hidden Features Registry

> **CRITICAL NOTICE FOR AI AGENTS & DEVELOPERS:**
> Do **NOT** treat any of the items listed in this document as bugs, dead code, broken links, or regressions. 
> These features and UI sections were **intentionally hidden by user instruction** to keep the user experience lean, punchy, and focused on the core problem statement (Personal Nutrition Health Checks & ₹10 Micro-Fraud Enforcement).

---

## 1. Intentionally Hidden Landing Page & Navbar Sections

The following 4 sections exist in the codebase but have been intentionally commented out / hidden:

### A. Product Directory & Verification (`/directory` & `/verify`)
* **Status:** Hidden from landing navigation.
* **Location:** [`src/components/layout/LandingNavbar.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/components/layout/LandingNavbar.tsx) (desktop & mobile nav).
* **Rationale:** The user chose to hide the public catalog link from the top navigation to prevent overwhelming first-time visitors with an enterprise search database. The underlying page [`PublicDirectoryPage.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/pages/PublicDirectoryPage.tsx) and its backend verification endpoints are fully intact and functional.

### B. Core Capabilities Section
* **Status:** Hidden from the home page and landing navigation.
* **Location:** [`src/pages/AboutPage.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/pages/AboutPage.tsx) (`<CoreCapabilitiesSection />` commented out) and [`LandingNavbar.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/components/layout/LandingNavbar.tsx).
* **Rationale:** Temporarily hidden to allow visitors to focus immediately on the live video scanner and direct platform launch without long scrolling text.

### C. Enforcement Flow Timeline
* **Status:** Hidden from the home page and landing navigation.
* **Location:** [`src/pages/AboutPage.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/pages/AboutPage.tsx) (`<WorkflowTimelineSection />` commented out) and [`LandingNavbar.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/components/layout/LandingNavbar.tsx).
* **Rationale:** Temporarily hidden by user request. The underlying component [`src/components/landing/WorkflowTimelineSection.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/components/landing/WorkflowTimelineSection.tsx) is preserved in full.

### D. Technical Engineering Blog (`/technical-blog`)
* **Status:** Hidden from the home page and landing navigation.
* **Location:** [`src/pages/AboutPage.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/pages/AboutPage.tsx) (`<TechJourneyBanner />` commented out) and [`LandingNavbar.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/components/layout/LandingNavbar.tsx).
* **Rationale:** Academic/technical write-up on OCR image processing algorithms is hidden so non-technical consumers and pitch judges don't get distracted from the working scanner demo. The page [`src/pages/TechnicalBlogPage.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/pages/TechnicalBlogPage.tsx) remains intact.

---

## 2. Fast 1-Click Role Switching Architecture
* **Status:** Active & Intentional.
* **Location:** [`src/pages/LoginPage.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/pages/LoginPage.tsx) and [`src/components/layout/Topbar.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/components/layout/Topbar.tsx).
* **Rationale:** The app includes a prominent 1-click role switcher in the top bar (`[ 🧑 Consumer ] [ 🛡️ Inspector ] [ 👑 Supervisor ]`) and 1-click launch cards on `/login`. This bypasses typing credentials during demos and debugging. Do not flag the lack of mandatory password friction on demo accounts as an auth defect.

---

## 3. How to Re-enable Any Hidden Item in the Future
To restore any of the 4 items:
1. Open [`src/pages/AboutPage.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/pages/AboutPage.tsx) and uncomment the respective component tag:
   ```tsx
   <TechJourneyBanner />
   <CoreCapabilitiesSection />
   <WorkflowTimelineSection />
   ```
2. Open [`src/components/layout/LandingNavbar.tsx`](file:///Users/piyushraj/.gemini/antigravity-ide/scratch/aws/src/components/layout/LandingNavbar.tsx) and uncomment the respective `<Link>` blocks in both desktop `<nav>` and mobile dropdown.
