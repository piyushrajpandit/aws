import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  HealthProfileId,
  HealthAuditResult,
  evaluateHealthAndClaims,
} from '../lib/healthProfileEngine';
import { DEMO_PRESETS, DemoPresetProduct } from '../data/demoPresets';

interface HealthState {
  activeProfiles: HealthProfileId[];
  activePreset: DemoPresetProduct | null;
  currentAuditResult: HealthAuditResult | null;

  toggleProfile: (id: HealthProfileId) => void;
  setProfiles: (ids: HealthProfileId[]) => void;
  loadPreset: (presetId: string) => DemoPresetProduct | null;
  clearPreset: () => void;
  runAudit: (
    ingredients: string,
    nutritionalInfo: {
      energyKcal?: number | string;
      protein?: number | string;
      carbohydrates?: number | string;
      totalSugars?: number | string;
      addedSugars?: number | string;
      totalFat?: number | string;
      saturatedFat?: number | string;
      transFat?: number | string;
      sodium?: number | string;
    },
    frontClaims: string[]
  ) => HealthAuditResult;
  clearAudit: () => void;
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      activeProfiles: ['gym', 'diabetic', 'nut_allergy'],
      activePreset: null,
      currentAuditResult: null,

      toggleProfile: (id: HealthProfileId) => {
        const { activeProfiles, activePreset } = get();
        const updated = activeProfiles.includes(id)
          ? activeProfiles.filter(p => p !== id)
          : [...activeProfiles, id];

        set({ activeProfiles: updated });

        // If there is an active preset loaded, re-evaluate automatically!
        if (activePreset) {
          const reAudit = evaluateHealthAndClaims(
            activePreset.ingredientsText,
            activePreset.nutritionalInfo,
            activePreset.frontClaims,
            updated
          );
          set({ currentAuditResult: reAudit });
        }
      },

      setProfiles: (ids: HealthProfileId[]) => {
        set({ activeProfiles: ids });
      },

      loadPreset: (presetId: string) => {
        const preset = DEMO_PRESETS.find(p => p.id === presetId) || null;
        if (preset) {
          // Merge preset suggested profiles with active ones so the demo highlights it
          const mergedProfiles = Array.from(new Set([...get().activeProfiles, ...preset.suggestedProfile]));
          const audit = evaluateHealthAndClaims(
            preset.ingredientsText,
            preset.nutritionalInfo,
            preset.frontClaims,
            mergedProfiles
          );
          set({
            activePreset: preset,
            activeProfiles: mergedProfiles,
            currentAuditResult: audit,
          });
          return preset;
        }
        return null;
      },

      clearPreset: () => {
        set({ activePreset: null, currentAuditResult: null });
      },

      runAudit: (ingredients, nutritionalInfo, frontClaims) => {
        const audit = evaluateHealthAndClaims(
          ingredients,
          nutritionalInfo,
          frontClaims,
          get().activeProfiles
        );
        set({ currentAuditResult: audit });
        return audit;
      },

      clearAudit: () => {
        set({ currentAuditResult: null });
      },
    }),
    {
      name: 'satyadrishti-health-profiles',
      partialize: state => ({ activeProfiles: state.activeProfiles }),
    }
  )
);
