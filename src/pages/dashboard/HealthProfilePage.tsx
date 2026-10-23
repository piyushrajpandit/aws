import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  Dumbbell,
  Baby,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Sliders,
  Save,
  Check,
} from 'lucide-react';
import { useHealthProfileStore, HealthCondition, CONDITION_PRESETS } from '../../store/healthProfileStore';
import { Button } from '../../components/ui/Button';

interface PresetOption {
  id: HealthCondition;
  title: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  keyRule: string;
}

const PRESETS: PresetOption[] = [
  {
    id: 'diabetes',
    title: 'Diabetic & Low Sugar',
    tagline: 'Prevents acute blood glucose & insulin spikes',
    icon: Activity,
    color: 'from-amber-500 to-red-500',
    badge: '101M+ in India',
    keyRule: 'Max 5g Sugar • Low Glycemic Index',
  },
  {
    id: 'hypertension',
    title: 'High BP & Heart Health',
    tagline: 'Protects arterial pressure & cardiovascular health',
    icon: HeartPulse,
    color: 'from-rose-500 to-pink-600',
    badge: '315M+ in India',
    keyRule: 'Max 200mg Sodium • Low Salt',
  },
  {
    id: 'fitness',
    title: 'Gym & High Protein',
    tagline: 'Optimizes muscle hypertrophy & daily macro splits',
    icon: Dumbbell,
    color: 'from-blue-500 to-cyan-500',
    badge: 'Athletes & Bodybuilding',
    keyRule: 'Min 18g Protein • Moderate Carbs',
  },
  {
    id: 'kid_friendly',
    title: 'Kids Safe & Clean Eating',
    tagline: 'Zero chemical additives, artificial sweeteners & palm oil',
    icon: Baby,
    color: 'from-purple-500 to-indigo-500',
    badge: 'Family & Children',
    keyRule: '0 Artificial Sweeteners • Zero Palm Oil',
  },
  {
    id: 'weight_loss',
    title: 'Weight Loss & Calorie Deficit',
    tagline: 'Focuses on low caloric density & minimal saturated fats',
    icon: Scale,
    color: 'from-emerald-500 to-teal-600',
    badge: 'Fat Loss',
    keyRule: 'Max 200 Kcal/serving • Max 4g Fat',
  },
  {
    id: 'general_wellness',
    title: 'Balanced Daily Wellness',
    tagline: 'General clean eating standards for whole-body health',
    icon: Sparkles,
    color: 'from-slate-600 to-slate-800',
    badge: 'All-Rounder',
    keyRule: 'Standard Daily Recommended Allowances',
  },
];

