import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, Heart } from 'lucide-react';

const NAV_COLS = [
  {
    label: 'Platform',
    links: [
      { text: 'Home', to: '/' },
      { text: 'AI Truth Scanner', to: '/dashboard/scanner' },
      { text: 'Product Directory', to: '/directory' },
      { text: 'Technical Story', to: '/technical-blog' },
    ],
  },
  {
    label: 'Legal Frameworks',
    links: [
      { text: 'Legal Metrology Act, 2009', to: '#' },
      { text: 'Packaged Commodities Rules, 2011', to: '#' },
      { text: 'Consumer Protection Act, 2019', to: '#' },
      { text: 'CCPA Guidelines, 2022', to: '#' },
      { text: 'FSSAI Packaging Regs, 2018', to: '#' },
    ],
  },
  {
    label: 'Portals',
    links: [
      { text: 'Officer Login', to: '/login' },
      { text: 'Complaints Ledger', to: '/dashboard/complaints' },
      { text: 'E-Commerce Crawler', to: '/dashboard/crawler' },
    ],
  },
];

export const ModernSoftFooter: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#FAF9F5] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shadow-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                satyadrishti
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              India's premier AI packaging truth copilot and consumer protection intelligence platform, empowering citizens to hold brands accountable to statutory reality.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>National Consumer Protection Intelligence</span>
            </div>
          </div>

          {/* Nav links columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {NAV_COLS.map((col, i) => (
              <div key={i} className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {col.label}
                </div>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.text}>
                      <Link
                        to={link.to}
                        className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom copyright & scroll-to-top */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} SatyaDrishti. Built with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>for 1.4 billion Indian consumers.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            title="Scroll to top"
            className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ModernSoftFooter;
