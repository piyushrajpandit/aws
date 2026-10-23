import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 text-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10 flex flex-col items-center">
        {/* Top small category label */}
        <div className="text-xs sm:text-sm font-semibold text-slate-800 tracking-normal mb-3">
          Find truth in packaging
        </div>

        {/* Massive brand title */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black text-[#0A0D14] tracking-[-0.04em] leading-none mb-10 select-none"
          style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          satyadrishti
        </h1>

        {/* Central Hero Officer Card with Soft Rounded Corners */}
        <div className="w-full max-w-xl sm:max-w-2xl rounded-[36px] sm:rounded-[44px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.09)] border border-slate-100/80 bg-white p-0 relative transition-transform duration-300 hover:scale-[1.005]">
          <img
            src="/hero-officer.jpg"
            alt="SatyaDrishti National Packaging Consumer Protection Officer"
            className="w-full h-auto object-cover block"
            loading="eager"
          />
        </div>

        {/* Subtitle description below image */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mt-8 sm:mt-10 mb-8 font-normal">
          Find solutions and support in difficult packaging claims with India's independent consumer verification platform.
        </p>

        {/* Two Rounded Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard/scanner"
            id="hero-launch-scanner-btn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0D1117] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Launch Free Scanner
          </Link>

          <Link
            to="/directory"
            id="hero-browse-directory-btn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#CCFBF1] hover:bg-[#99F6E4] text-[#0F766E] text-xs sm:text-sm font-bold transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Search className="w-3.5 h-3.5 text-[#0F766E]" />
            Browse Directory
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
