import React from 'react';

const DATA_STRIP = [
  { value: '250k+', label: 'Commodities Verified', sub: 'Blinkit · Zepto · Instamart · Retail' },
  { value: '98.4%', label: 'Claim Detection Accuracy', sub: 'Misleading ads, asterisk abuse, font violations' },
  { value: '< 2s', label: 'AI Inference Time', sub: 'Vision + OCR + Rule engine pipeline' },
  { value: '100%', label: 'Legal Grounding', sub: 'Legal Metrology Act 2009 · CCPA 2022' },
];

export const ManifestoStatementSection: React.FC = () => {
  return (
    <section className="bg-slate-950 text-white relative overflow-hidden">
      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Manifesto statement */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 border-b border-white/8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            {/* Index label */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1.5 h-1.5 bg-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.16em] font-mono text-slate-500">
                Our Mandate
              </span>
            </div>

            <h2
              className="font-black tracking-[-0.025em] text-white leading-[0.96]"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
            >
              <span className="block">The statutory engine</span>
              <span className="block text-slate-400">that reads what</span>
              <span className="block">
                brands{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">won't tell you.</span>
                  <span
                    className="absolute bottom-1 left-0 right-0 h-[3px] bg-amber-400"
                    style={{ zIndex: 0 }}
                  />
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Bridging Legal Metrology gazette law with computer vision — so no citizen has to guess what is real nutrition and what is disguised marketing engineered to exploit regulatory gaps.
            </p>
          </div>
        </div>
      </div>

      {/* Data strip — high-density horizontal bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8">
          {DATA_STRIP.map((item, i) => (
            <div key={i} className="py-10 px-6 first:pl-0 last:pr-0">
              <div
                className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white mb-1"
                style={{ letterSpacing: '-0.03em' }}
              >
                {item.value}
              </div>
              <div className="text-[11px] font-bold font-mono uppercase tracking-[0.1em] text-amber-400 mb-1">
                {item.label}
              </div>
              <div className="text-[10px] text-slate-500 font-sans">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoStatementSection;
