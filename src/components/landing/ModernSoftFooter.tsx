import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck } from 'lucide-react';

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
    <footer className="bg-white border-t border-slate-900/8">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Brand column */}
          <div className="lg:col-span-5 py-14 lg:pr-16 lg:border-r border-slate-900/8 border-b lg:border-b-0">
            {/* Wordmark */}
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-7 h-7 bg-slate-950 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-amber-400" />
              </div>
              <span className="text-[15px] font-black tracking-[-0.02em] text-slate-950 uppercase font-mono">
                SatyaDrishti
              </span>
            </Link>

            <p className="text-sm text-slate-500 max-w-xs leading-relaxed font-sans mb-6">
              India's first AI-powered statutory packaging intelligence and consumer protection copilot, grounded in Legal Metrology Act, 2009 and CCPA Guidelines, 2022.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-amber-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>National Consumer Protection Intelligence</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 divide-x divide-slate-900/8">
            {NAV_COLS.map((col, i) => (
              <div key={i} className="py-14 px-8 first:pl-0 sm:first:pl-8 lg:first:pl-10">
                <div className="text-[10px] font-black font-mono uppercase tracking-[0.14em] text-slate-950 mb-5">
                  {col.label}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.text}>
                      <Link
                        to={link.to}
                        className="text-[12px] text-slate-500 hover:text-slate-950 transition-colors font-sans"
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

        {/* Bottom bar */}
        <div className="border-t border-slate-900/8 py-6 flex items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-slate-400">
            © {new Date().getFullYear()} SatyaDrishti. Protecting 1.4 billion Indian consumers.
          </span>

          {/* Scroll-to-top — flat square */}
          <button
            type="button"
            onClick={scrollToTop}
            title="Scroll to top"
            className="w-8 h-8 bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ModernSoftFooter;
