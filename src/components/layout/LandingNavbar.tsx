import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, ShieldCheck, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const LandingNavbar: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '/about') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo (Matching Together circular mark + bold lowercase name) */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2.5 group select-none"
        >
          <div className="w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-900" />
          </div>
          <span className="text-2xl font-black font-display tracking-tight text-slate-900 lowercase">
            satyadrishti
          </span>
        </Link>

        {/* Center Nav Links - Clean & Minimal */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 font-sans">
          <Link
            to="/directory"
            className="hover:text-slate-950 transition-colors"
          >
            Directory
          </Link>

          <Link
            to="/#workflow"
            onClick={() => handleNavClick('workflow')}
            className="hover:text-slate-950 transition-colors"
          >
            How it Works
          </Link>

          <Link
            to="/#faq"
            onClick={() => handleNavClick('faq')}
            className="hover:text-slate-950 transition-colors"
          >
            FAQ
          </Link>

          <Link
            to="/technical-blog"
            className="hover:text-slate-950 transition-colors"
          >
            Technical Story
          </Link>
        </nav>

        {/* Right CTA Button (Pill shaped, clean border) */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/dashboard/scanner"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs shadow-xs transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Launch Scanner</span>
          </Link>

          {isAuthenticated && user ? (
            <Link
              to={user.role === 'consumer' ? '/dashboard/complaints' : '/dashboard'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs"
            >
              <span>Portal Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/directory"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Product Directory
          </Link>
          <Link
            to="/dashboard/scanner"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Launch Scanner
          </Link>
          <Link
            to="/technical-blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Technical Blog
          </Link>
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-center px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold"
          >
            Portal Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
