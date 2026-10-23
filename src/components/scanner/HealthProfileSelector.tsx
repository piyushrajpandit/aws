import React, { useState } from 'react';
import { HEALTH_PROFILES, HealthProfileId, HealthCategory } from '../../lib/healthProfileEngine';
import { useHealthStore } from '../../store/healthStore';
import { ShieldAlert, Sparkles, Check, HeartPulse, Target, RotateCcw, Zap, Info } from 'lucide-react';

export const HealthProfileSelector: React.FC = () => {
  const { activeProfiles, toggleProfile, setProfiles } = useHealthStore();
  const [activeTab, setActiveTab] = useState<'all' | 'disease' | 'goal'>('all');

  const diseaseProfiles = HEALTH_PROFILES.filter((p) => p.category === 'disease');
  const goalProfiles = HEALTH_PROFILES.filter((p) => p.category === 'goal');

  const displayedProfiles =
    activeTab === 'disease'
      ? diseaseProfiles
      : activeTab === 'goal'
      ? goalProfiles
      : HEALTH_PROFILES;

  // 1-Click Quick Preset Bundles
  const applyPresetBundle = (bundle: 'all_diseases' | 'gym_bro' | 'kids_family' | 'diabetic_heart' | 'clear') => {
    switch (bundle) {
      case 'all_diseases':
        setProfiles(diseaseProfiles.map((p) => p.id));
        break;
      case 'gym_bro':
        setProfiles(['gym', 'weight_loss', 'clean_eating', 'cholesterol']);
        break;
      case 'kids_family':
        setProfiles(['clean_eating', 'nut_allergy', 'lactose_intolerance', 'gluten_allergy']);
        break;
      case 'diabetic_heart':
        setProfiles(['diabetic', 'hypertension', 'cholesterol', 'gerd_acid_reflux']);
        break;
      case 'clear':
        setProfiles([]);
        break;
    }
  };

  const activeDiseaseCount = activeProfiles.filter((id) =>
    diseaseProfiles.some((p) => p.id === id)
  ).length;

  const activeGoalCount = activeProfiles.filter((id) =>
    goalProfiles.some((p) => p.id === id)
  ).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-subtle mb-6 transition-colors">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Personal Health & Lifestyle Guardians</span>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                {activeProfiles.length} Active Guards
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select your medical conditions & fitness goals — SatyaDrishti cross-audits every product scan against your active profile.
            </p>
          </div>
        </div>

        {/* Real-time Badge */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 shrink-0 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Live Scanner Cross-Audit</span>
        </div>
      </div>

      {/* 1-Click Fast Bundles Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Fast 1-Click Bundles:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => applyPresetBundle('all_diseases')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 transition-all flex items-center gap-1"
          >
            <span>🩺 All Diseases ({diseaseProfiles.length})</span>
          </button>
          <button
            type="button"
            onClick={() => applyPresetBundle('diabetic_heart')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 transition-all flex items-center gap-1"
          >
            <span>❤️ Diabetes & Heart</span>
          </button>
          <button
            type="button"
            onClick={() => applyPresetBundle('gym_bro')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 transition-all flex items-center gap-1"
          >
            <span>🏋️ Gym Bro Fitness</span>
          </button>
          <button
            type="button"
            onClick={() => applyPresetBundle('kids_family')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 transition-all flex items-center gap-1"
          >
            <span>👶 Clean Kids & Family</span>
          </button>
          <button
            type="button"
            onClick={() => applyPresetBundle('clear')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1"
            title="Deselect all guards"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Profiles ({HEALTH_PROFILES.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('disease')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'disease'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Medical Conditions ({activeDiseaseCount}/{diseaseProfiles.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('goal')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'goal'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Fitness & Diet Goals ({activeGoalCount}/{goalProfiles.length})</span>
        </button>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {displayedProfiles.map((profile) => {
          const isActive = activeProfiles.includes(profile.id);
          const isDisease = profile.category === 'disease';

          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => toggleProfile(profile.id)}
              className={`group text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between relative ${
                isActive
                  ? isDisease
                    ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-400 dark:border-rose-500/60 text-slate-900 dark:text-white shadow-xs ring-1 ring-rose-400/40'
                    : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 text-slate-900 dark:text-white shadow-xs ring-1 ring-emerald-500/40'
                  : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl leading-none">{profile.icon}</span>
                    <span className="text-xs font-bold leading-tight line-clamp-1 text-slate-900 dark:text-slate-100">
                      {profile.label}
                    </span>
                  </div>

                  {/* Active Checkmark Pill */}
                  {isActive ? (
                    <span
                      className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                        isDisease ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600 shrink-0 group-hover:border-slate-400" />
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-2">
                  {profile.description}
                </p>
              </div>

              {/* Bottom Target Concerns Tag */}
              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px]">
                <span
                  className={`font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isActive
                      ? isDisease
                        ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'
                        : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {profile.badge}
                </span>

                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  {isActive ? 'Guarding' : 'Off'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
