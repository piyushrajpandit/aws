import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingDown,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF9] dark:bg-[#0B0F19] pt-12 pb-20 sm:pt-16 sm:pb-28 transition-colors duration-300">
      {/* Playful Floating Doodles in Background (Confetti & Squiggles) */}
      <div className="absolute top-16 left-8 sm:left-24 text-amber-400 opacity-60 pointer-events-none select-none">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </div>
      <div className="absolute top-28 right-12 sm:right-32 text-teal-400 opacity-70 pointer-events-none select-none animate-bounce duration-1000">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor">
          <circle cx="16" cy="16" r="10" />
        </svg>
      </div>
      <div className="absolute bottom-16 left-12 text-rose-400 opacity-50 pointer-events-none select-none">
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M5 20 Q 12 5, 20 20 T 35 20" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-16 text-indigo-400 opacity-60 pointer-events-none select-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <rect width="18" height="18" rx="4" transform="rotate(45 12 12)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Micro-Overline (e.g. "Find inner harmony") */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-2"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300 font-sans">
            Find truth in everyday packaging
          </span>
        </motion.div>

        {/* Massive Bold Rounded Brand Title (e.g. "together") */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-none mb-8 sm:mb-12 lowercase"
        >
          satyadrishti
        </motion.h1>

        {/* Central Organic Artwork Container with Circular Frame & Floating Tags */}
        <div className="relative max-w-xl mx-auto mb-10">
          {/* Ambient soft glow behind artwork */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-amber-200/40 via-teal-200/30 to-indigo-200/40 dark:from-indigo-950/40 dark:via-blue-950/30 dark:to-teal-950/20 rounded-full blur-3xl pointer-events-none" />

          {/* Officer Hero Portrait in Soft Friendly Rounded Frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl shadow-slate-300/60 dark:shadow-black/70 aspect-[4/3] bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-950 mx-auto"
          >
            <img
              src="/hero-officer.jpg"
              alt="SatyaDrishti Consumer Protection & Truth Guardian"
              className="w-full h-full object-cover object-center"
            />

            {/* Subtle bottom gradient for readability */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />

            {/* Bottom Inner Badge */}
            <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 px-4 py-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/60 dark:border-slate-700/60 flex items-center justify-between shadow-lg text-left">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold font-sans text-slate-900 dark:text-white">
                  Directorate of Consumer Protection
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                Active AI Guard
              </span>
            </div>
          </motion.div>

          {/* Floating Pill Tag 1 (Top Left): Diabetic Alert */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -top-3 -left-3 sm:-left-8 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center gap-2 text-left z-20"
          >
            <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-500">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                Diabetic Guard
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Catches Maltodextrin (GI 110)
              </div>
            </div>
          </motion.div>

          {/* Floating Pill Tag 2 (Bottom Right): Shrinkflation Caught */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-3 -right-3 sm:-right-8 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center gap-2 text-left z-20"
          >
            <div className="w-7 h-7 rounded-full bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                Shrinkflation Radar
              </div>
              <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                +25% stealth hike flagged
              </div>
            </div>
          </motion.div>
        </div>

        {/* Accompanying Warm Copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 font-sans font-normal"
        >
          Find statutory truth and protection in everyday packaging claims together with India's first AI consumer intelligence copilot.
        </motion.p>

        {/* Dual Soft Pill Buttons (Matching the Inspiration) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {/* Dark Solid Pill Button */}
          <Link
            to="/dashboard/scanner"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-sm shadow-xl shadow-slate-900/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap className="w-4 h-4 fill-amber-300 text-amber-300 dark:fill-amber-500 dark:text-amber-500" />
            <span>Launch Free Scanner</span>
          </Link>

          {/* Soft Pastel Gradient Pill Button */}
          <Link
            to="/directory"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-teal-100 via-sky-100 to-indigo-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 text-slate-800 dark:text-slate-100 hover:opacity-90 font-semibold text-sm border border-teal-200/60 dark:border-slate-700 shadow-sm transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Explore Verified SKUs</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
