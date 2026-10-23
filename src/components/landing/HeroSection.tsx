import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowUpRight, Search } from 'lucide-react';
import {
  HeroDoodleIllustration,
  DoodleSquiggle,
  DoodleSparkle,
  DoodleCurlyLoop,
  DoodleArrow,
  DoodleStar,
} from '../doodles/DoodleIcons';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#FDFCF9] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative floating doodles in background */}
      <div className="absolute top-10 left-6 sm:left-16 pointer-events-none opacity-80">
        <DoodleSquiggle className="w-20 h-5" color="#F97316" />
      </div>
      <div className="absolute top-24 right-10 sm:right-28 pointer-events-none opacity-80">
        <DoodleSparkle className="w-8 h-8" color="#EC4899" />
      </div>
      <div className="absolute bottom-16 left-12 pointer-events-none opacity-70 hidden sm:block">
        <DoodleCurlyLoop className="w-10 h-10" color="#8B5CF6" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Friendly, High-Impact Typography & CTAs */}
          <div className="lg:col-span-6 text-left">
            {/* Playful pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              India's Packaging Truth Copilot
            </div>

            {/* Main Headline with doodle underline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6">
              Every package{' '}
              <span className="block text-slate-500 font-semibold">
                hides a secret.
              </span>
              <span>We help you </span>
              <span className="relative inline-block text-amber-600">
                find the truth.
                {/* Hand-drawn wavy underline */}
                <svg
                  viewBox="0 0 240 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-2 left-0 w-full h-3.5 text-amber-500"
                >
                  <path
                    d="M3 13C45 3 110 16 160 5C190 -1 225 11 237 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              SatyaDrishti bridges the gap between front-panel marketing slogans and back-panel ingredient reality. Expose shrinkflation, hidden sugar spikes, and asterisk loopholes in 2 seconds.
            </p>

            {/* Action buttons (rounded pill style matching reference) */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/dashboard/scanner"
                id="hero-launch-scanner-btn"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-xl transition-all duration-200 group"
              >
                <Zap className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                Launch Free Scanner
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                to="/directory"
                id="hero-browse-directory-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sky-100 hover:bg-sky-200/90 text-sky-900 text-sm font-bold transition-all duration-200"
              >
                <Search className="w-4 h-4 text-sky-700" />
                Browse Directory
              </Link>
            </div>

            {/* Hand-drawn arrow pointing to scanner button */}
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
              <DoodleArrow className="w-10 h-7" color="#10B981" />
              <span>No app install needed • Upload or snap a packaging photo</span>
            </div>
          </div>

          {/* Right Column: Hand-Drawn Doodle Illustration */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* The Bespoke Hero Doodle Illustration */}
              <HeroDoodleIllustration className="w-full h-auto drop-shadow-sm" />

              {/* Little Floating Doodle Badge */}
              <div className="absolute -bottom-4 right-6 sm:right-12 bg-white rounded-2xl p-3.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-sm">
                  100%
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Legal Metrology</div>
                  <div className="text-[10px] text-slate-500">PCR 2011 & CCPA Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
