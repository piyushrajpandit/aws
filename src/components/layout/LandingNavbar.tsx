import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const LandingNavbar: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '/about') {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-xl border-b border-slate-900/8 shadow-[0_1px_0_0_rgba(15,23,42,0.06)]'
          : 'bg-white border-b border-slate-900/6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2 group select-none"
        >
          {/* Eye-of-truth mark: sharp square with inner dot */}
          <div className="w-7 h-7 bg-slate-950 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-amber-400" />
          </div>
          <span className="text-[15px] font-black tracking-[-0.02em] text-slate-950 uppercase font-mono">
            SatyaDrishti
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.06em] font-mono">
          <Link to="/directory" className="hover:text-slate-950 transition-colors">
            Directory
          </Link>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-slate-950 transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="hover:text-slate-950 transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            FAQ
          </button>
          <Link to="/technical-blog" className="hover:text-slate-950 transition-colors">
            Tech Story
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            to="/dashboard/scanner"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.06em] font-mono text-slate-600 hover:text-slate-950 transition-colors"
          >
            <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
            Free Scanner
          </Link>

          {isAuthenticated && user ? (
            <Link
              to={user.role === 'consumer' ? '/dashboard/complaints' : '/dashboard'}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.06em] font-mono transition-colors"
            >
              Dashboard
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.06em] font-mono transition-colors"
            >
              Portal Login
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-950 transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-900/8 bg-white px-5 pt-4 pb-6 space-y-1">
          {[
            { label: 'Product Directory', to: '/directory' },
            { label: 'Free Scanner', to: '/dashboard/scanner' },
            { label: 'Technical Story', to: '/technical-blog' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-0 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-950 border-b border-slate-100 last:border-0 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-3 bg-slate-950 text-white text-xs font-bold uppercase tracking-wider font-mono"
            >
              Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
