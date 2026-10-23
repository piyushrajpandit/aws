import React from 'react';
import { DEMO_PRESETS } from '../../data/demoPresets';
import { useHealthStore } from '../../store/healthStore';
import { Zap, AlertTriangle, ArrowRight, X } from 'lucide-react';

export const StagePresetsBar: React.FC = () => {
  const { activePreset, loadPreset, clearPreset } = useHealthStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-subtle mb-6 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                1-Click Stage Demo Presets
              </h3>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                Judge Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant offline-proof cases highlighting real Indian packaging deception & shrinkflation
            </p>
          </div>
        </div>

        {activePreset && (
          <button
            onClick={clearPreset}
            className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-500/20 transition-all self-start sm:self-auto font-medium"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
        {DEMO_PRESETS.map(preset => {
          const isSelected = activePreset?.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset.id)}
              className={`text-left p-3 rounded-lg border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-500 dark:border-indigo-500 text-slate-900 dark:text-white shadow-xs ring-1 ring-indigo-500/30'
                  : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
                    {preset.category.split('/')[0].trim()}
                  </span>
                  {preset.shrinkflation.detected && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-1.5 py-0.5 rounded">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      Shrinkflation
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1 mb-1">
                  {preset.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {preset.tagline}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/40 flex items-center justify-between text-[11px]">
                <span className="text-slate-700 dark:text-slate-300 font-mono font-semibold">{preset.mrp}</span>
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {isSelected ? 'Loaded in Audit' : 'Test Case'}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {activePreset && (
        <div className="mt-3 p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200/90 flex items-start gap-2">
          <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">🎤 Stage Narrative:</span>
          <span>{activePreset.stageNarrative}</span>
        </div>
      )}
    </div>
  );
};

