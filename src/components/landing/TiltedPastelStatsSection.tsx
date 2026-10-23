import React from 'react';

const STATS = [
  {
    value: '250k+',
    label: 'Commodities Verified',
    description: 'Packaged items scanned across Blinkit, Zepto, Instamart & local kirana shelves.',
    bgColor: 'bg-[#EEF2FF]',
    borderColor: 'border-[#C7D2FE]',
    textColor: 'text-[#3730A3]',
    tiltClass: 'sm:-rotate-1 hover:rotate-0',
  },
  {
    value: '98.4%',
    label: 'Deceptive Claim Accuracy',
    description: 'Pinpoints asterisk tricks, microscopic text violations, and synthetic additives.',
    bgColor: 'bg-[#FDF2F8]',
    borderColor: 'border-[#FBCFE8]',
    textColor: 'text-[#9D174D]',
    tiltClass: 'sm:rotate-2 hover:rotate-0',
  },
  {
    value: '< 2s',
    label: 'AI Verification Speed',
    description: 'Instant multi-angle optical character recognition and statutory rule checking.',
    bgColor: 'bg-[#F0FDFA]',
    borderColor: 'border-[#99F6E4]',
    textColor: 'text-[#0D9488]',
    tiltClass: 'sm:-rotate-2 hover:rotate-0',
  },
  {
    value: '100%',
    label: 'Legally Grounded',
    description: 'Strictly backed by Legal Metrology Act 2009 & CCPA Misleading Ads 2022.',
    bgColor: 'bg-[#FEF3C7]',
    borderColor: 'border-[#FDE68A]',
    textColor: 'text-[#B45309]',
    tiltClass: 'sm:rotate-1 hover:rotate-0',
  },
];

export const TiltedPastelStatsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.bgColor} ${stat.borderColor} ${stat.tiltClass} p-8 rounded-[24px] border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 transform flex flex-col justify-between min-h-[220px]`}
            >
              <div>
                <div
                  className={`text-4xl sm:text-5xl font-black ${stat.textColor} tracking-tight leading-none mb-3 font-sans`}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 leading-snug mb-2">
                  {stat.label}
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TiltedPastelStatsSection;
