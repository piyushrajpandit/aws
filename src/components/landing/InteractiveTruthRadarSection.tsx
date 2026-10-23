import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Interactive scanner demo — simulated scan result
const DEMO_PRODUCTS = [
  {
    name: 'NutriBar Protein Plus (Choc Fudge, 50g)',
    brand: 'HealthFirst Foods',
    score: 31,
    verdict: 'NON-COMPLIANT',
    verdictColor: 'bg-red-600',
    violations: [
      { type: 'CRITICAL', text: '"15g Protein" claim refers to 3-bar multipack, not single serving' },
      { type: 'HIGH', text: 'Palm oil masked as "edible oil blend" on front panel' },
      { type: 'FLAGGED', text: 'MRP font 0.6mm — below Rule 8 minimum of 1mm' },
    ],
    healthFlags: ['⚠ GYM: Protein claim misleading', '🌿 VEGAN: Contains milk derivatives'],
  },
  {
    name: 'NatureFarm Organic Honey (500g)',
    brand: 'GreenLeaf Agro Pvt Ltd',
    score: 24,
    verdict: 'NON-COMPLIANT',
    verdictColor: 'bg-red-600',
    violations: [
      { type: 'CRITICAL', text: '"100% Pure Natural Honey" — Invert Sugar Syrup listed 2nd in ingredients' },
      { type: 'HIGH', text: 'Missing country of origin on multilayer import pack' },
      { type: 'FLAGGED', text: 'Customer care address incomplete — PCR Sec 2(k)' },
    ],
    healthFlags: ['⚠ DIABETIC: High GI sweeteners', '⚠ ALLERGY: Possible pollen allergens unlisted'],
  },
  {
    name: 'CrunchMate "Zero Sugar" Digestive (400g)',
    brand: 'Biscuit Corp India',
    score: 41,
    verdict: 'REVIEW NEEDED',
    verdictColor: 'bg-amber-500',
    violations: [
      { type: 'CRITICAL', text: 'Maltodextrin (GI 110) replaces sugar — not disclosed as high-glycemic' },
      { type: 'HIGH', text: '"Whole Wheat" front claim — refined maida 1st ingredient by weight' },
    ],
    healthFlags: ['🔴 DIABETIC: Maltodextrin spikes insulin', '⚠ GYM: 68% refined carbs by calorie'],
  },
];

export const InteractiveTruthRadarSection: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = (idx: number) => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setActiveProduct(idx);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setIsScanning(false);
      }
      setScanProgress(Math.min(Math.round(p), 100));
    }, 80);
  };

  useEffect(() => {
    setScanProgress(100);
  }, []);

  const product = DEMO_PRODUCTS[activeProduct];

  return (
    <section className="bg-slate-50 border-t border-slate-900/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header bar */}
        <div className="flex items-center gap-4 py-6 border-b border-slate-900/8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.16em] font-mono text-slate-500">
              Live Demo — Interactive Truth Radar
            </span>
          </div>
          <div className="flex-1 h-px bg-slate-900/6" />
          <Link
            to="/dashboard/scanner"
            className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400 hover:text-slate-950 flex items-center gap-1 transition-colors"
          >
            Full Scanner <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: product selector */}
          <div className="lg:col-span-4 lg:border-r border-slate-900/8 py-10 lg:pr-8">
            <div className="text-[10px] font-black uppercase tracking-[0.1em] font-mono text-slate-400 mb-4">
              Select Product to Analyze
            </div>
            <div className="space-y-0">
              {DEMO_PRODUCTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerScan(idx)}
                  className={`w-full text-left p-4 border-b border-slate-200 last:border-b-0 transition-all group ${
                    activeProduct === idx
                      ? 'bg-slate-950 border-slate-950'
                      : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono font-bold uppercase tracking-[0.1em] mb-1 ${
                      activeProduct === idx ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    {p.brand}
                  </div>
                  <div
                    className={`text-[12px] font-semibold leading-tight ${
                      activeProduct === idx ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {p.name}
                  </div>
                  {activeProduct === idx && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <div
                        className={`text-[9px] font-black font-mono px-2 py-0.5 ${p.verdictColor} text-white uppercase`}
                      >
                        {p.verdict}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Score: {p.score}/100</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: scan result */}
          <div className="lg:col-span-8 lg:pl-10 py-10">
            {/* Scan progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.08em]">
                  {isScanning ? 'Scanning…' : 'Analysis Complete'}
                </span>
                <span className="text-[10px] font-mono text-slate-950 font-bold">{scanProgress}%</span>
              </div>
              <div className="w-full h-0.5 bg-slate-200">
                <div
                  className="h-0.5 bg-amber-400 transition-all duration-100"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>

            {/* Compliance score */}
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-slate-200">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-slate-400 mb-1">
                  Compliance Score
                </div>
                <div className="text-6xl font-black font-mono text-slate-950" style={{ letterSpacing: '-0.04em' }}>
                  {product.score}
                  <span className="text-2xl text-slate-300">/100</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-slate-400 mb-2">Verdict</div>
                <div className={`inline-block px-3 py-1.5 text-[11px] font-black font-mono uppercase tracking-wider text-white ${product.verdictColor}`}>
                  {product.verdict}
                </div>
              </div>
            </div>

            {/* Violations */}
            <div className="mb-8">
              <div className="text-[10px] font-black uppercase tracking-[0.1em] font-mono text-slate-400 mb-3">
                Violations Found ({product.violations.length})
              </div>
              <div className="space-y-2">
                {product.violations.map((v, i) => {
                  const colors =
                    v.type === 'CRITICAL'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : v.type === 'HIGH'
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-sky-50 border-sky-200 text-sky-700';
                  return (
                    <div key={i} className={`flex gap-3 p-3 border ${colors}`}>
                      <span className="text-[9px] font-black font-mono shrink-0 mt-0.5 uppercase tracking-wider">
                        {v.type}
                      </span>
                      <span className="text-[12px] leading-snug">{v.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Health flags */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.1em] font-mono text-slate-400 mb-3">
                Health Profile Alerts
              </div>
              <div className="flex flex-wrap gap-2">
                {product.healthFlags.map((flag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-3 py-1 bg-white border border-slate-200 text-slate-700"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTruthRadarSection;
