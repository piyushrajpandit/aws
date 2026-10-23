import React from 'react';
import { HEALTH_PROFILES, HealthProfileId } from '../../lib/healthProfileEngine';
import { useHealthStore } from '../../store/healthStore';
import { ShieldAlert, Sparkles, Check } from 'lucide-react';

export const HealthProfileSelector: React.FC = () => {
  const { activeProfiles, toggleProfile } = useHealthStore();

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              Personal Guardian Profiles
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeProfiles.length} active guards
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              SatyaDrishti checks each scan against your active medical, allergen, and fitness criteria
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-time cross validation</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {HEALTH_PROFILES.map(profile => {
          const isActive = activeProfiles.includes(profile.id);
          return (
            <button
              key={profile.id}
              onClick={() => toggleProfile(profile.id)}
              className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border-emerald-500/50 text-emerald-200 shadow-sm shadow-emerald-900/20 ring-1 ring-emerald-500/30'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
              title={profile.description}
            >
              <span className="text-sm leading-none">{profile.icon}</span>
              <span>{profile.label}</span>
              {isActive && (
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
