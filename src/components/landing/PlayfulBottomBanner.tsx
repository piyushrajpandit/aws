import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Sparkles } from 'lucide-react';

export const PlayfulBottomBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAFAF9] dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-slate-950 text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          {/* Background Decorative Glowing Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-teal-500/20 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Doodles in background */}
          <div className="absolute top-6 left-10 text-amber-400 opacity-70 pointer-events-none">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <div className="absolute bottom-6 right-1/3 text-rose-400 opacity-60 pointer-events-none">
            <svg width="30" height="18" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M2 10 Q 10 2, 20 10 T 38 10" />
            </svg>
          </div>

          {/* Left Text */}
          <div className="relative z-10 max-w-lg text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant AI Verification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Scan your first product for free in 2 seconds!
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              No credit card required. Point your camera at any packaged item or paste an e-commerce link.
            </p>
          </div>

          {/* Right Button */}
          <div className="relative z-10 shrink-0">
            <Link
              to="/dashboard/scanner"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#A7F3D0] hover:bg-[#6EE7B7] text-slate-950 font-bold text-sm shadow-xl shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Try Scanner Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
