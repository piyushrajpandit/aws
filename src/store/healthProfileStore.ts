import { create } from 'zustand';

export type HealthCondition =
  | 'diabetes'
  | 'hypertension'
  | 'fitness'
  | 'weight_loss'
  | 'kid_friendly'
  | 'general_wellness';

export interface HealthProfile {
  condition: HealthCondition;
  profileName: string;
  maxSugarGrams: number;
  maxSodiumMg: number;
  minProteinGrams: number;
  maxCalories: number;
  maxFatGrams: number;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  avoidPalmOil: boolean;
  avoidArtificialSweeteners: boolean;
  allergens: string[];
}

export interface HealthCheckItem {
  nutrient: string;
  value: string;
  status: 'good' | 'warn' | 'bad';
  message: string;
}

export interface HealthVerdictResult {
  verdict: 'SAFE' | 'CAUTION' | 'AVOID';
  score: number; // 1 to 10
  headline: string;
  condition: HealthCondition;
  checks: HealthCheckItem[];
  recommendation: string;
  betterAlternativeHint?: string;
}

export const CONDITION_PRESETS: Record<HealthCondition, Omit<HealthProfile, 'profileName'>> = {
  diabetes: {
    condition: 'diabetes',
    maxSugarGrams: 5,
    maxSodiumMg: 400,
    minProteinGrams: 5,
    maxCalories: 250,
    maxFatGrams: 8,
    isVegetarian: false,
    isGlutenFree: false,
    avoidPalmOil: true,
    avoidArtificialSweeteners: false,
    allergens: [],
  },
  hypertension: {
    condition: 'hypertension',
    maxSugarGrams: 15,
    maxSodiumMg: 200,
    minProteinGrams: 5,
    maxCalories: 350,
    maxFatGrams: 10,
    isVegetarian: false,
    isGlutenFree: false,
    avoidPalmOil: true,
    avoidArtificialSweeteners: false,
    allergens: [],
  },
  fitness: {
    condition: 'fitness',
    maxSugarGrams: 10,
    maxSodiumMg: 600,
    minProteinGrams: 18,
    maxCalories: 450,
    maxFatGrams: 12,
    isVegetarian: false,
    isGlutenFree: false,
    avoidPalmOil: true,
    avoidArtificialSweeteners: false,
    allergens: [],
  },
  weight_loss: {
    condition: 'weight_loss',
    maxSugarGrams: 6,
    maxSodiumMg: 350,
    minProteinGrams: 10,
    maxCalories: 200,
    maxFatGrams: 4,
    isVegetarian: false,
    isGlutenFree: false,
    avoidPalmOil: true,
    avoidArtificialSweeteners: false,
    allergens: [],
  },
  kid_friendly: {
    condition: 'kid_friendly',
    maxSugarGrams: 8,
    maxSodiumMg: 250,
    minProteinGrams: 4,
    maxCalories: 220,
    maxFatGrams: 6,
    isVegetarian: false,
    isGlutenFree: false,
    avoidPalmOil: true,
    avoidArtificialSweeteners: true,
    allergens: [],
  },
  general_wellness: {
    condition: 'general_wellness',
    maxSugarGrams: 12,
    maxSodiumMg: 500,
    minProteinGrams: 8,
    maxCalories: 350,
    maxFatGrams: 10,
    isVegetarian: false,
    isGlutenFree: false,
    avoidPalmOil: false,
    avoidArtificialSweeteners: false,
    allergens: [],
  },
};

const STORAGE_KEY = 'satyadrishti_health_profile';

interface HealthProfileState {
  profile: HealthProfile;
  setCondition: (condition: HealthCondition) => void;
  updateProfile: (partial: Partial<HealthProfile>) => void;
  evaluateProduct: (
    productName?: string,
    rawText?: string,
    extractedData?: Record<string, unknown>
  ) => HealthVerdictResult;
}

const DEFAULT_PROFILE: HealthProfile = {
  ...CONDITION_PRESETS.diabetes,
  profileName: 'Diabetic & Low Glycemic Profile',
};

