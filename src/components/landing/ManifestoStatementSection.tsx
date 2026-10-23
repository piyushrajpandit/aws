import React from 'react';
import {
  DoodleSquiggle,
  DoodleSparkle,
  DoodleCurlyLoop,
  DoodleStar,
} from '../doodles/DoodleIcons';

export const ManifestoStatementSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden text-center">
      {/* Playful floating doodles around statement */}
      <div className="absolute top-10 left-8 sm:left-24 pointer-events-none">
        <DoodleSquiggle className="w-16 h-5" color="#F97316" />
      </div>
      <div className="absolute top-12 right-12 sm:right-28 pointer-events-none">
        <DoodleCurlyLoop className="w-10 h-10" color="#EC4899" />
      </div>
      <div className="absolute bottom-8 left-16 sm:left-32 pointer-events-none hidden sm:block">
        <DoodleStar className="w-7 h-7" color="#FBBF24" />
      </div>
      <div className="absolute bottom-10 right-20 sm:right-36 pointer-events-none hidden sm:block">
        <DoodleSparkle className="w-7 h-7" color="#10B981" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Consumer Empowerment Mission
        </div>

        {/* Large Friendly Statement with Colored Highlight Words */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug tracking-tight max-w-3xl mx-auto">
          Our statutory truth engine is ready to{' '}
          <span className="text-amber-600 font-black">read</span>,{' '}
          <span className="text-rose-500 font-black">inspect</span> and{' '}
          <span className="text-emerald-600 font-black relative inline-block">
            help you
            <svg
              viewBox="0 0 100 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-1 left-0 w-full h-2 text-emerald-400"
            >
              <path
                d="M2 9C25 2 75 2 98 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          uncover hidden sugars, stealth shrinkflation, and misleading label tricks on every grocery shelf.
        </h2>

        <p className="mt-6 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          Bridging India's Legal Metrology Act with state-of-the-art computer vision — giving every shopper effortless transparency in the palm of their hand.
        </p>
      </div>
    </section>
  );
};

export default ManifestoStatementSection;
