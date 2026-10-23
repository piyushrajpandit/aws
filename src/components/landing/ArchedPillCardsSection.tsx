import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const TRAPS = [
  {
    id: 'A',
    category: 'Ingredient Substitution',
    title: 'Honey & Invert Sugar Dilution',
    description:
      'Brands claim "100% Pure Natural Honey" on the front, while the back ingredient panel lists Invert Sugar Syrup and Liquid Glucose as the top sweeteners by weight.',
    statutoryTag: 'CCPA 2022 Misleading Advertisement',
    impact: 'Affects 340M households consuming honey annually',
    accentColor: '#D97706', // amber-600
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  {
    id: 'B',
    category: 'Fitness Nutrition Trap',
    title: 'The Gym "Protein Washing" Scam',
    description:
      'Snack bars display bold "15g Protein*" claims, asterisking to the entire 3-bar multipack (150g) rather than one bar. 70% of calories come from palm oil.',
    statutoryTag: 'Asterisk Loophole · PCR Rule 6',
    impact: '62M gym-going Indians misled on protein intake',
    accentColor: '#E11D48', // rose-600
    bgColor: '#FFF1F2',
    borderColor: '#FECDD3',
  },
  {
    id: 'C',
    category: 'Metabolic Health Risk',
    title: 'The Diabetic Maltodextrin Danger',
    description:
      '"Zero Added Cane Sugar" digestive biscuits replace sugar with Maltodextrin (Glycemic Index 110), spiking insulin faster than pure table glucose.',
    statutoryTag: 'High Glycemic Trigger · FSSAI Regs 2019',
    impact: '101M diabetics exposed to unlabelled GI risk',
    accentColor: '#0D9488', // teal-600
    bgColor: '#F0FDFA',
    borderColor: '#99F6E4',
  },
  {
    id: 'D',
    category: 'Quick-Commerce Price Abuse',
    title: 'Shrinkflation & Stealth Hikes',
    description:
      'Popular dry fruit and chip packages quietly downsize from 250g to 180g on Blinkit and Zepto while retaining identical prices and omitting unit sale prices.',
    statutoryTag: 'Legal Metrology PCR Rule 6 Violation',
    impact: 'Detected in 38k+ SKUs across quick-commerce',
    accentColor: '#7C3AED', // violet-600
    bgColor: '#F5F3FF',
    borderColor: '#DDD6FE',
  },
];

export const ArchedPillCardsSection: React.FC = () => {
  return (
    <section className="bg-white border-t border-slate-900/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header bar */}
        <div className="flex items-center gap-4 py-6 border-b border-slate-900/8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.16em] font-mono text-slate-500">
              Truth In Action — Common Traps We Expose
            </span>
          </div>
          <div className="flex-1 h-px bg-slate-900/6" />
        </div>

        {/* Bento grid: 2x2 with an asymmetric editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-slate-900/8">
          {TRAPS.map((trap, idx) => (
            <div
              key={trap.id}
              className={`p-8 lg:p-10 border-slate-900/8 group hover:bg-slate-950 transition-colors duration-200 ${
                idx % 2 === 0 ? 'md:border-r' : ''
              } ${idx < 2 ? 'border-b' : ''}`}
            >
              {/* Category + ID */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-black font-mono uppercase tracking-[0.14em]"
                    style={{ color: trap.accentColor }}
                  >
                    {trap.category}
                  </span>
                </div>
                <span className="text-[40px] font-black font-mono text-slate-100 group-hover:text-slate-800 leading-none transition-colors select-none">
                  {trap.id}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-black text-slate-950 group-hover:text-white leading-tight mb-3 transition-colors"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', letterSpacing: '-0.02em' }}
              >
                {trap.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-sans mb-6 transition-colors">
                {trap.description}
              </p>

              {/* Statutory tag */}
              <div
                className="inline-block text-[10px] font-black font-mono uppercase tracking-[0.1em] px-2.5 py-1 mb-4 border"
                style={{
                  color: trap.accentColor,
                  borderColor: trap.borderColor,
                  backgroundColor: trap.bgColor,
                }}
              >
                {trap.statutoryTag}
              </div>

              {/* Impact stat */}
              <div className="pt-4 border-t border-slate-900/8 group-hover:border-white/10 flex items-center justify-between transition-colors">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-500">
                  {trap.impact}
                </span>
                <Link
                  to="/dashboard/scanner"
                  className="text-[10px] font-mono font-black uppercase tracking-[0.1em] text-slate-400 hover:text-slate-950 group-hover:text-white flex items-center gap-1 transition-colors"
                >
                  Test on Scanner <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchedPillCardsSection;
