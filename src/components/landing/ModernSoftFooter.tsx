import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, Heart } from 'lucide-react';

export const ModernSoftFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-850">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold font-mono text-sm">
                SD
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-white">
                satyadrishti
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-sans">
              India's first AI-powered statutory packaging intelligence and consumer protection copilot, grounded in the Legal Metrology Act, 2009 & CCPA Guidelines 2022.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>National Consumer Protection Intelligence</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/scanner" className="hover:text-white transition-colors">
                  AI Truth Scanner
                </Link>
              </li>
              <li>
                <Link to="/directory" className="hover:text-white transition-colors">
                  Product Directory
                </Link>
              </li>
              <li>
                <Link to="/technical-blog" className="hover:text-white transition-colors">
                  Technical Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
              Legal Frameworks
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Legal Metrology Act, 2009 (Sec 36)</li>
              <li>Packaged Commodities Rules, 2011/2022</li>
              <li>Consumer Protection Act, 2019</li>
              <li>CCPA Misleading Ads Guidelines, 2022</li>
              <li>FSSAI Packaging Regulations, 2018</li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
              Portals
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Officer Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard/complaints" className="hover:text-white transition-colors">
                  Complaints Ledger
                </Link>
              </li>
              <li>
                <Link to="/dashboard/crawler" className="hover:text-white transition-colors">
                  E-Comm Crawler
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} SatyaDrishti. Dedicated to the protection of 1.4B Indian consumers.</span>
          </div>

          {/* Circular Scroll-to-Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            title="Scroll to top"
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-800 shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
