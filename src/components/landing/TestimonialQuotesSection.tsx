import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const TestimonialQuotesSection: React.FC = () => {
  const reviews = [
    {
      quote:
        'Thanks to SatyaDrishti, I discovered that the "Zero Sugar" digestive biscuits I gave my diabetic mother were loaded with Maltodextrin (GI 110). It genuinely prevented severe glucose spikes.',
      author: 'Dr. Meera N.',
      role: 'Endocrinologist & Caregiver',
      location: 'New Delhi',
      bgLight: 'bg-[#EEF2FF]',
      borderLight: 'border-indigo-100',
      bgDark: 'dark:bg-indigo-950/30',
      borderDark: 'dark:border-indigo-800/40',
      tag: 'Diabetic Safety',
    },
    {
      quote:
        'As an athlete, finding out that a "15g Protein" cookie bar had an asterisk referencing the entire multi-pack rather than a single bar was eye-opening. SatyaDrishti keeps brands honest.',
      author: 'Rohan Mehta',
      role: 'Marathon Runner & Fitness Coach',
      location: 'Bengaluru',
      bgLight: 'bg-[#FFF1F2]',
      borderLight: 'border-rose-100',
      bgDark: 'dark:bg-rose-950/30',
      borderDark: 'dark:border-rose-800/40',
      tag: 'Gym & Protein',
    },
    {
      quote:
        'In field inspections, generating a tamper-evident evidence dossier with Section 36(1) gazette citations in 30 seconds has completely transformed our regulatory audit workflow.',
      author: 'K. Suresh Kumar',
      role: 'Senior Enforcement Officer',
      location: 'Legal Metrology Department',
      bgLight: 'bg-[#ECFDF5]',
      borderLight: 'border-emerald-100',
      bgDark: 'dark:bg-emerald-950/30',
      borderDark: 'dark:border-emerald-800/40',
      tag: 'Statutory Grade',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#070B13] border-b border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-3 inline-block">
            Verified Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight">
            Loved by More Than 50,000 Citizens & Regulators
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Real stories of people protecting their health, families, and regulatory standards with SatyaDrishti.
          </p>
        </div>

        {/* 3 Pastel Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-7 rounded-[2.25rem] border ${rev.bgLight} ${rev.borderLight} ${rev.bgDark} ${rev.borderDark} flex flex-col justify-between shadow-xs transition-all hover:shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-900 dark:text-white shadow-xs">
                    <Quote className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-black/5 dark:border-white/10">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans mb-6">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white">
                    {rev.author}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {rev.role} • {rev.location}
                  </div>
                </div>

                <div className="flex text-amber-400 text-xs gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
