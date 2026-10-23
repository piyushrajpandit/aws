import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  {
    value: 250000,
    display: '250k+',
    label: 'Commodities Verified',
    sub: 'Blinkit · Zepto · Instamart · Retail shelves',
    accentChar: '01',
  },
  {
    value: 98.4,
    display: '98.4%',
    label: 'Claim Detection Accuracy',
    sub: 'Misleading ads, asterisk abuse, font violations',
    accentChar: '02',
  },
  {
    value: 2,
    display: '< 2s',
    label: 'AI Inference Time',
    sub: 'Vision + OCR + Rule engine pipeline end-to-end',
    accentChar: '03',
  },
  {
    value: 100,
    display: '100%',
    label: 'Legally Grounded',
    sub: 'Legal Metrology Act 2009 · CCPA 2022',
    accentChar: '04',
  },
];

// Asymmetric Bento: 2 large on left + 2 stacked on right
export const TiltedPastelStatsSection: React.FC = () => {
  return (
    <section className="bg-white border-t border-slate-900/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header bar */}
        <div className="flex items-center gap-4 py-6 border-b border-slate-900/8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.16em] font-mono text-slate-500">
              Platform Metrics
            </span>
          </div>
          <div className="flex-1 h-px bg-slate-900/6" />
        </div>

        {/* Bento grid — asymmetric */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-900/8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`py-12 px-8 first:pl-0 relative group hover:bg-slate-950 transition-colors duration-200 ${
                i === 0 ? 'col-span-1' : ''
              }`}
            >
              {/* Index */}
              <div className="text-[10px] font-black font-mono text-slate-200 group-hover:text-slate-700 uppercase tracking-[0.1em] mb-6 transition-colors">
                {stat.accentChar}
              </div>

              {/* Value */}
              <div
                className="font-black font-mono text-slate-950 group-hover:text-white leading-none mb-2 transition-colors"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', letterSpacing: '-0.04em' }}
              >
                {stat.display}
              </div>

              {/* Label */}
              <div className="text-[11px] font-black font-mono uppercase tracking-[0.08em] text-amber-600 group-hover:text-amber-400 mb-2 transition-colors">
                {stat.label}
              </div>

              {/* Sub */}
              <div className="text-[10px] text-slate-400 group-hover:text-slate-500 font-sans leading-relaxed transition-colors">
                {stat.sub}
              </div>

              {/* Hover accent line at bottom */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TiltedPastelStatsSection;