export const useHealthProfileStore = create<HealthProfileState>((set, get) => {
  let savedProfile = DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      savedProfile = { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }

  return {
    profile: savedProfile,

    setCondition: (condition: HealthCondition) => {
      const preset = CONDITION_PRESETS[condition];
      const titles: Record<HealthCondition, string> = {
        diabetes: 'Diabetic & Low-Sugar Profile',
        hypertension: 'Hypertension (Low Sodium / BP) Profile',
        fitness: 'High-Protein & Gym Fitness Profile',
        weight_loss: 'Low-Calorie & Weight Management Profile',
        kid_friendly: "Kids' Safe & Low Additives Profile",
        general_wellness: 'Balanced Daily Wellness Profile',
      };
      const updated: HealthProfile = {
        ...preset,
        profileName: titles[condition],
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      set({ profile: updated });
    },

    updateProfile: (partial) => {
      set((state) => {
        const next = { ...state.profile, ...partial };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return { profile: next };
      });
    },

    evaluateProduct: (productName = '', rawText = '', extractedData = {}) => {
      const { profile } = get();
      const text = `${productName} ${rawText} ${JSON.stringify(extractedData)}`.toLowerCase();

      // Extract or estimate key nutrients from text / extracted data
      let sugar = 0;
      let sodium = 0;
      let protein = 0;
      let calories = 0;
      let fat = 0;

      // Extract sugar
      const sugarMatch = text.match(/(?:sugars?|total sugars?|added sugars?)\D*?(\d+(?:\.\d+)?)\s*(?:g|gm|grams)/i);
      if (sugarMatch) sugar = parseFloat(sugarMatch[1]);
      else if (text.includes('chocolate') || text.includes('biscuit') || text.includes('cookies') || text.includes('sweet') || text.includes('soda') || text.includes('cola') || text.includes('jam')) {
        sugar = 24; // common default estimation for sweets
      } else if (text.includes('bread') || text.includes('cereal') || text.includes('juice')) {
        sugar = 14;
      }

      // Extract sodium
      const sodiumMatch = text.match(/(?:sodium|salt)\D*?(\d+(?:\.\d+)?)\s*(?:mg|milligrams|g)/i);
      if (sodiumMatch) {
        const val = parseFloat(sodiumMatch[1]);
        sodium = text.includes(' g') && !text.includes('mg') ? val * 1000 : val;
      } else if (text.includes('chips') || text.includes('namkeen') || text.includes('instant noodles') || text.includes('pickle') || text.includes('sauce') || text.includes('soup')) {
        sodium = 720;
      }

      // Extract protein
      const proteinMatch = text.match(/protein\D*?(\d+(?:\.\d+)?)\s*(?:g|gm|grams)/i);
      if (proteinMatch) protein = parseFloat(proteinMatch[1]);
      else if (text.includes('whey') || text.includes('protein bar') || text.includes('isolate') || text.includes('soya') || text.includes('paneer') || text.includes('peanut butter')) {
        protein = 22;
      } else if (text.includes('milk') || text.includes('curd') || text.includes('yogurt') || text.includes('dal')) {
        protein = 8;
      }

      // Extract energy / calories
      const calMatch = text.match(/(?:energy|calories|kcal)\D*?(\d+(?:\.\d+)?)/i);
      if (calMatch) calories = parseFloat(calMatch[1]);
      else if (text.includes('butter') || text.includes('chips') || text.includes('fried')) calories = 480;
      else calories = 260;

      // Extract fat
      const fatMatch = text.match(/(?:total fat|fat)\D*?(\d+(?:\.\d+)?)\s*(?:g|gm)/i);
      if (fatMatch) fat = parseFloat(fatMatch[1]);

      const checks: HealthCheckItem[] = [];
      let penalty = 0;

      // 1. Sugar Check
      if (sugar > 0) {
        if (sugar > profile.maxSugarGrams * 2) {
          checks.push({
            nutrient: 'Total Sugar',
            value: `${sugar}g`,
            status: 'bad',
            message: `Dangerously high (${sugar}g vs limit ${profile.maxSugarGrams}g). Major glycemic spike risk.`,
          });
          penalty += 4.5;
        } else if (sugar > profile.maxSugarGrams) {
          checks.push({
            nutrient: 'Total Sugar',
            value: `${sugar}g`,
            status: 'warn',
            message: `Elevated (${sugar}g). Exceeds your target threshold of ${profile.maxSugarGrams}g.`,
          });
          penalty += 2.5;
        } else {
          checks.push({
            nutrient: 'Total Sugar',
            value: `${sugar}g`,
            status: 'good',
            message: `Well within safe limit (${sugar}g <= ${profile.maxSugarGrams}g).`,
          });
        }
      }

      // 2. Sodium Check
      if (sodium > 0) {
        if (sodium > profile.maxSodiumMg * 2) {
          checks.push({
            nutrient: 'Sodium / Salt',
            value: `${sodium}mg`,
            status: 'bad',
            message: `Very high sodium (${sodium}mg vs limit ${profile.maxSodiumMg}mg). Severe BP hazard.`,
          });
          penalty += 4;
        } else if (sodium > profile.maxSodiumMg) {
          checks.push({
            nutrient: 'Sodium / Salt',
            value: `${sodium}mg`,
            status: 'warn',
            message: `Above optimal limit (${sodium}mg > ${profile.maxSodiumMg}mg).`,
          });
          penalty += 2;
        } else {
          checks.push({
            nutrient: 'Sodium / Salt',
            value: `${sodium}mg`,
            status: 'good',
            message: `Cardiovascular-safe sodium count (${sodium}mg).`,
          });
        }
      }

      // 3. Protein Check
      if (protein > 0 || profile.condition === 'fitness') {
        if (protein >= profile.minProteinGrams) {
          checks.push({
            nutrient: 'Protein',
            value: `${protein}g`,
            status: 'good',
            message: `Great protein density (${protein}g >= ${profile.minProteinGrams}g target).`,
          });
        } else if (profile.condition === 'fitness') {
          checks.push({
            nutrient: 'Protein',
            value: `${protein}g`,
            status: 'warn',
            message: `Low protein yield (${protein}g). Below fitness goal of ${profile.minProteinGrams}g.`,
          });
          penalty += 1.5;
        }
      }

      // 4. Palm oil check
      const hasPalmOil = text.includes('palm oil') || text.includes('palmolein') || text.includes('hydrogenated vegetable');
      if (profile.avoidPalmOil && hasPalmOil) {
        checks.push({
          nutrient: 'Unhealthy Fats',
          value: 'Contains Palm Oil / Palmolein',
          status: 'bad',
          message: 'Found palm oil or hydrogenated fats. Saturated fat that clogs arteries.',
        });
        penalty += 2;
      }

      // 5. Artificial sweeteners check (important for kids/clean eaters)
      const hasArtificialSweetener =
        text.includes('aspartame') ||
        text.includes('sucralose') ||
        text.includes('acesulfame') ||
        text.includes('saccharin') ||
        text.includes('maltitol');
      if (profile.avoidArtificialSweeteners && hasArtificialSweetener) {
        checks.push({
          nutrient: 'Artificial Sweeteners',
          value: 'Synthetic Sweetener Detected',
          status: 'bad',
          message: 'Contains chemical sugar substitutes not recommended for your profile.',
        });
        penalty += 2;
      }

      // Compute Final Score (1 - 10)
      const rawScore = Math.max(1, Math.min(10, Math.round((10 - penalty) * 10) / 10));

      let verdict: 'SAFE' | 'CAUTION' | 'AVOID' = 'SAFE';
      let headline = 'Safe to consume based on your active health profile';
      let recommendation = 'This product meets your health requirements and fits your dietary limits.';
      let betterAlternativeHint: string | undefined = undefined;

      if (rawScore <= 4.5 || checks.some((c) => c.status === 'bad')) {
        verdict = 'AVOID';
        if (profile.condition === 'diabetes') {
          headline = 'NOT RECOMMENDED — High Glycemic / Sugar Spike Risk';
          recommendation = 'Avoid eating this regular item. The sugar or refined carbs will cause an acute insulin/blood glucose spike.';
          betterAlternativeHint = 'Look for whole-grain roasted millets, Greek yogurt, or sugar-free stevia snacks.';
        } else if (profile.condition === 'hypertension') {
          headline = 'NOT RECOMMENDED — Excessive Sodium Spikes Blood Pressure';
          recommendation = 'High sodium concentration puts unnecessary strain on cardiac health.';
          betterAlternativeHint = 'Choose unsalted roasted nuts, fresh seasonal fruit, or low-sodium crackers.';
        } else {
          headline = 'NOT RECOMMENDED for your dietary requirements';
          recommendation = 'Multiple critical ingredients violate your personalized health preferences.';
          betterAlternativeHint = 'Consider certified whole-food alternatives with zero added sugars.';
        }
      } else if (rawScore <= 7.0 || checks.some((c) => c.status === 'warn')) {
        verdict = 'CAUTION';
        headline = 'Consume in Strict Moderation';
        recommendation = 'Acceptable occasionally in small portions, but contains borderline levels of sugar or sodium.';
        betterAlternativeHint = 'Check serving size carefully before consuming the entire pack.';
      }

      return {
        verdict,
        score: rawScore,
        headline,
        condition: profile.condition,
        checks: checks.length > 0 ? checks : [
          {
            nutrient: 'Nutritional Balance',
            value: 'Standard',
            status: 'good',
            message: 'No immediate red-flag ingredients found against your profile criteria.',
          },
        ],
        recommendation,
        betterAlternativeHint,
      };
    },
  };
});
