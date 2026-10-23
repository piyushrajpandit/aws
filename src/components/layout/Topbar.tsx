import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useComplianceStore } from '../../store/complianceStore';
import { useScanStore } from '../../store/scanStore';
import { Button } from '../ui/Button';
import { AnimatedThemeToggler } from '../ui/AnimatedThemeToggler';
import { Loader2, Scan, Zap, FileCheck2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BrandLogo } from '../ui/BrandLogo';

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onToggleMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenCommandPalette, onToggleMobileMenu }) => {
  const { user, login, logout } = useAuthStore();
  const { violations } = useComplianceStore();
  const { isProcessing, currentScan, currentProgress } = useScanStore();
  const navigate = useNavigate();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isConsumer = user?.role === 'consumer';

  const officerNotifications = [
    {
      id: 1,
      title: 'Critical Disparity Detected',
      message: 'Cadbury Bournvita 500g: "Health Drink" sugar content advisory disparity. Section 36 SCN proposed.',
      time: '12m ago',
      type: 'critical',
    },
    {
      id: 2,
      title: 'Hearing Scheduled',
      message: 'Case #CCPA/ENF/2025/SZ-0418 hearing listed for 28 Feb 2025.',
      time: '45m ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'New Consumer Grievance',
      message: 'Citizen filed Dual MRP complaint for Flipkart order #771-0029311.',
      time: '2h ago',
      type: 'warning',
    },
  ];

  const consumerNotifications = [
    {
      id: 1,
      title: 'Grievance Under Investigation',
      message: 'Your deceptive packaging complaint #GRV-2025-001 was assigned to Zonal Legal Metrology Inspector.',
      time: '15m ago',
      type: 'info',
    },
    {
      id: 2,
      title: 'Packaging Evidence Verified',
      message: 'AI OCR verified 18% overprinted MRP violation on invoice #INV-9921.',
      time: '1h ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'Statutory Notice Dispatched',
      message: 'CCPA has served statutory inquiry notice to manufacturer with 14-day compliance window.',
      time: '3h ago',
      type: 'warning',
    },
  ];

  const notifications = isConsumer ? consumerNotifications : officerNotifications;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchRole = (targetRole: 'consumer' | 'inspector' | 'admin') => {
    if (user?.role === targetRole) return;
    const emails: Record<string, string> = {
      consumer: 'consumer@demo.gov.in',
      inspector: 'inspector@demo.gov.in',
      admin: 'admin@demo.gov.in',
    };
    login(emails[targetRole], targetRole);
    if (targetRole === 'consumer') {
      navigate('/dashboard/scanner');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-20 bg-white border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Drawer Trigger + Brand Logo */}
      <div className="flex items-center gap-3 sm:gap-6 flex-1 max-w-xl min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand Logo visible on mobile/tablet when sidebar is off-canvas */}
        <div className="flex items-center lg:hidden truncate">
          <BrandLogo to="/dashboard" iconSize="w-6 h-6" textSize="text-base" />
        </div>

        {/* Global Search Bar */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex w-full max-w-md items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 text-slate-500 rounded-full border border-slate-200 text-xs transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600" />
            <span className="text-slate-500 group-hover:text-slate-800 truncate font-medium">
              Quick search commodities, violations, barcode...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white border border-slate-200 rounded-md">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Role Badge, Notifications, User Menu */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Role pill badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{user?.role === 'inspector' ? 'Zonal Inspector' : user?.role === 'admin' ? 'Enforcement Admin' : 'Consumer Portal'}</span>
        </div>

        {/* Background Scan Active Indicator */}
        {isProcessing && (
          <button
            onClick={() => navigate('/dashboard/scanner')}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-100 transition-all shadow-xs animate-pulse"
            title="Product scanning active in background • Click to open Scanner"
          >
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600 dark:text-blue-400" />
            <span className="hidden md:inline">
              {(currentScan?.angles?.length || 0) > 1 || currentScan?.isMultiAngle
                ? 'Multi-Angle Scan'
                : 'Scanning Product'}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] bg-blue-600 text-white px-1.5 py-0.2 rounded-full">
              {currentProgress}%
            </span>
          </button>
        )}

        {/* 1-Click Fast Role Switcher Bar */}
        <div className="hidden sm:flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs gap-1">
          <button
            type="button"
            onClick={() => handleSwitchRole('consumer')}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              user?.role === 'consumer'
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50"
            )}
            title="Switch to Consumer Persona (Ananya Verma)"
          >
            <span>🧑 Consumer</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchRole('inspector')}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              user?.role === 'inspector'
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50"
            )}
            title="Switch to Inspector Persona (Arjun Nair)"
          >
            <span>🛡️ Inspector</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchRole('admin')}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
              user?.role === 'admin'
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50"
            )}
            title="Switch to Supervisor Persona (Dr. Sharma, IAS)"
          >
            <span>👑 Supervisor</span>
          </button>
        </div>

        {/* Animated Theme Toggler */}
        <AnimatedThemeToggler />

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer border border-slate-200/60"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Live Telemetry Notifications
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {notifications.length} Unread
                </span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="font-bold text-slate-900 mb-0.5">{n.title}</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/80"
          >
            <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <span className="hidden md:inline text-xs font-bold text-slate-900">
              {user?.name || 'Officer'}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-xs sm:w-64 bg-white dark:bg-slate-900 rounded-xl shadow-modal border border-slate-200 dark:border-slate-800 py-2 z-30 animate-in fade-in slide-in-from-top-2 duration-150 text-xs">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">{user?.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">{user?.email}</div>
                <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase tracking-wider font-mono">
                  {user?.role === 'admin' ? 'Supervisor' : user?.role === 'inspector' ? 'Inspector' : 'Consumer'}
                </div>
              </div>

              {/* Fast 1-Click Role Switch in Dropdown */}
              <div className="py-2 px-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-1.5">
                  1-Click Switch Persona
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleSwitchRole('consumer');
                    }}
                    className={cn(
                      "py-1.5 px-1 rounded-lg text-[10px] font-bold text-center border transition-all",
                      user?.role === 'consumer'
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    )}
                  >
                    Consumer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleSwitchRole('inspector');
                    }}
                    className={cn(
                      "py-1.5 px-1 rounded-lg text-[10px] font-bold text-center border transition-all",
                      user?.role === 'inspector'
                        ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    )}
                  >
                    Inspector
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleSwitchRole('admin');
                    }}
                    className={cn(
                      "py-1.5 px-1 rounded-lg text-[10px] font-bold text-center border transition-all",
                      user?.role === 'admin'
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    )}
                  >
                    Supervisor
                  </button>
                </div>
              </div>

              {isConsumer && (
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/dashboard/complaints');
                    }}
                    className="w-full px-4 py-2 text-left text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 font-medium min-h-[40px]"
                  >
                    <FileCheck2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>My Lodged Complaints</span>
                  </button>
                </div>
              )}

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 font-medium min-h-[40px]"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout from Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
