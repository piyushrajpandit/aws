import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, TrendingDown, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ArchedPillCardsSection: React.FC = () => {
  const cards = [
    {
      title: 'Honey & Invert Sugar Dilution',
      category: 'Ingredient Substitution',
      description:
        'Brands claim "100% Pure Natural Honey" on the front, while the back ingredient panel lists Invert Sugar Syrup and Liquid Glucose as the top sweeteners.',
      icon: Sparkles,
      iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
      archColor: 'from-amber-100 to-orange-100 dark:from-amber-950/60 dark:to-orange-950/40',
      statutoryTag: 'CCPA 2022 Misleading Ad',
    },
    {
      title: 'The Gym "Protein Washing" Scam',
      category: 'Fitness Nutrition Trap',
      description:
        'Snack bars display bold "15g Protein*" claims, referencing the entire 3-bar multi-pack rather than a single serving, with 70% calories coming from palm oil.',
      icon: Flame,
      iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
      archColor: 'from-rose-100 to-pink-100 dark:from-rose-950/60 dark:to-pink-950/40',
      statutoryTag: 'Asterisk Loophole Flagged',
    },
    {
      title: 'The Diabetic Maltodextrin Danger',
      category: 'Metabolic Health Risk',
      description:
        '"Zero Added Cane Sugar" digestive biscuits replace sugar with Maltodextrin (Glycemic Index 110), spiking insulin faster than pure table glucose.',
      icon: ShieldAlert,
      iconBg: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400',
      archColor: 'from-teal-100 to-emerald-100 dark:from-teal-950/60 dark:to-emerald-950/40',
      statutoryTag: 'High Glycemic Trigger',
    },
    {
      title: 'Shrinkflation & Stealth Hikes',
      category: 'Quick-Commerce Price Abuse',
      description:
        'Popular dry fruit and chip packages quietly downsize from 250g to 180g on quick-commerce apps while retaining identical prices and missing unit sale prices.',
      icon: TrendingDown,
      iconBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
      archColor: 'from-purple-100 to-indigo-100 dark:from-purple-950/60 dark:to-indigo-950/40',
      statutoryTag: 'PCR Rule 6 Violation',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAF9] dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase font-bold px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-3 inline-block">
            Truth In Action
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight">
            Common Traps We Expose Every Day
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            From misleading health promises to silent quantity shrinkages, SatyaDrishti reads between the lines.
          </p>
        </div>

        {/* 4 Tall Cards with Arched Graphic Windows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-900 rounded-[2.25rem] p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Arched Illustration Window */}
                  <div
                    className={`relative w-full aspect-[4/5] rounded-[1.75rem] rounded-t-[3.5rem] bg-gradient-to-b ${card.archColor} flex flex-col items-center justify-center p-6 overflow-hidden mb-5`}
                  >
                    {/* Top Right Dark Badge */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div
                      className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm mb-3`}
                    >
                      <Icon className="w-7 h-7 stroke-[2]" />
                    </div>

                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 shadow-2xs">
                      {card.statutoryTag}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    {card.category}
                  </span>

                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Link
                    to="/dashboard/scanner"
                    className="inline-flex items-center gap-1 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>Test on Scanner</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
