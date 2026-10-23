import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap } from 'lucide-react';

export const PlayfulBottomBanner: React.FC = () => {
  return (
    <section className="bg-slate-950 relative overflow-hidden">
      {/* Fine white grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Amber accent bar at top */}
      <div className="w-full h-[3px] bg-amber-400" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Left text block */}
          <div className="lg:col-span-8">
            {/* Label */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1.5 h-1.5 bg-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.16em] font-mono text-slate-500">
                Instant AI Verification — Free
              </span>
            </div>

            <h2
              className="font-black text-white tracking-[-0.025em] leading-[0.94] mb-8"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              <span className="block">Scan your first</span>
              <span className="block text-slate-400">product free</span>
              <span className="block">in 2 seconds.</span>
            </h2>

            <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-lg">
              No credit card. No account required. Point your camera at any packaged item or paste a quick-commerce link.
              Our AI returns a full compliance audit in under 2 seconds.
            </p>
          </div>

          {/* Right CTA */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link
              to="/dashboard/scanner"
              id="cta-scan-btn"
              className="inline-flex items-center justify-between gap-3 px-7 py-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[13px] uppercase tracking-[0.1em] font-mono transition-colors group"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 fill-slate-950" />
                Try Scanner Now
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/directory"
              id="cta-directory-btn"
              className="inline-flex items-center justify-between gap-3 px-7 py-4 border border-white/10 hover:border-white/30 text-white text-[11px] uppercase tracking-[0.1em] font-mono font-bold transition-colors"
            >
              Browse Verified Products
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Trust note */}
            <p className="text-[10px] font-mono text-slate-600 text-center">
              100% Law-Grounded · Legal Metrology Act 2009 · CCPA 2022
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayfulBottomBanner;
