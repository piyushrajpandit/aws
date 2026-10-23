import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  HoneyTrapDoodle,
  ProteinWashingDoodle,
  DiabeticMaltodextrinDoodle,
  ShrinkflationDoodle,
  DoodleSquiggle,
  DoodleSparkle,
  DoodleStar,
} from '../doodles/DoodleIcons';

interface TrapCard {
  id: string;
  category: string;
  title: string;
  description: string;
  statutoryTag: string;
  impact: string;
  archBg: string;
  badgeBg: string;
  badgeText: string;
  illustration: React.ReactNode;
}

const TRAPS: TrapCard[] = [
  {
    id: '01',
    category: 'Ingredient Substitution',
    title: 'Honey & Invert Sugar Dilution',
    description:
      'Brands claim "100% Pure Natural Honey" on the front, while the back ingredient panel lists Invert Sugar Syrup and Liquid Glucose as the top sweeteners by weight.',
    statutoryTag: 'CCPA 2022 Misleading Ad',
    impact: 'Affects 340M households consuming honey',
    archBg: 'bg-amber-50',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    badgeText: 'text-amber-800',
    illustration: <HoneyTrapDoodle className="w-full h-44" />,
  },
  {
    id: '02',
    category: 'Fitness Nutrition Trap',
    title: 'The Gym "Protein Washing" Scam',
    description:
      'Snack bars display bold "15g Protein*" claims, asterisking to the entire 3-bar multipack rather than a single bar. 70% of calories come from hidden palm oil.',
    statutoryTag: 'Asterisk Loophole Flagged',
    impact: '62M gym-going Indians misled on intake',
    archBg: 'bg-rose-50',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    badgeText: 'text-rose-800',
    illustration: <ProteinWashingDoodle className="w-full h-44" />,
  },
  {
    id: '03',
    category: 'Metabolic Health Risk',
    title: 'The Diabetic Maltodextrin Danger',
    description:
      '"Zero Added Cane Sugar" digestive biscuits replace sugar with Maltodextrin (Glycemic Index 110), spiking insulin faster than pure table glucose.',
    statutoryTag: 'High Glycemic Trigger',
    impact: '101M diabetics exposed to unlabelled GI',
    archBg: 'bg-emerald-50',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    badgeText: 'text-emerald-800',
    illustration: <DiabeticMaltodextrinDoodle className="w-full h-44" />,
  },
  {
    id: '04',
    category: 'Quick-Commerce Price Abuse',
    title: 'Shrinkflation & Stealth Hikes',
    description:
      'Popular dry fruit and chip packages quietly downsize from 250g to 180g on Blinkit and Zepto while retaining identical prices and omitting unit sale prices.',
    statutoryTag: 'PCR Rule 6 Violation',
    impact: '38k+ SKUs downsized silently this year',
    archBg: 'bg-violet-50',
    badgeBg: 'bg-violet-100 text-violet-900 border-violet-300',
    badgeText: 'text-violet-800',
    illustration: <ShrinkflationDoodle className="w-full h-44" />,
  },
];

export const ArchedPillCardsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] relative overflow-hidden">
      {/* Decorative floating doodles */}
      <div className="absolute top-12 left-10 hidden lg:block pointer-events-none">
        <DoodleSquiggle className="w-20 h-5" color="#F59E0B" />
      </div>
      <div className="absolute top-20 right-14 hidden lg:block pointer-events-none">
        <DoodleSparkle className="w-7 h-7" color="#EC4899" />
      </div>
      <div className="absolute bottom-12 right-20 hidden lg:block pointer-events-none">
        <DoodleStar className="w-8 h-8" color="#8B5CF6" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header with friendly typography and doodles */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Truth In Action
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Common deceptive traps{' '}
            <span className="relative inline-block text-amber-600">
              we expose
              <svg
                viewBox="0 0 180 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 left-0 w-full h-3 text-amber-400"
              >
                <path
                  d="M2 11C40 2 120 2 178 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real packaging tricks brands use every day on Indian grocery shelves — and how our computer vision catches them in seconds.
          </p>
        </div>

        {/* The 4 Arched Cards with Bespoke Hand-Drawn Doodle Illustrations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRAPS.map((trap) => (
            <div
              key={trap.id}
              className="group bg-white rounded-[28px] border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
            >
              {/* Arched Illustration Container at Top */}
              <div className="p-4 pb-0">
                <div
                  className={`${trap.archBg} rounded-t-[22px] rounded-b-[18px] p-4 flex flex-col items-center justify-center relative border border-slate-200/50 group-hover:scale-[1.01] transition-transform duration-300 overflow-hidden`}
                  style={{ minHeight: '190px' }}
                >
                  {/* Top pill with statutory tag & index */}
                  <div className="w-full flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${trap.badgeBg} shadow-xs`}
                    >
                      {trap.statutoryTag}
                    </span>
                    <span className="text-xs font-mono font-black text-slate-400 group-hover:text-slate-800 transition-colors">
                      {trap.id}
                    </span>
                  </div>

                  {/* Hand-Drawn Doodle Illustration */}
                  <div className="w-full flex items-center justify-center py-1">
                    {trap.illustration}
                  </div>
                </div>
              </div>

              {/* Card Body with Warm, Human Typography */}
              <div className="p-6 pt-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {trap.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug mb-3">
                    {trap.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {trap.description}
                  </p>
                </div>

                {/* Footer link & impact stat */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-medium text-slate-400">
                    {trap.impact}
                  </span>
                  <Link
                    to="/dashboard/scanner"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors group-hover:translate-x-0.5"
                  >
                    Test on Scanner
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchedPillCardsSection;
