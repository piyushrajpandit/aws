import React from 'react';
import { motion } from 'framer-motion';

export const ManifestoStatementSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-white border-y border-slate-100 overflow-hidden">
      {/* Scattered Playful Doodles around the statement */}
      <div className="absolute top-12 left-10 text-emerald-400 opacity-60 pointer-events-none">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 2v20M2 12h20" />
        </svg>
      </div>

      <div className="absolute top-16 right-16 text-amber-500 opacity-70 pointer-events-none">
        <svg width="34" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M2 10 Q 10 2, 20 10 T 38 10" />
        </svg>
      </div>

      <div className="absolute bottom-12 left-1/4 text-purple-400 opacity-60 pointer-events-none">
        <div className="w-3.5 h-3.5 rounded-full bg-purple-400/80" />
      </div>

      <div className="absolute bottom-14 right-20 text-rose-400 opacity-70 pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="6" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-display text-slate-900 leading-[1.25] tracking-tight"
        >
          Our{' '}
          <span className="text-orange-500 font-extrabold underline decoration-orange-300/40 decoration-wavy">
            statutory engine
          </span>{' '}
          is ready to inspect, verify and{' '}
          <span className="text-amber-500 font-extrabold">
            help you
          </span>{' '}
          find truth in everyday Indian packaging and supermarket shelves.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-sans leading-relaxed"
        >
          Bridging Legal Metrology gazette law with computer vision so no citizen has to guess what is real and what is disguised marketing.
        </motion.p>
      </div>
    </section>
  );
};

export default ManifestoStatementSection;
