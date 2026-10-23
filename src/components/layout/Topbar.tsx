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
import { BrandLogo } from '../ui/BrandLogo';

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onToggleMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenCommandPalette, onToggleMobileMenu }) => {
  const { user, logout } = useAuthStore();
  const { violations } = useComplianceStore();
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
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <div className="text-xs font-bold text-slate-900">{user?.name}</div>
                <div className="text-[11px] text-slate-500">{user?.email}</div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
