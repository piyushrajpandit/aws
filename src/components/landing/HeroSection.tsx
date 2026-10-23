import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#FAFAF9] pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Micro-Overline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-3"
        >
          <span className="text-sm sm:text-base font-semibold text-slate-800 font-sans tracking-tight">
            Find truth in packaging
          </span>
        </motion.div>

        {/* Giant Bold Lowercase Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl sm:text-8xl md:text-9xl font-black font-display text-slate-950 tracking-tight leading-none mb-10 sm:mb-14 lowercase select-none"
        >
          satyadrishti
        </motion.h1>

        {/* First Image - Full Size Hero Centerpiece (Unobstructed & Majestic) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-2xl sm:max-w-3xl mx-auto mb-12"
        >
          <div className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-200/80 bg-white">
            <img
              src="/hero-officer.jpg"
              alt="SatyaDrishti Packaging Truth & Consumer Protection"
              className="w-full h-auto object-cover object-center block"
            />
          </div>
        </motion.div>

        {/* Warm & Honest Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed mb-8 font-sans font-normal"
        >
          Find solutions and support in difficult packaging claims with India's independent consumer verification platform.
        </motion.p>

        {/* Clean Pill Buttons (Matching Together Mockup) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {/* Solid Dark Charcoal Pill */}
          <Link
            to="/dashboard/scanner"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm shadow-lg shadow-slate-950/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Launch Free Scanner</span>
          </Link>

          {/* Soft Pastel Gradient Pill */}
          <Link
            to="/directory"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#D7F5F5] to-[#D5EBFB] hover:opacity-90 text-slate-900 font-semibold text-sm border border-teal-200/60 shadow-xs transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Browse Directory</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
