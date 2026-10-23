import React from 'react';
import { DEMO_PRESETS } from '../../data/demoPresets';
import { useHealthStore } from '../../store/healthStore';
import { Zap, AlertTriangle, ArrowRight, X } from 'lucide-react';

export const StagePresetsBar: React.FC = () => {
  const { activePreset, loadPreset, clearPreset } = useHealthStore();

  return (
    <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 rounded-xl p-4 shadow-xl backdrop-blur-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                1-Click Stage Demo Presets
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Judge Ready
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Instant offline-proof cases highlighting real Indian packaging deception & shrinkflation
            </p>
          </div>
        </div>

        {activePreset && (
          <button
            onClick={clearPreset}
            className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-500/30 transition-all self-start sm:self-auto"
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
                  ? 'bg-indigo-600/25 border-indigo-400 text-white shadow-md shadow-indigo-950/50 ring-1 ring-indigo-400/40'
                  : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900/80 text-indigo-300 border border-indigo-500/20">
                    {preset.category.split('/')[0].trim()}
                  </span>
                  {preset.shrinkflation.detected && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      Shrinkflation
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-100 line-clamp-1 mb-1">
                  {preset.name}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {preset.tagline}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">{preset.mrp}</span>
                <span
                  className={`flex items-center gap-1 font-medium ${
                    isSelected ? 'text-indigo-300 font-semibold' : 'text-slate-400'
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
        <div className="mt-3 p-2.5 rounded-lg bg-indigo-950/50 border border-indigo-500/20 text-xs text-indigo-200/90 flex items-start gap-2">
          <span className="text-amber-400 font-bold shrink-0">🎤 Stage Narrative:</span>
          <span>{activePreset.stageNarrative}</span>
        </div>
      )}
    </div>
  );
};