export const HealthProfilePage: React.FC = () => {
  const { profile, setCondition, updateProfile, evaluateProduct } = useHealthProfileStore();
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSelectPreset = (cond: HealthCondition) => {
    setCondition(cond);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const sampleEvaluation = evaluateProduct(
    'Choco-Crunch Cream Biscuits (100g)',
    'Ingredients: Refined Wheat Flour (Maida), Sugar (34g), Palmolein Oil, Invert Sugar Syrup, Sodium (380mg), Protein (4.2g), Energy 490 kcal.',
    {}
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <HeartPulse className="h-4 w-4 text-emerald-200" />
            <span>Personal Health & Dietary Filter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tell SatyaDrishti What You Can & Cannot Eat
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-50/90 leading-relaxed">
            When you scan any food or beverage label, our AI doesn't just read words—it judges the product specifically for <strong>your condition</strong> and warns you before you buy.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none hidden sm:block">
          <HeartPulse className="h-64 w-64 text-white" />
        </div>
      </div>

      {savedNotice && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Health profile updated successfully! All future scans will benchmark against these thresholds.</span>
        </div>
      )}

      {/* Preset Condition Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>1. Choose Your Primary Dietary / Medical Focus</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Click to activate preset</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = profile.condition === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-400/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className={`h-11 w-11 rounded-xl bg-gradient-to-br ${preset.color} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                        {preset.badge}
                      </span>
                      {isSelected && (
                        <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {preset.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
                  {preset.keyRule}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Threshold Customization Sliders & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-emerald-600" />
              <span>2. Fine-Tune Your Max Safe Nutrient Limits</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Per Serving</span>
          </div>

          <div className="space-y-5">
            {/* Max Sugar */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300">Max Sugar Per Serving</span>
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 rounded font-mono">
                  {profile.maxSugarGrams}g
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={profile.maxSugarGrams}
                onChange={(e) => updateProfile({ maxSugarGrams: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Products with sugar above this number will be flagged as red/avoid.
              </p>
            </div>

            {/* Max Sodium */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300">Max Sodium / Salt Limit</span>
                <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 rounded font-mono">
                  {profile.maxSodiumMg}mg
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={profile.maxSodiumMg}
                onChange={(e) => updateProfile({ maxSodiumMg: Number(e.target.value) })}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Crucial for hypertension and kidney strain prevention.
              </p>
            </div>

            {/* Min Protein */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300">Minimum Protein Target</span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 rounded font-mono">
                  {profile.minProteinGrams}g
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                step="1"
                value={profile.minProteinGrams}
                onChange={(e) => updateProfile({ minProteinGrams: Number(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Ensures fitness and muscle-recovery food verification.
              </p>
            </div>

            {/* Max Calories */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300">Max Calorie Cap (kcal)</span>
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 rounded font-mono">
                  {profile.maxCalories} kcal
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="600"
                step="20"
                value={profile.maxCalories}
                onChange={(e) => updateProfile({ maxCalories: Number(e.target.value) })}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Strict Ingredient Filters */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Special Ingredient Blacklists
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.avoidPalmOil}
                  onChange={(e) => updateProfile({ avoidPalmOil: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  🚫 Block Palm Oil / Palmolein
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.avoidArtificialSweeteners}
                  onChange={(e) => updateProfile({ avoidArtificialSweeteners: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  🚫 Block Aspartame / Sucralose
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isVegetarian}
                  onChange={(e) => updateProfile({ isVegetarian: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  🌱 100% Vegetarian Only
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isGlutenFree}
                  onChange={(e) => updateProfile({ isGlutenFree: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  🌾 Gluten-Free Only
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Decision Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-5 rounded-2xl text-white shadow-lg border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono">
                Live Scanner Simulator
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                Active: {profile.condition.toUpperCase()}
              </span>
            </div>

            <h4 className="font-bold text-sm text-slate-100">
              How SatyaDrishti Evaluates a Typical Biscuit / Snack:
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              "Choco-Crunch Cream Biscuits" with 34g sugar & Palm Oil
            </p>

            {/* Verdict Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      sampleEvaluation.verdict === 'AVOID'
                        ? 'bg-red-500 text-white'
                        : sampleEvaluation.verdict === 'CAUTION'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {sampleEvaluation.verdict === 'AVOID' ? '✕' : '✓'}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-extrabold uppercase ${
                        sampleEvaluation.verdict === 'AVOID'
                          ? 'text-red-400'
                          : sampleEvaluation.verdict === 'CAUTION'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {sampleEvaluation.verdict}: {sampleEvaluation.headline}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black font-mono text-white">
                    {sampleEvaluation.score}
                    <span className="text-xs text-slate-400 font-normal">/10</span>
                  </div>
                </div>
              </div>

              {/* Checks */}
              <div className="space-y-2 pt-2 border-t border-slate-700 text-xs">
                {sampleEvaluation.checks.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-xs">
                      {c.status === 'bad' ? '🔴' : c.status === 'warn' ? '🟡' : '🟢'}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-200">{c.nutrient}: </span>
                      <span className="text-slate-400">{c.message}</span>
                    </div>
                  </div>
                ))}
              </div>

              {sampleEvaluation.betterAlternativeHint && (
                <div className="mt-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-[11px] text-emerald-300 flex items-start gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong>Better Alternative:</strong> {sampleEvaluation.betterAlternativeHint}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Ready to test in store?</span>
              <a
                href="/dashboard/scanner"
                className="font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
              >
                Go to Camera Scanner →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
