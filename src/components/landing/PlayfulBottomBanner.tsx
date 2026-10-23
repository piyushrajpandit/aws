import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap } from 'lucide-react';
import {
  BannerDoodleIllustration,
  DoodleSparkle,
  DoodleStar,
} from '../doodles/DoodleIcons';

export const PlayfulBottomBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="bg-[#18181B] rounded-[36px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle warm glow background */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Floating doodle accents */}
          <div className="absolute top-8 left-12 hidden sm:block pointer-events-none">
            <DoodleSparkle className="w-6 h-6" color="#FBBF24" />
          </div>
          <div className="absolute bottom-10 left-1/3 hidden sm:block pointer-events-none">
            <DoodleStar className="w-7 h-7" color="#34D399" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm border border-white/10">
                <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                100% Free Public Consumer Tool
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Your first packaging truth scan is completely free!
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                Snap any food, cosmetic, or grocery packaging label right now. Expose hidden sugar spikes, deceptive protein math, and shrinkflation in 2 seconds.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/dashboard/scanner"
                  id="cta-launch-scanner-btn"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-black shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 group"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  Launch Scanner Now
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/directory"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-bold transition-colors border border-white/10"
                >
                  Explore Verified Directory
                </Link>
              </div>
            </div>

            {/* Right Doodle Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <BannerDoodleIllustration className="w-full max-w-xs sm:max-w-sm h-auto drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayfulBottomBanner;
