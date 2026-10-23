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
import { Button } from '../ui/Button';

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
    <section className="py-16 sm:py-24 bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            See How SatyaDrishti Decodes the Truth in 2 Seconds
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Select a common supermarket trap below to watch our multimodal vision and deterministic rules engine cross-examine front slogans against back reality.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500 text-white shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-indigo-500/20">
                    {preset.category.split('/')[0]}
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <div className="text-sm font-bold text-white mb-1 line-clamp-1">
                  {preset.name}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  {preset.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Simulator Glass Dashboard */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Top Bar: Profile Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Active Consumer Filters:
              </span>
              <div className="flex flex-wrap gap-2">
                {HEALTH_PROFILES.slice(0, 4).map((profile) => {
                  const isActive = activeProfiles.includes(profile.id);
                  return (
                    <button
                      key={profile.id}
                      onClick={() => toggleProfile(profile.id)}
                      className={`text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{profile.icon}</span>
                      <span>{profile.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-black font-mono text-rose-400">
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
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Marketing Slogan vs Reality</span>
              </div>

              {auditResult.discrepancies.length > 0 ? (
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase block mb-1">
                      🟢 Front Claim
                    </span>
                    <span className="font-semibold text-slate-200">
                      "{auditResult.discrepancies[0].frontClaim}"
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs">
                    <span className="text-[10px] text-rose-400 font-bold uppercase block mb-1">
                      🔴 Back Reality
                    </span>
                    <span className="text-rose-200 font-medium">
                      {auditResult.discrepancies[0].backReality}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No discrepancies flagged for this item.</p>
              )}
            </div>

            {/* Column 2: Health / Risk Traps */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>Health & Allergen Risk</span>
              </div>

              {auditResult.alerts.length > 0 ? (
                <div className="space-y-2">
                  {auditResult.alerts.slice(0, 2).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                    >
                      <div className="font-bold text-slate-200 mb-1 flex items-center justify-between">
                        <span>{alert.title}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {alert.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active health risks triggered.</p>
              )}
            </div>

            {/* Column 3: Shrinkflation & Legal Metrology */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <TrendingDown className="w-4 h-4 text-purple-400" />
                <span>Shrinkflation & PCR Law</span>
              </div>

              {currentPreset.shrinkflation.detected ? (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30">
                    <span className="text-purple-300 font-bold block mb-1">
                      +{currentPreset.shrinkflation.stealthPriceHikePercent}% Stealth Price Hike
                    </span>
                    <span className="text-slate-300 text-[11px]">
                      Reduced from {currentPreset.shrinkflation.previousWeight} down to{' '}
                      {currentPreset.shrinkflation.currentWeight} while keeping {currentPreset.mrp}.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  Standard packaging weight retained.
                </div>
              )}

              {currentPreset.statutoryViolations.length > 0 && (
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-amber-400 font-semibold block text-[10px] uppercase">
                    Statutory Rule Violation
                  </span>
                  <span className="text-slate-300 text-[11px]">
                    {currentPreset.statutoryViolations[0].ruleCode}:{' '}
                    {currentPreset.statutoryViolations[0].description}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Want to test your own packaged snack, biscuit, or quick-commerce listing?
            </div>
            <Link to="/dashboard/scanner">
              <Button
                variant="primary"
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Open Live Camera Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
