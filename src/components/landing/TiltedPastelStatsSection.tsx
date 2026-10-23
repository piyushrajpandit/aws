import React from 'react';

const STATS = [
  {
    value: '250k+',
    description: 'Packaged commodities verified across Blinkit, Zepto, Instamart & retail shelves.',
    index: 'VERIFIED METRIC 01',
    bgColor: 'bg-[#EEF2FF]',
    borderColor: 'border-[#E0E7FF]',
    textColor: 'text-[#3730A3]',
    indexColor: 'text-[#6366F1]',
  },
  {
    value: '98.4%',
    description: 'Accuracy detecting misleading marketing claims, asterisks, and font size violations.',
    index: 'VERIFIED METRIC 02',
    bgColor: 'bg-[#FDF2F8]',
    borderColor: 'border-[#FCE7F3]',
    textColor: 'text-[#9F1239]',
    indexColor: 'text-[#F43F5E]',
  },
  {
    value: '2 sec',
    description: 'Average AI inference time to analyze nutrition tables and quantitative ingredients.',
    index: 'VERIFIED METRIC 03',
    bgColor: 'bg-[#F0FDFA]',
    borderColor: 'border-[#CCFBF1]',
    textColor: 'text-[#065F46]',
    indexColor: 'text-[#10B981]',
  },
  {
    value: '100%',
    description: 'Deterministic legal grounding in Legal Metrology Act 2009 & CCPA Guidelines 2022.',
    index: 'VERIFIED METRIC 04',
    bgColor: 'bg-[#FEF3C7]',
    borderColor: 'border-[#FDE68A]',
    textColor: 'text-[#92400E]',
    indexColor: 'text-[#D97706]',
  },
];

export const TiltedPastelStatsSection: React.FC = () => {
  return (
    <section className="pb-20 sm:pb-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.bgColor} ${stat.borderColor} rounded-[26px] p-7 sm:p-8 border shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col justify-between min-h-[220px]`}
            >
              <div>
                <div
                  className={`text-4xl sm:text-5xl font-black ${stat.textColor} tracking-tight leading-none mb-4 font-sans`}
                >
                  {stat.value}
                </div>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  {stat.description}
                </p>
              </div>

              {/* Bottom line + metric index */}
              <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-6">
                <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${stat.indexColor}`}>
                  {stat.index}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TiltedPastelStatsSection;
