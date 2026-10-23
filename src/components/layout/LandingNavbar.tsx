import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const LandingNavbar: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '/about') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
          : 'bg-[#FDFCF9] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
        {/* Wordmark inspired by Image 2's clean logo */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2.5 group select-none"
        >
          {/* Friendly circular truth eye mark */}
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shadow-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            satyadrishti
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link
            to="/directory"
            className="hover:text-slate-900 transition-colors"
          >
            Directory
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 p-0 text-sm font-semibold text-slate-600"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 p-0 text-sm font-semibold text-slate-600"
          >
            FAQ
          </button>
          <Link
            to="/technical-blog"
            className="hover:text-slate-900 transition-colors"
          >
            Technical Story
          </Link>
        </nav>

        {/* Right CTAs (pill buttons matching screenshot) */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/dashboard/scanner"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all border border-slate-200/90 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Launch Scanner
          </Link>

          {isAuthenticated && user ? (
            <Link
              to={user.role === 'consumer' ? '/dashboard/complaints' : '/dashboard'}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#0D1117] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#0D1117] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              Portal Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-5 pt-4 pb-6 space-y-2 shadow-lg">
          <Link
            to="/directory"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Product Directory
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            FAQ
          </button>
          <Link
            to="/technical-blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Technical Story
          </Link>
          <div className="pt-3 space-y-2">
            <Link
              to="/dashboard/scanner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider"
            >
              Launch Free Scanner
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-full bg-slate-900 text-white text-xs font-bold"
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
