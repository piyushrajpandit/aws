import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Sliders,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useHealthProfileStore, HealthCondition } from '../../store/healthProfileStore';
import { useScanStore } from '../../store/scanStore';
import { Button } from '../ui/Button';

export const PersonalHealthVerdictCard: React.FC = () => {
  const { currentScan } = useScanStore();
  const { profile, setCondition, evaluateProduct } = useHealthProfileStore();

  if (!currentScan || currentScan.status !== 'completed') {
    return null;
  }

  const productName = currentScan.extractedData?.productName || currentScan.imageName || 'Scanned Packaged Commodity';
  const rawText = currentScan.extractedData?.rawText || JSON.stringify(currentScan.extractedData || {});

  const result = evaluateProduct(productName, rawText, (currentScan.extractedData || {}) as unknown as Record<string, unknown>);

  const isAvoid = result.verdict === 'AVOID';
  const isCaution = result.verdict === 'CAUTION';
  const isSafe = result.verdict === 'SAFE';

  return (
    <div
      className={`rounded-2xl border-2 transition-all p-5 shadow-sm ${
        isAvoid
          ? 'bg-gradient-to-br from-red-50/80 via-white to-rose-50/50 dark:from-red-950/30 dark:via-slate-900 dark:to-slate-900 border-red-300 dark:border-red-900/60'
          : isCaution
          ? 'bg-gradient-to-br from-amber-50/80 via-white to-yellow-50/50 dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900 border-amber-300 dark:border-amber-900/60'
          : 'bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 border-emerald-300 dark:border-emerald-900/60'
      }`}
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-xs ${
              isAvoid
                ? 'bg-red-600'
                : isCaution
                ? 'bg-amber-600'
                : 'bg-emerald-600'
            }`}
          >
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Personal Nutrition & Health Decision
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                {profile.condition.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Evaluated against your active personal diet profile ({profile.profileName})
            </p>
          </div>
        </div>

        {/* Condition quick toggle */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-semibold text-slate-400">Simulate:</span>
          {(['diabetes', 'hypertension', 'fitness', 'kid_friendly'] as HealthCondition[]).map((cond) => (
            <button
              key={cond}
              onClick={() => setCondition(cond)}
              className={`text-[10px] font-bold px-2 py-1 rounded-md transition-all ${
                profile.condition === cond
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cond === 'diabetes'
                ? 'Diabetic'
                : cond === 'hypertension'
                ? 'High BP'
                : cond === 'fitness'
                ? 'Gym Bro'
                : 'Kids'}
            </button>
          ))}
          <Link
            to="/dashboard/health-profile"
            className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center ml-1"
          >
            Edit Filters <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Verdict Display */}
      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left: Verdict badge & Headline */}
        <div className="md:col-span-8 flex items-start gap-3.5">
          <div className="shrink-0 mt-0.5">
            {isAvoid ? (
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            ) : isCaution ? (
              <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            ) : (
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md text-white font-mono ${
                  isAvoid ? 'bg-red-600' : isCaution ? 'bg-amber-600' : 'bg-emerald-600'
                }`}
              >
                {result.verdict}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {result.headline}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {result.recommendation}
            </p>
          </div>
        </div>

        {/* Right: Compatibility score */}
        <div className="md:col-span-4 flex md:justify-end items-center">
          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Health Match
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {result.score}
                <span className="text-xs font-normal text-slate-400">/10</span>
              </div>
            </div>
            <div
              className={`h-10 w-1.5 rounded-full ${
                isAvoid ? 'bg-red-500' : isCaution ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Diagnostic breakdown list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-3 border-t border-slate-200/80 dark:border-slate-800">
        {result.checks.map((check, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
              check.status === 'bad'
                ? 'bg-red-50/60 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200'
                : check.status === 'warn'
                ? 'bg-amber-50/60 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
                : 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200'
            }`}
          >
            <span className="shrink-0 font-bold">
              {check.status === 'bad' ? '❌' : check.status === 'warn' ? '⚠️' : '✅'}
            </span>
            <div className="min-w-0">
              <div className="font-bold flex items-center gap-1.5">
                <span>{check.nutrient}</span>
                <span className="text-[10px] font-mono opacity-80 font-normal">({check.value})</span>
              </div>
              <p className="text-[11px] opacity-90 mt-0.5 leading-snug">{check.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested healthier alternative */}
      {result.betterAlternativeHint && (
        <div className="mt-3 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-950 dark:text-blue-100">Recommended Alternative: </span>
            <span>{result.betterAlternativeHint}</span>
          </div>
        </div>
      )}
    </div>
  );
};
