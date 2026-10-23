import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Languages,
  Zap,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore, DEMO_PORTAL_CONFIGS } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { SupportedLanguage } from '../types/compliance';
import { UserRole } from '../types/auth';
import { GridPattern } from '../components/ui/GridPattern';
import { AnimatedThemeToggler } from '../components/ui/AnimatedThemeToggler';
import { cn } from '../lib/utils';

type PortalTab = 'consumer' | 'inspector' | 'admin';

interface FastLaunchRole {
  id: PortalTab;
  role: UserRole;
  title: string;
  badge: string;
  badgeColor: string;
  persona: string;
  subtitle: string;
  description: string;
  features: string[];
  gradient: string;
  btnClass: string;
  demoEmail: string;
}

const FAST_ROLES: FastLaunchRole[] = [
  {
    id: 'consumer',
    role: 'consumer',
    title: 'Consumer & Citizen',
    badge: 'CITIZEN ACCESS',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    persona: 'Ananya Verma (Consumer Advocate)',
    subtitle: 'Scan food labels, detect health risks & lodge micro-fraud reports',
    description: 'Instant access to personal nutrition diagnostics, condition checks (diabetes/BP), and crowd-sourced ₹10 fraud evidence logging.',
    features: ['Diet & Health Scanner', 'Sugar/BP Verdicts', 'Geo-Tagged Grievances'],
    gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-300 dark:border-emerald-800 hover:border-emerald-500 hover:shadow-emerald-500/10',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20',
    demoEmail: 'consumer@demo.gov.in',
  },
  {
    id: 'inspector',
    role: 'inspector',
    title: 'Legal Metrology Inspector',
    badge: 'FIELD ENFORCEMENT',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    persona: 'Inspector Arjun Nair (BBMP Zone 1)',
    subtitle: 'Field optical OCR packaging audits, SCN notice dispatch & raids',
    description: 'Inspect kirana and supermarket commodities, verify mandatory declarations under LM Rules, and adjudicate consumer complaints.',
    features: ['Optical OCR Scanner', 'Show-Cause Notices', 'Assigned Cases'],
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-300 dark:border-amber-800 hover:border-amber-500 hover:shadow-amber-500/10',
    btnClass: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20',
    demoEmail: 'inspector@demo.gov.in',
  },
  {
    id: 'admin',
    role: 'admin',
    title: 'Directorate Supervisor',
    badge: 'CENTRAL COMMAND',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    persona: 'Dr. Rajeshwar Sharma, IAS (Director General)',
    subtitle: 'National micro-fraud radar, marketplace crawler & policy rules',
    description: 'Apex administrative overview for CCPA. Correlate nationwide consumer reports, dispatch field raids, and crawl Amazon/Flipkart/Blinkit.',
    features: ['₹10 Fraud Radar', 'E-Com Web Crawler', 'All System Modules'],
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-300 dark:border-blue-800 hover:border-blue-500 hover:shadow-blue-500/10',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20',
    demoEmail: 'admin@demo.gov.in',
  },
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, user } = useAuthStore();
  const { language, setLanguage, t } = useLanguageStore();

  const [activePortal, setActivePortal] = useState<PortalTab>('consumer');
  const [email, setEmail] = useState(DEMO_PORTAL_CONFIGS.consumer.demoEmail);
  const [password, setPassword] = useState(DEMO_PORTAL_CONFIGS.consumer.demoPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loadingRoleId, setLoadingRoleId] = useState<PortalTab | null>(null);
  const [showCustomLogin, setShowCustomLogin] = useState(false);

  useEffect(() => {
    const portalParam = searchParams.get('portal') || searchParams.get('role');
    if (portalParam && ['consumer', 'inspector', 'admin'].includes(portalParam)) {
      setActivePortal(portalParam as PortalTab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'consumer') {
        navigate('/dashboard/scanner');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // 1-Click Fast Instant Launch
  const handleFastLaunch = (portalId: PortalTab) => {
    setLoadingRoleId(portalId);
    setError('');

    const config = DEMO_PORTAL_CONFIGS[portalId];
    login(config.demoEmail, config.role);

    setTimeout(() => {
      if (config.role === 'consumer') {
        navigate('/dashboard/scanner');
      } else {
        navigate('/dashboard');
      }
    }, 150);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    const lower = email.toLowerCase();
    const role: UserRole = lower.includes('admin')
      ? 'admin'
      : lower.includes('inspect')
      ? 'inspector'
      : 'consumer';

    login(email, role);
    if (role === 'consumer') {
      navigate('/dashboard/scanner');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Texture Pattern */}
      <GridPattern
        width={40}
        height={40}
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [3, 8],
          [18, 6],
          [22, 12],
        ]}
        className={cn(
          "[mask-image:radial-gradient(850px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-20%] h-[180%] skew-y-12 fill-blue-600/[0.04] stroke-slate-900/[0.04] dark:fill-blue-500/[0.06] dark:stroke-white/[0.04]"
        )}
      />

      {/* Navigation Header */}
      <div className="absolute top-5 left-6 right-6 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
          >
            {t('publicHome')}
          </Link>
          <Link
            to="/directory"
            className="hidden sm:inline-flex text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 items-center gap-1.5 bg-blue-50/90 dark:bg-blue-950/40 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900 shadow-xs transition-colors"
          >
            <span>{t('publicCatalog')}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            <Languages className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <select
              aria-label="Select Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pl-0.5"
            >
              <option value="en" className="dark:bg-slate-900 text-slate-900 dark:text-white">English</option>
              <option value="hi" className="dark:bg-slate-900 text-slate-900 dark:text-white">हिन्दी (Hindi)</option>
              <option value="kn" className="dark:bg-slate-900 text-slate-900 dark:text-white">ಕನ್ನಡ (Kannada)</option>
              <option value="ta" className="dark:bg-slate-900 text-slate-900 dark:text-white">தமிழ் (Tamil)</option>
            </select>
          </div>

          <AnimatedThemeToggler />
        </div>
      </div>

      {/* Main Title Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl relative z-10 pt-14 sm:pt-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Zap className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
          <span>Instant 1-Click Sandbox Portals</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Satya<span className="text-blue-600 dark:text-blue-400">Drishti</span> Platform
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Choose any role below to launch into the system instantly without credentials.
        </p>
      </div>

      {/* ── 3 FAST 1-CLICK LAUNCH CARDS ── */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FAST_ROLES.map((item) => {
            const isLoading = loadingRoleId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleFastLaunch(item.id)}
                className={`group relative rounded-2xl border-2 p-5 sm:p-6 transition-all duration-200 cursor-pointer bg-white dark:bg-slate-900 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 ${item.gradient}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors font-semibold">
                      1-Click →
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                    {item.persona}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.subtitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    {item.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    variant="primary"
                    className={`w-full justify-center font-bold text-xs min-h-[42px] gap-2 rounded-xl transition-all shadow-md ${item.btnClass}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFastLaunch(item.id);
                    }}
                    isLoading={isLoading}
                  >
                    <span>Launch {item.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Collapsible Custom Credential Form */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowCustomLogin(!showCustomLogin)}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold inline-flex items-center gap-1 py-1"
          >
            <span>Need custom login / custom credentials?</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showCustomLogin ? 'rotate-180' : ''}`} />
          </button>

          {showCustomLogin && (
            <div className="mt-4 max-w-md mx-auto bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-left animate-in fade-in duration-200">
              <form onSubmit={handleCustomSubmit} className="space-y-3.5">
                {error && (
                  <div className="p-2.5 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-lg text-xs">
                    {error}
                  </div>
                )}
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <Button variant="primary" type="submit" className="w-full text-xs font-bold min-h-[38px]">
                  Sign In with Credentials
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
