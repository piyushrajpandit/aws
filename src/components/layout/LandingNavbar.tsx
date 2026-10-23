import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { BrandLogo } from '../ui/BrandLogo';

export const LandingNavbar: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-slate-200/80'
          : 'bg-white border-b border-slate-100/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching screenshot: Outline Circle with Inner Dot + satyadrishti */}
        <BrandLogo to="/" onClick={() => setIsMobileMenuOpen(false)} />

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[14px] font-medium text-slate-600">
          <Link
            to="/directory"
            className="hover:text-slate-900 transition-colors"
          >
            Directory
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px] font-medium text-slate-600"
          >
            How it Works
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 p-0 text-[14px] font-medium text-slate-600"
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

        {/* Right Action Buttons matching screenshot */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Launch Scanner Button: White pill with subtle border and amber bolt */}
          <Link
            to="/dashboard/scanner"
            id="nav-launch-scanner-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-50/80 text-slate-800 text-[13px] font-semibold transition-all border border-slate-200 shadow-xs hover:border-slate-300"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Launch Scanner
          </Link>

          {/* Portal Login Button: Dark navy/black pill */}
          {isAuthenticated && user ? (
            <Link
              to={user.role === 'consumer' ? '/dashboard/complaints' : '/dashboard'}
              id="nav-dashboard-btn"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white text-[13px] font-semibold transition-all shadow-xs"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              id="nav-portal-login-btn"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white text-[13px] font-semibold transition-all shadow-xs"
            >
              Portal Login
            </Link>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 pt-4 pb-6 space-y-3 shadow-lg">
          <Link
            to="/directory"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Directory
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            How it Works
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            FAQ
          </button>
          <Link
            to="/technical-blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Technical Story
          </Link>
          <div className="pt-3 space-y-2">
            <Link
              to="/dashboard/scanner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs"
            >
              ⚡ Launch Scanner
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-full bg-[#0F172A] text-white text-xs font-semibold shadow-xs"
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
