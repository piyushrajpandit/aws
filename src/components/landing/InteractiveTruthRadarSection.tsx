import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_PRESETS, DemoPresetProduct } from '../../data/demoPresets';
import {
  evaluateHealthAndClaims,
  HEALTH_PROFILES,
  HealthProfileId,
} from '../../lib/healthProfileEngine';
import {
  Sparkles,
  Zap,
  TrendingDown,
  ShieldAlert,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const InteractiveTruthRadarSection: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DEMO_PRESETS[0].id);
  const [activeProfiles, setActiveProfiles] = useState<HealthProfileId[]>([
    'gym',
    'diabetic',
    'nut_allergy',
  ]);

  const currentPreset =
    DEMO_PRESETS.find((p) => p.id === selectedPresetId) || DEMO_PRESETS[0];

  const toggleProfile = (id: HealthProfileId) => {
    setActiveProfiles((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const auditResult = evaluateHealthAndClaims(
    currentPreset.ingredientsText,
    currentPreset.nutritionalInfo,
    currentPreset.frontClaims,
    activeProfiles
  );

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAF9] border-b border-slate-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase font-bold px-3 py-1 rounded-full bg-slate-200/80 text-slate-800">
            Interactive Verification
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 tracking-tight">
            See How Truth is Uncovered in 2 Seconds
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            Select a common supermarket trap below to see how our engine cross-examines front slogans against back reality.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`text-left p-5 rounded-[1.75rem] border transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-white border-slate-900 text-slate-900 shadow-lg ring-1 ring-slate-900/10'
                    : 'bg-white/60 border-slate-200/80 text-slate-500 hover:bg-white hover:text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                    {preset.category.split('/')[0]}
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <div className="text-sm font-bold font-display text-slate-900 mb-1 line-clamp-1">
                  {preset.name}
                </div>
                <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {preset.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Simulator Glass Dashboard */}
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-10 shadow-xl">
          {/* Top Bar: Profile Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">
                Active Consumer Filters:
              </span>
              <div className="flex flex-wrap gap-2">
                {HEALTH_PROFILES.slice(0, 4).map((profile) => {
                  const isActive = activeProfiles.includes(profile.id);
                  return (
                    <button
                      key={profile.id}
                      onClick={() => toggleProfile(profile.id)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold flex items-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{profile.icon}</span>
                      <span>{profile.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-black font-display text-rose-600">
                  {auditResult.overallSafetyScore} / 100
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Truth Index
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
            {/* Column 1: Marketing Discrepancy */}
            <div className="p-5 rounded-2xl bg-[#FFFBEB] border border-amber-100 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Front Slogan vs Reality</span>
              </div>

              {auditResult.discrepancies.length > 0 ? (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-white border border-amber-200/60 text-xs">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block mb-1">
                      🟢 Promoted Slogan
                    </span>
                    <span className="font-semibold text-slate-900">
                      "{auditResult.discrepancies[0].frontClaim}"
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/70 text-xs">
                    <span className="text-[10px] text-rose-700 font-bold uppercase block mb-1">
                      🔴 Actual Ingredient Reality
                    </span>
                    <span className="text-rose-950 font-medium">
                      {auditResult.discrepancies[0].backReality}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">No discrepancies flagged for this item.</p>
              )}
            </div>

            {/* Column 2: Health / Risk Traps */}
            <div className="p-5 rounded-2xl bg-[#ECFDF5] border border-emerald-100 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                <span>Health & Allergen Impact</span>
              </div>

              {auditResult.alerts.length > 0 ? (
                <div className="space-y-2.5">
                  {auditResult.alerts.slice(0, 2).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-xl bg-white border border-emerald-200/60 text-xs"
                    >
                      <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                        <span>{alert.title}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {alert.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No active health risks triggered.</p>
              )}
            </div>

            {/* Column 3: Shrinkflation & Legal Metrology */}
            <div className="p-5 rounded-2xl bg-[#EEF2FF] border border-indigo-100 space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                <TrendingDown className="w-4 h-4 text-indigo-600" />
                <span>Shrinkflation & Law</span>
              </div>

              {currentPreset.shrinkflation.detected ? (
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-indigo-200/60">
                    <span className="text-indigo-950 font-bold block mb-1">
                      +{currentPreset.shrinkflation.stealthPriceHikePercent}% Stealth Price Hike
                    </span>
                    <span className="text-slate-600 text-[11px] leading-relaxed">
                      Reduced from {currentPreset.shrinkflation.previousWeight} down to{' '}
                      {currentPreset.shrinkflation.currentWeight} at identical {currentPreset.mrp}.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white border border-indigo-200/60 text-xs text-slate-500">
                  Standard packaging weight retained.
                </div>
              )}

              {currentPreset.statutoryViolations.length > 0 && (
                <div className="p-3 rounded-xl bg-white border border-indigo-200/60 text-xs">
                  <span className="text-indigo-950 font-semibold block text-[10px] uppercase">
                    Statutory Rule Violation
                  </span>
                  <span className="text-slate-600 text-[11px]">
                    {currentPreset.statutoryViolations[0].ruleCode}:{' '}
                    {currentPreset.statutoryViolations[0].description}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              Want to verify your own packaged snack, biscuit, or online order?
            </div>
            <Link
              to="/dashboard/scanner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Open Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTruthRadarSection;
