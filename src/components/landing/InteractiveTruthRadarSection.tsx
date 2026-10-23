import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { DoodleSparkle } from '../doodles/DoodleIcons';

const DEMO_PRODUCTS = [
  {
    name: 'NutriBar Protein Plus (Choc Fudge, 50g)',
    brand: 'HealthFirst Foods',
    score: 31,
    verdict: 'NON-COMPLIANT',
    verdictBg: 'bg-rose-100 text-rose-800 border-rose-300',
    violations: [
      { type: 'CRITICAL', text: '"15g Protein" claim refers to 3-bar multipack, not single 50g serving' },
      { type: 'HIGH', text: 'Palm oil masked as "edible vegetable oil blend" on front panel' },
      { type: 'FLAGGED', text: 'MRP typeface 0.6mm — below Legal Metrology Rule 8 minimum of 1mm' },
    ],
    healthFlags: ['🏋 GYM: Protein claim misleading', '🌿 VEGAN: Contains milk derivatives'],
  },
  {
    name: 'NatureFarm Organic Honey (500g)',
    brand: 'GreenLeaf Agro Pvt Ltd',
    score: 24,
    verdict: 'NON-COMPLIANT',
    verdictBg: 'bg-rose-100 text-rose-800 border-rose-300',
    violations: [
      { type: 'CRITICAL', text: '"100% Pure Natural Honey" — Invert Sugar Syrup listed 2nd by weight' },
      { type: 'HIGH', text: 'Missing country of origin on multilayer import pouch' },
      { type: 'FLAGGED', text: 'Consumer care contact address incomplete — PCR Sec 2(k)' },
    ],
    healthFlags: ['⚠ DIABETIC: High GI sweet syrups', '🌸 ALLERGY: Unfiltered pollen allergens'],
  },
  {
    name: 'CrunchMate "Zero Sugar" Digestive (400g)',
    brand: 'Biscuit Corp India',
    score: 41,
    verdict: 'REVIEW NEEDED',
    verdictBg: 'bg-amber-100 text-amber-800 border-amber-300',
    violations: [
      { type: 'CRITICAL', text: 'Maltodextrin (GI 110) replaces sugar — not disclosed as high-glycemic' },
      { type: 'HIGH', text: '"Whole Wheat" front claim — refined maida 1st ingredient by weight' },
    ],
    healthFlags: ['🔴 DIABETIC: Maltodextrin spikes insulin', '🌾 REFINED: 68% maida by weight'],
  },
];

export const InteractiveTruthRadarSection: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [scanProgress, setScanProgress] = useState(100);
  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = (idx: number) => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setActiveProduct(idx);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setIsScanning(false);
      }
      setScanProgress(Math.min(Math.round(p), 100));
    }, 70);
  };

  const product = DEMO_PRODUCTS[activeProduct];

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Live Demo Simulator
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Test the truth engine in real-time
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select a common supermarket product below to see how our AI detects discrepancies and extracts statutory compliance violations.
          </p>
        </div>

        {/* Demo container with rounded-[32px] aesthetic */}
        <div className="bg-[#FAF9F5] rounded-[32px] border border-slate-200/90 p-6 sm:p-10 shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Selector List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Click a Product to Scan
              </div>

              {DEMO_PRODUCTS.map((p, idx) => {
                const isSelected = activeProduct === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => triggerScan(idx)}
                    className={`w-full text-left p-5 rounded-[20px] border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/20'
                        : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        {p.brand}
                      </span>
                      {isSelected && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${p.verdictBg}`}>
                          {p.verdict}
                        </span>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {p.name}
                    </div>
                  </button>
                );
              })}

              <div className="pt-2">
                <Link
                  to="/dashboard/scanner"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  Want to scan your own photo? Open Free Scanner <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Scan Results Card */}
            <div className="lg:col-span-7 bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200 shadow-sm">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>{isScanning ? 'AI Engine Analyzing Packaging...' : 'Analysis Complete • 1.8s'}</span>
                  <span className="font-mono text-slate-900">{scanProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-150"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>

              {/* Compliance Score & Verdict Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                    Compliance Score
                  </div>
                  <div className="text-4xl font-black text-slate-900 font-sans">
                    {product.score}<span className="text-lg text-slate-400 font-normal"> / 100</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Statutory Verdict
                  </div>
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${product.verdictBg}`}>
                    {product.verdict}
                  </span>
                </div>
              </div>

              {/* Violations */}
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Violations Detected ({product.violations.length})
                </div>
                <div className="space-y-2.5">
                  {product.violations.map((v, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80 flex items-start gap-3"
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-200 text-rose-900 shrink-0 mt-0.5">
                        {v.type}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800 leading-snug">
                        {v.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Profile Tags */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Health Profile Triggers
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.healthFlags.map((flag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTruthRadarSection;
