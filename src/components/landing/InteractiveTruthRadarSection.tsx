import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, AlertTriangle, ShieldAlert, Scale } from 'lucide-react';

interface DemoProduct {
  id: string;
  category: string;
  title: string;
  summary: string;
  truthScore: number;
  promotedSlogan: string;
  promotedBadge: string;
  actualReality: string;
  healthTriggers: {
    icon: string;
    title: string;
    description: string;
  }[];
  shrinkflation: {
    hike: string;
    hikeSub: string;
    violationTitle: string;
    violationRule: string;
  };
}

const PRODUCTS: DemoProduct[] = [
  {
    id: 'powerpro',
    category: 'FITNESS NUTRITION',
    title: 'PowerPro Active Almond & Honey Protein...',
    summary: 'Claims "High Protein & 100% Real Honey", but 82% of calories come from Maida and Palm Oil.',
    truthScore: 10,
    promotedBadge: 'PROMOTED SLOGAN',
    promotedSlogan: '"100% PURE KASHMIRI HONEY"',
    actualReality: 'Honey is accompanied or dominated by cheap Invert Sugar / Liquid Glucose.',
    healthTriggers: [
      {
        icon: '🚨',
        title: 'Hidden Blood Sugar Trigger: MALTODEXTRIN',
        description: 'Found "maltodextrin" in ingredients. Glycemic index of 110—spikes insulin faster than pure table sugar (GI 65)!',
      },
      {
        icon: '⚠️',
        title: 'Heavy Sugar Load Detected',
        description: 'Contains 22g sugar per 100g, exceeding 30% of standard diabetic daily safe thresholds.',
      },
    ],
    shrinkflation: {
      hike: '+25% Stealth Price Hike',
      hikeSub: 'Reduced from 125 g down to 100 g at identical ₹99.00.',
      violationTitle: 'STATUTORY RULE VIOLATION',
      violationRule: 'Rule 8(1): Mandatory Unit Sale Price font height is 1.2mm, below statutory minimum 3.0mm for 100g packaging area.',
    },
  },
  {
    id: 'sugarlite',
    category: 'DIABETIC & LOW GI NUTRITION',
    title: 'SugarLite GlucoDefend 100% Whole Grain...',
    summary: 'Claims "Zero Added Sugar & Diabetic Friendly", secretly loads Maltodextrin with Glycemic Index 110.',
    truthScore: 18,
    promotedBadge: 'PROMOTED SLOGAN',
    promotedSlogan: '"ZERO ADDED SUGAR & DIABETIC SAFE"',
    actualReality: 'Replaces table sugar with Maltodextrin (GI 110), triggering acute postprandial glucose surges.',
    healthTriggers: [
      {
        icon: '🔴',
        title: 'Extreme Glycemic Trigger (GI 110)',
        description: 'Maltodextrin spikes blood sugar higher and faster than pure dextrose or table sugar.',
      },
      {
        icon: '🌾',
        title: 'Maida Adulteration Warning',
        description: 'Whole wheat is listed 3rd; 68% of composite flour is refined wheat flour (maida).',
      },
    ],
    shrinkflation: {
      hike: '+18% Hidden Markup',
      hikeSub: 'Pack shrunk from 400g to 330g with unchanged ₹120 MRP.',
      violationTitle: 'CCPA 2022 MISLEADING AD',
      violationRule: 'Section 4: Claiming "Diabetic Safe" without statutory warning on high glycemic excipients violates CCPA Guidelines 2022.',
    },
  },
  {
    id: 'naturevalley',
    category: 'DRY FRUITS & E-COMMERCE QUICK COMM',
    title: 'NatureValley Royal Whole Roasted Jumbo...',
    summary: 'Quietly dropped weight from 250g to 180g (+38% stealth price hike) on Blinkit/Zepto with missing USP.',
    truthScore: 28,
    promotedBadge: 'PROMOTED SLOGAN',
    promotedSlogan: '"JUMBO VALUE PACK — BEST PRICE"',
    actualReality: 'Silent weight downsize on quick-commerce apps while retaining identical barcode and price tag.',
    healthTriggers: [
      {
        icon: '🧂',
        title: 'Excessive Sodium Coating',
        description: 'Marketed as "Heart Healthy Roasted", contains 640mg sodium per 100g in synthetic seasoning.',
      },
      {
        icon: '🌿',
        title: 'Palm Oil Glaze Detected',
        description: 'Coated with hydrogenated vegetable palm fat to increase shelf weight.',
      },
    ],
    shrinkflation: {
      hike: '+38.8% Stealth Price Hike',
      hikeSub: 'Quietly downsized from 250g to 180g on quick-commerce apps at same ₹299.',
      violationTitle: 'LEGAL METROLOGY PCR RULE 6',
      violationRule: 'Missing mandatory Unit Sale Price (USP per 100g) on quick-commerce app catalog listing.',
    },
  },
];

