import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Share2, PlusSquare, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './Button';
import { BrandLogo } from './BrandLogo';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Check if device is iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    setIsIos(isIosDevice);

    // Listen for beforeinstallprompt on Chromium browsers
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Check if user dismissed recently
      const dismissed = sessionStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 2500);
      }
    };

    // Listen for successful install
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setShowIosModal(false);
      setDeferredPrompt(null);
    };

    // Listen for custom trigger to open install prompt
    const handleCustomTrigger = () => {
      handleInstallClick();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('open-pwa-install', handleCustomTrigger);

    // If iOS and not standalone, show banner after delay unless dismissed
    if (isIosDevice) {
      const dismissed = sessionStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('open-pwa-install', handleCustomTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setShowBanner(false);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Error invoking PWA install prompt:', err);
      }
    } else if (isIos) {
      setShowBanner(false);
      setShowIosModal(true);
    } else {
      // General instructions for other browsers
      alert(
        'To install SatyaDrishti on your phone, open your browser menu (⋮ or Share) and tap "Install app" or "Add to Home Screen".'
      );
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  // If already running inside standalone app, do not show install prompt
  if (isStandalone || isInstalled) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Banner — Collapsible & Non-Obtrusive */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 pointer-events-auto"
          >
            {isMinimized ? (
              /* Minimized Subtle Pill (Doesn't block any audit cards) */
              <div
                onClick={() => setIsMinimized(false)}
                className="cursor-pointer bg-slate-900/90 hover:bg-slate-900 backdrop-blur-xl border border-slate-700 rounded-full px-3.5 py-1.5 shadow-xl text-white flex items-center gap-2 ml-auto w-fit transition-all hover:scale-105"
                title="Click to view PWA installation options"
              >
                <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0">
                  <BrandLogo iconSize="w-4 h-4" showText={false} variant="dark" />
                </div>
                <span className="text-xs font-semibold">Install SatyaDrishti</span>
                <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded-full font-mono">Mobile</span>
                <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
              </div>
            ) : (
              /* Expanded Full Card with Minimize & Close Options */
              <div className="bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-3.5 shadow-2xl text-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-md shrink-0">
                    <BrandLogo iconSize="w-7 h-7" showText={false} variant="dark" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-xs sm:text-sm leading-tight text-white flex items-center gap-1.5">
                      Install SatyaDrishti
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.2 rounded-full font-medium">
                        PWA
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1 sm:line-clamp-none">
                      Install on phone for 1-tap offline access.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleInstallClick}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-2.5 py-1.5 h-auto rounded-lg flex items-center gap-1 shadow-md shadow-blue-600/30"
                  >
                    <Download className="h-3 w-3" />
                    Install
                  </Button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    title="Minimize prompt"
                    aria-label="Minimize prompt"
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDismiss}
                    title="Dismiss prompt"
                    aria-label="Dismiss install prompt"
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Instructions Modal */}
      <AnimatePresence>
        {showIosModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl relative"
            >
              <button
                onClick={() => setShowIosModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-600/30">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white">Install on iPhone / iPad</h3>
                <p className="text-xs text-slate-300 mt-1 mb-6">
                  Follow these 2 quick steps to add the app to your Home Screen:
                </p>

                <div className="w-full space-y-3 text-left">
                  <div className="flex items-start gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                      <Share2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Step 1</div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Tap the <span className="font-semibold text-blue-400">Share</span> button at the bottom of Safari.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                      <PlusSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Step 2</div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Scroll down and tap <span className="font-semibold text-emerald-400">Add to Home Screen</span>.
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white"
                  onClick={() => setShowIosModal(false)}
                >
                  Got it!
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
