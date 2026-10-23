import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const marqueRef = useRef<HTMLDivElement>(null);

  // Ticker items cycling through real deception facts
  const tickerItems = [
    '⚠ Maltodextrin (GI 110) in "Zero Sugar" biscuits',
    '⚠ "15g Protein" claim refers to 3-bar pack, not one bar',
    '⚠ Invert Sugar Syrup listed as "Natural Honey" on front panel',
    '⚠ Shrinkflation: 250g → 180g, same price on Blinkit',
    '⚠ "Whole Wheat" snack: 80% refined maida by weight',
    '⚠ Font height violation: MRP in 0.6mm instead of Rule 8 minimum',
    '⚠ Palm oil listed 3rd on front, 1st ingredient by weight on back',
  ];

  return (
    <section className="relative bg-white overflow-hidden" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Left vertical rule */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-900/8 hidden lg:block" />
      {/* Right vertical rule */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-slate-900/8 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Upper section: editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 pt-16 pb-0 lg:pt-24">
          {/* Left: overline + hero headline */}
          <div className="lg:col-span-7 lg:pr-16 pb-12 lg:pb-20 border-b lg:border-b-0 lg:border-r border-slate-900/8">
            {/* Overline pill — sharp */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-1.5 h-1.5 bg-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.14em] font-mono text-slate-500">
                India's Packaging Truth Copilot
              </span>
            </div>

            {/* Main heading — ultra-large, sharp, editorial */}
            <h1
              className="font-black tracking-[-0.03em] text-slate-950 leading-[0.92] mb-8"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}
            >
              <span className="block">Every</span>
              <span className="block text-slate-400">package</span>
              <span className="block">hides</span>
              <span className="block">
                a <em className="not-italic relative inline-block">
                  <span className="relative z-10 text-white px-3" style={{ textShadow: 'none' }}>truth.</span>
                  <span className="absolute inset-0 bg-slate-950" style={{ zIndex: 1 }} />
                </em>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md font-sans mb-10">
              SatyaDrishti decodes the gap between the front-of-pack marketing claim and the back-panel ingredient reality — surfacing shrinkflation, deceptive nutrition labels, and legal violations in 2 seconds.
            </p>

            {/* CTA row — flat, no rounded corners */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                to="/dashboard/scanner"
                id="hero-launch-scanner-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-950 hover:bg-slate-800 text-white text-[12px] font-black uppercase tracking-[0.1em] font-mono transition-colors group"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                Launch Free Scanner
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/directory"
                id="hero-browse-directory-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-slate-300 hover:border-slate-950 text-slate-700 hover:text-slate-950 text-[12px] font-black uppercase tracking-[0.1em] font-mono transition-colors"
              >
                Browse Directory
              </Link>
            </div>

            {/* Micro credibility bar */}
            <div className="mt-10 pt-8 border-t border-slate-900/8 flex flex-wrap items-center gap-6">
              {[
                { value: '250k+', label: 'Products Verified' },
                { value: '98.4%', label: 'Claim Accuracy' },
                { value: '2 sec', label: 'AI Inference' },
              ].map((item) => (
                <div key={item.value} className="flex items-baseline gap-2">
                  <span className="text-2xl font-black tracking-tight text-slate-950 font-mono">{item.value}</span>
                  <span className="text-[10px] uppercase tracking-[0.08em] text-slate-400 font-mono">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero visual — product scan mockup */}
          <div className="lg:col-span-5 lg:pl-10 pb-12 lg:pb-20 flex items-start pt-2">
            <div className="w-full">
              {/* Main scan card */}
              <div className="bg-slate-950 text-white p-5 mb-3 relative overflow-hidden">
                {/* Corner marks */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-400/60" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-400/60" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-400/60" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-400/60" />

                {/* Status bar */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-slate-400">
                      Scan Complete — 1.8s
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">SD-2024-07</span>
                </div>

                <div className="text-[11px] font-mono text-slate-400 mb-1 uppercase tracking-[0.08em]">Product</div>
                <div className="text-base font-black text-white mb-4">
                  "NutriBar Protein Plus" (Chocolate Fudge, 50g)
                </div>

                {/* Violation findings */}
                <div className="space-y-2">
                  {[
                    {
                      severity: 'CRITICAL',
                      color: 'text-red-400',
                      bg: 'bg-red-400/10',
                      text: 'Front claim "15g Protein" refers to 3-bar pack (150g), not 50g serving',
                    },
                    {
                      severity: 'HIGH',
                      color: 'text-amber-400',
                      bg: 'bg-amber-400/10',
                      text: 'Palm oil (1st ingredient by weight) hidden behind "edible oil blend" on front',
                    },
                    {
                      severity: 'FLAGGED',
                      color: 'text-sky-400',
                      bg: 'bg-sky-400/10',
                      text: 'MRP typeface 0.6mm — below Rule 8 minimum height of 1mm',
                    },
                  ].map((v, i) => (
                    <div key={i} className={`${v.bg} border border-white/5 p-2.5 flex gap-2.5 items-start`}>
                      <span className={`text-[9px] font-black font-mono tracking-wider shrink-0 mt-0.5 ${v.color}`}>
                        {v.severity}
                      </span>
                      <span className="text-[11px] text-slate-300 leading-tight">{v.text}</span>
                    </div>
                  ))}
                </div>

                {/* Health profile bar */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.08em] mb-2">
                    Active Health Profile
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['🏋 Gym Mode', '⚠ Diabetic Filter', '🌾 Gluten-Free'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-white/8 text-slate-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compliance score bar */}
              <div className="bg-slate-100 border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-slate-500 mb-0.5">
                    Compliance Score
                  </div>
                  <div className="text-3xl font-black text-slate-950 font-mono">31/100</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-slate-500 mb-0.5">
                    Verdict
                  </div>
                  <div className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black font-mono uppercase tracking-wider">
                    NON-COMPLIANT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling ticker */}
        <div className="border-t border-slate-900/8 py-3 overflow-hidden relative">
          <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-[11px] font-mono text-slate-400 shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