export const InteractiveTruthRadarSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('powerpro');
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'diabetes',
    'hypertension',
    'heart',
    'celiac',
  ]);

  const toggleFilter = (filterKey: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((k) => k !== filterKey)
        : [...prev, filterKey]
    );
  };

  const product = PRODUCTS.find((p) => p.id === selectedProduct) || PRODUCTS[0];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider mb-5">
            Interactive Verification
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            See How Truth is Uncovered in 2 Seconds
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Select a common supermarket trap below to see how our engine cross-examines front slogans against back reality.
          </p>
        </div>

        {/* 3 Product Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PRODUCTS.map((p) => {
            const isSelected = selectedProduct === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProduct(p.id)}
                className={`text-left p-6 rounded-[22px] border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-slate-900 shadow-[0_12px_30px_rgba(0,0,0,0.08)] ring-1 ring-slate-900'
                    : 'bg-white/80 border-slate-200/90 hover:bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {p.category}
                    </span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-sm font-black text-slate-900 leading-snug mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Big White Container with Verification Details */}
        <div className="bg-white rounded-[32px] border border-slate-200/90 p-6 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
          {/* Top Bar: Active Consumer Filters + Truth Score */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                Active Consumer Filters:
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { key: 'diabetes', label: 'Diabetes & Blood Sugar', icon: '🩺' },
                  { key: 'hypertension', label: 'High BP & Hypertension', icon: '❤️' },
                  { key: 'heart', label: 'Heart & High Cholesterol', icon: '🫀' },
                  { key: 'celiac', label: 'Celiac & Gluten Free', icon: '🌾' },
                ].map((f) => {
                  const isActive = activeFilters.includes(f.key);
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => toggleFilter(f.key)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-xs'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      <span>{f.icon}</span>
                      <span>{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Truth Score */}
            <div className="text-left lg:text-right shrink-0">
              <div className="text-4xl sm:text-5xl font-black text-rose-600 leading-none mb-1 font-sans">
                {product.truthScore} <span className="text-slate-300 font-normal">/ 100</span>
              </div>
              <div className="text-[10px] font-mono font-black uppercase tracking-[0.14em] text-slate-400">
                Truth Index
              </div>
            </div>
          </div>

          {/* 3 Detail Breakdown Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8">
            {/* 1. FRONT SLOGAN VS REALITY */}
            <div className="bg-[#FFFDF5] rounded-[22px] border border-amber-200/80 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-amber-800 mb-5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Front Slogan vs Reality
                </div>

                <div className="space-y-4">
                  {/* Promoted Slogan */}
                  <div className="p-4 rounded-xl bg-white border border-amber-200/70 shadow-xs">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {product.promotedBadge}
                    </div>
                    <div className="text-sm font-black text-slate-900 leading-snug">
                      {product.promotedSlogan}
                    </div>
                  </div>

                  {/* Actual Ingredient Reality */}
                  <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/70 shadow-xs">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Actual Ingredient Reality
                    </div>
                    <div className="text-xs text-rose-950 font-medium leading-relaxed">
                      {product.actualReality}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. HEALTH & ALLERGEN IMPACT */}
            <div className="bg-[#F6FEFA] rounded-[22px] border border-emerald-200/80 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-emerald-800 mb-5">
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  Health & Allergen Impact
                </div>

                <div className="space-y-3.5">
                  {product.healthTriggers.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-emerald-200/70 shadow-xs"
                    >
                      <div className="text-xs font-black text-slate-900 mb-1.5 flex items-start gap-1.5 leading-snug">
                        <span>{t.icon}</span>
                        <span>{t.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. SHRINKFLATION & LAW */}
            <div className="bg-[#FAF8FF] rounded-[22px] border border-violet-200/80 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-violet-800 mb-5">
                  <Scale className="w-4 h-4 text-violet-600" />
                  Shrinkflation & Law
                </div>

                <div className="space-y-3.5">
                  {/* Price hike */}
                  <div className="p-4 rounded-xl bg-white border border-violet-200/70 shadow-xs">
                    <div className="text-sm font-black text-slate-900 mb-1">
                      {product.shrinkflation.hike}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {product.shrinkflation.hikeSub}
                    </p>
                  </div>

                  {/* Violation */}
                  <div className="p-4 rounded-xl bg-white border border-violet-200/70 shadow-xs">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1">
                      {product.shrinkflation.violationTitle}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {product.shrinkflation.violationRule}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Callout Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              Want to verify your own packaged snack, biscuit, or online order?
            </span>

            <Link
              to="/dashboard/scanner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>⚡</span>
              <span>Open Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTruthRadarSection;
