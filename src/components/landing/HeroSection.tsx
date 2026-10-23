import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  TrendingDown,
  AlertTriangle,
  Scale,
  Flame,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-800/80"
    >
      {/* Dynamic Ambient Background Glows with Saffron & Cyan Accents */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-amber-600/15 to-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-blue-600/20 via-indigo-600/15 to-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ====== LEFT COLUMN: Hero Copy & Actions ====== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Government & Sovereign Alignment Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-black/40 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5 font-mono">
                🇮🇳 SATYADRISHTI (सत्यदृष्टि)
                <span className="text-slate-500">•</span>
                <span className="text-amber-400 font-sans">Consumer Protection & Packaging Truth</span>
              </span>
            </div>

            {/* Main Punchy Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-black tracking-tight leading-[1.08] text-white">
                Truth in Every Label.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 drop-shadow-sm">
                  Protection for Every Citizen.
                </span>
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Autonomous AI intelligence decoding <strong>marketing deceptions</strong>, exposing{' '}
              <strong>hidden health traps</strong> (Gym, Diabetes, Allergens), and catching{' '}
              <strong>quick-commerce shrinkflation</strong> across India under the Legal Metrology Act & CCPA 2022.
            </p>

            {/* Value Pillars Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-2.5 shadow-sm">
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Front vs Back</div>
                  <div className="text-[11px] text-slate-400">Claims Discrepancy</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-2.5 shadow-sm">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Personal Health</div>
                  <div className="text-[11px] text-slate-400">Gym • Diabetic • Allergy</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-2.5 shadow-sm">
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Shrinkflation</div>
                  <div className="text-[11px] text-slate-400">Stealth Price Hike Radar</div>
                </div>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link to="/dashboard/scanner">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:via-indigo-500 hover:to-emerald-500 text-white shadow-lg shadow-indigo-950/60 ring-1 ring-white/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Launch AI Truth Scanner</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link to="/directory">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-5 rounded-xl font-semibold text-sm border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Explore Verified Directory</span>
                </Button>
              </Link>
            </div>

            {/* Trust Footer Bar */}
            <div className="pt-3 flex items-center gap-3 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Statutory Evidence Grade</span>
              </div>
              <span className="text-slate-600">•</span>
              <span>Cited under Legal Metrology Act 2009 & CCPA Guidelines 2022</span>
            </div>
          </motion.div>

          {/* ====== RIGHT COLUMN: Majestic Hero Officer & Floating Intelligence Badges ====== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            {/* Ambient Multi-Hue Halo Behind Portrait */}
            <div className="absolute -inset-4 bg-gradient-to-b from-amber-500/20 via-blue-600/25 to-emerald-500/20 rounded-[2.5rem] blur-2xl pointer-events-none" />

            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none">
              {/* Main Portrait Frame with Glassmorphism */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/80 aspect-square group">
                <img
                  src="/hero-officer.jpg"
                  alt="SatyaDrishti Commissioner - Legal Metrology & Consumer Protection"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Officer Banner Overlay at bottom of portrait */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-white tracking-wide">
                        DIRECTORATE OF CONSUMER PROTECTION
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono font-medium">
                        Autonomous Statutory Enforcement Grid
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 1: Diabetic Health Trap Alert (Top Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -right-4 sm:-right-6 p-3 rounded-xl bg-slate-900/95 border border-rose-500/50 shadow-xl shadow-rose-950/40 backdrop-blur-md max-w-[210px] hidden sm:block text-left"
              >
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold mb-1">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>Diabetic Alert</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-100">
                  Maltodextrin Detected
                </div>
                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                  Glycemic Index 110: Spikes blood sugar worse than table sugar!
                </div>
              </motion.div>

              {/* FLOATING CARD 2: Shrinkflation Radar (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 p-3 rounded-xl bg-slate-900/95 border border-purple-500/50 shadow-xl shadow-purple-950/40 backdrop-blur-md max-w-[220px] hidden sm:block text-left"
              >
                <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold mb-1">
                  <TrendingDown className="w-3.5 h-3.5 text-purple-400" />
                  <span>Shrinkflation Caught</span>
                </div>
                <div className="text-[11px] font-bold text-slate-100 font-mono">
                  125g ➔ 100g (-20%)
                </div>
                <div className="text-[10px] text-amber-300 font-medium">
                  +25% stealth price hike detected
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
