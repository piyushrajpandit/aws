import React from 'react';

export const ManifestoStatementSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Main Headline with colored highlighted phrases and wavy doodle underline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] leading-[1.18] tracking-[-0.03em] max-w-3xl mx-auto mb-6">
          Our{' '}
          <span className="text-[#EA580C] relative inline-block">
            statutory engine
            {/* Wavy doodle underline */}
            <svg
              viewBox="0 0 260 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-2 left-0 w-full h-3 text-[#EA580C]"
            >
              <path
                d="M2 12C20 4 38 14 56 6C74 0 92 14 110 6C128 0 146 14 164 6C182 0 200 14 218 6C236 0 248 10 258 8"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{' '}
          is ready to inspect, verify and{' '}
          <span className="text-[#D97706]">help you</span> find truth in everyday Indian packaging and supermarket shelves.
        </h2>

        {/* Subtitle description */}
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
          Bridging Legal Metrology gazette law with computer vision so no citizen has to guess what is real and what is disguised marketing.
        </p>
      </div>
    </section>
  );
};

export default ManifestoStatementSection;
