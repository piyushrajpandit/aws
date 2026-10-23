import React from 'react';
import { motion } from 'framer-motion';

export const TiltedPastelStatsSection: React.FC = () => {
  const cards = [
    {
      stat: '250k+',
      label: 'Packaged commodities verified across Blinkit, Zepto, Instamart & retail shelves.',
      bgLight: 'bg-[#EEF2FF]',
      textLight: 'text-indigo-900',
      labelLight: 'text-indigo-900/70',
      bgDark: 'dark:bg-indigo-950/40',
      borderDark: 'dark:border-indigo-800/40',
      tilt: '-rotate-2',
    },
    {
      stat: '98.4%',
      label: 'Accuracy detecting misleading marketing claims, asterisks, and font size violations.',
      bgLight: 'bg-[#FFF1F2]',
      textLight: 'text-rose-900',
      labelLight: 'text-rose-900/70',
      bgDark: 'dark:bg-rose-950/40',
      borderDark: 'dark:border-rose-800/40',
      tilt: 'rotate-1',
    },
    {
      stat: '2 sec',
      label: 'Average AI inference time to analyze nutrition tables and quantitative ingredients.',
      bgLight: 'bg-[#ECFDF5]',
      textLight: 'text-emerald-900',
      labelLight: 'text-emerald-900/70',
      bgDark: 'dark:bg-emerald-950/40',
      borderDark: 'dark:border-emerald-800/40',
      tilt: '-rotate-1',
    },
    {
      stat: '100%',
      label: 'Deterministic legal grounding in Legal Metrology Act 2009 & CCPA Guidelines 2022.',
      bgLight: 'bg-[#FFFBEB]',
      textLight: 'text-amber-900',
      labelLight: 'text-amber-900/70',
      bgDark: 'dark:bg-amber-950/40',
      borderDark: 'dark:border-amber-800/40',
      tilt: 'rotate-2',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF9] dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 items-stretch">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, rotate: 0, transition: { duration: 0.2 } }}
              className={`p-6 sm:p-7 rounded-[2rem] border border-slate-200/40 ${card.bgLight} ${card.bgDark} ${card.borderDark} shadow-sm transition-all duration-300 flex flex-col justify-between ${card.tilt}`}
            >
              <div>
                <div
                  className={`text-4xl sm:text-5xl font-black font-display tracking-tight mb-3 ${card.textLight} dark:text-white`}
                >
                  {card.stat}
                </div>
                <p
                  className={`text-xs sm:text-sm font-medium leading-relaxed ${card.labelLight} dark:text-slate-300`}
                >
                  {card.label}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider opacity-60 dark:opacity-40">
                <span>Verified Metric</span>
                <span>0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
