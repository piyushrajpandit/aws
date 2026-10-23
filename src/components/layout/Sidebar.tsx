import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Bot,
  ScanLine,
  ShieldAlert,
  Building2,
  MessageSquareWarning,
  LineChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useComplianceStore } from '../../store/complianceStore';
import { BrandLogo } from '../ui/BrandLogo';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { user, logout } = useAuthStore();
  const { violations, complaints, manufacturers } = useComplianceStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [isHovered, setIsHovered] = React.useState(false);

  // Auto-close mobile drawer when route changes
  useEffect(() => {
    if (isMobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  }, [location.pathname]);

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const openViolationsCount = violations.filter((v) => v.status === 'Open' || v.status === 'Notice Issued').length;
  const newComplaintsCount = complaints.filter((c) => c.status === 'New' || c.status === 'Triaged').length;
  const userRole = user?.role || 'consumer';

  const allNavItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'inspector'],
    },
    {
      to: '/dashboard/products',
      label: 'Products',
      icon: Package,
      roles: ['admin', 'inspector'],
    },
    {
      to: '/dashboard/crawler',
      label: 'E-Commerce Crawler',
      icon: Bot,
      roles: ['admin'],
    },
    {
      to: '/dashboard/scanner',
      label: 'Product Scanner',
      icon: ScanLine,
      roles: ['admin', 'inspector'],
    },
    {
      to: '/dashboard/violations',
      label: 'Violations',
      icon: ShieldAlert,
      badge: openViolationsCount > 0 ? `${openViolationsCount}` : undefined,
      badgeVariant: 'danger' as const,
      roles: ['admin', 'inspector'],
    },
    {
      to: '/dashboard/manufacturers',
      label: 'Manufacturers',
      icon: Building2,
      badge: manufacturers?.length > 0 ? `${manufacturers.length}` : '1.2K',
      roles: ['admin'],
    },
    {
      to: '/dashboard/complaints',
      label:
        userRole === 'consumer'
          ? 'File & Track Complaints'
          : userRole === 'inspector'
          ? 'Assigned Grievances'
          : 'Grievance Adjudication',
      icon: MessageSquareWarning,
      badge: newComplaintsCount > 0 ? `${newComplaintsCount}` : undefined,
      badgeVariant: 'warning' as const,
      roles: ['admin', 'inspector', 'consumer'],
    },
    {
      to: '/dashboard/analytics',
      label: 'Analytics',
      icon: LineChart,
      roles: ['admin'],
    },
    {
      to: '/dashboard/regulatory-rag',
      label: 'Regulatory RAG',
      icon: BookOpen,
      roles: ['admin', 'inspector'],
    },
  ];

  const navItems = allNavItems.filter((item) => item.roles.includes(userRole));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isExpanded = !isCollapsed || (isCollapsed && isHovered) || isMobileOpen;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar / Off-canvas Drawer */}
      <aside
        onMouseEnter={() => {
          if (isCollapsed) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (isCollapsed) setIsHovered(false);
        }}
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white text-slate-700 border-r border-slate-200/90 transition-all duration-300 ease-in-out flex flex-col justify-between ${
          isMobileOpen
            ? 'translate-x-0 shadow-2xl w-72'
            : isCollapsed
            ? isHovered
              ? '-translate-x-full lg:translate-x-0 lg:w-64 shadow-2xl ring-1 ring-black/5'
              : '-translate-x-full lg:translate-x-0 lg:w-20'
            : '-translate-x-full lg:translate-x-0 w-72 lg:w-64'
        }`}
      >
        {/* Top Header with Consistent Official Brand Logo */}
        <div className="overflow-y-auto flex-1 scrollbar-thin">
          <div
            className={`h-20 px-4 flex items-center border-b border-slate-100 ${
              isExpanded ? 'justify-between' : 'justify-center'
            }`}
          >
            {isExpanded ? (
              <div className="flex items-center justify-between w-full">
                <BrandLogo
                  to="/dashboard"
                  iconSize="w-6 h-6"
                  textSize="text-[17px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const nextState = !isCollapsed;
                    setIsCollapsed(nextState);
                    setIsHovered(false);
                  }}
                  className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title={isCollapsed ? 'Pin Sidebar Open' : 'Collapse Sidebar'}
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </button>
              </div>
            ) : (
              <BrandLogo
                to="/dashboard"
                iconSize="w-7 h-7"
                showText={false}
              />
            )}

            {/* Mobile Close Button (<lg) */}
            {isMobileOpen && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Close navigation drawer"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Navigation Items with Authoritative High-Contrast Active State */}
          <nav className={`p-3 space-y-1 text-xs font-medium ${!isExpanded ? 'px-2' : ''}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  onClick={() => {
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl transition-all duration-200 min-h-[44px] ${
                      isExpanded ? 'px-3 py-2.5 gap-3' : 'justify-center p-2.5'
                    } ${
                      isActive
                        ? 'bg-[#0F172A] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                    }`
                  }
                  title={!isExpanded ? item.label : undefined}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  {isExpanded && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0 ml-1.5 ${
                            item.badgeVariant === 'danger'
                              ? 'bg-rose-100 text-rose-800'
                              : item.badgeVariant === 'warning'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Bottom Controls */}
        <div className={`p-3 border-t border-slate-100 space-y-2 shrink-0 ${!isExpanded ? 'px-2' : ''}`}>
          {isExpanded && user && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">
                    {user.designation || user.role}
                  </div>
                </div>
              </div>
            </div>
          )}

          <NavLink
            to="/"
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
            }}
            className={`flex items-center rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 text-xs transition-colors min-h-[40px] ${
              isExpanded ? 'px-3 py-2 gap-3' : 'justify-center p-2'
            }`}
            title={!isExpanded ? 'Public Portal' : undefined}
          >
            <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
            {isExpanded && <span className="truncate font-medium">Public Portal</span>}
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className={`w-full flex items-center rounded-xl text-rose-600 hover:bg-rose-50 text-xs transition-colors min-h-[40px] cursor-pointer ${
              isExpanded ? 'px-3 py-2 gap-3' : 'justify-center p-2'
            }`}
            title={!isExpanded ? 'Sign Out' : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {isExpanded && <span className="truncate font-bold">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
