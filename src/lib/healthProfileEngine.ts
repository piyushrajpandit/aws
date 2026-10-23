/**
 * SatyaDrishti Health & Safety Profile Engine
 *
 * Deterministic analysis engine that evaluates packaged product ingredients
 * and nutritional declarations against personalized consumer profiles:
 * - 🏋️ Gym / Fitness (Protein density, protein washing, palm oil, fillers)
 * - 🩺 Diabetic & Metabolic (Hidden sugars, high GI sweeteners, maltodextrin)
 * - ⚠️ Allergens (Gluten/Celiac, Peanuts/Tree Nuts, Lactose/Dairy, Soy)
 * - ❤️ Cardiac & Hypertension (High sodium, trans fats, saturated fat)
 * - 🌿 Clean Eating (Synthetic colors, artificial sweeteners, preservatives)
 *
 * Also provides the Front-vs-Back "Deceptive Claim Discrepancy" analyzer.
 */

export type HealthProfileId =
  | 'gym'
  | 'diabetic'
  | 'gluten_allergy'
  | 'nut_allergy'
  | 'lactose_intolerance'
  | 'hypertension'
  | 'clean_eating';

export interface HealthProfileDefinition {
  id: HealthProfileId;
  label: string;
  icon: string;
  badge: string;
  description: string;
  targetConcerns: string[];
}

export const HEALTH_PROFILES: HealthProfileDefinition[] = [
  {
    id: 'gym',
    label: 'Gym & Fitness',
    icon: '🏋️',
    badge: 'High Protein / Lean',
    description: 'Catches fake protein claims, amino spiking, hidden sugars, and palm oil filler fats.',
    targetConcerns: ['Protein Washing', 'Palm Oil Fillers', 'High Added Sugars'],
  },
  {
    id: 'diabetic',
    label: 'Diabetic / Low GI',
    icon: '🩺',
    badge: 'Blood Sugar Guard',
    description: 'Exposes hidden sugar aliases like Maltodextrin (GI 110) disguised as healthy carbs.',
    targetConcerns: ['Maltodextrin', 'Hidden Sugars', 'High Glycemic Fillers'],
  },
  {
    id: 'gluten_allergy',
    label: 'Celiac / Gluten-Free',
    icon: '🌾',
    badge: 'Zero Gluten',
    description: 'Guards against hidden wheat, maida, barley, and malt extract contamination.',
    targetConcerns: ['Wheat / Maida', 'Barley Malt', 'Cross-Contamination'],
  },
  {
    id: 'nut_allergy',
    label: 'Nut Allergy',
    icon: '🥜',
    badge: 'Severe Allergen',
    description: 'Alerts on peanuts, tree nuts, groundnut oil, and nut flavor compounds.',
    targetConcerns: ['Peanuts', 'Tree Nuts', 'Arachis Oil'],
  },
  {
    id: 'lactose_intolerance',
    label: 'Dairy / Lactose Intolerant',
    icon: '🥛',
    badge: 'Lactose Free',
    description: 'Detects hidden milk solids, whey protein, casein, and lactose binders.',
    targetConcerns: ['Milk Solids', 'Whey', 'Caseinate'],
  },
  {
    id: 'hypertension',
    label: 'Heart & Blood Pressure',
    icon: '❤️',
    badge: 'Low Sodium / Trans Fat',
    description: 'Flags dangerous sodium surges exceeding 20% of WHO daily limits, and trans fats.',
    targetConcerns: ['Excess Sodium', 'Trans Fats', 'Hydrogenated Oils'],
  },
  {
    id: 'clean_eating',
    label: 'Clean Eating / Safe for Kids',
    icon: '🌿',
    badge: 'No Junk / Synthetic',
    description: 'Flags banned synthetic colors (Tartrazine, Sunset Yellow) and artificial sweeteners.',
    targetConcerns: ['Synthetic Colors', 'Aspartame / Sucralose', 'TBHQ / BHA Preservatives'],
  },
];

export interface HealthAlert {
  id: string;
  profileId: HealthProfileId;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  explanation: string;
  matchedIngredientOrValue: string;
  scientificContext?: string;
  actionableAdvice: string;
}

export interface ClaimDiscrepancy {
  id: string;
  frontClaim: string;
  backReality: string;
  severity: 'critical' | 'warning';
  category: 'PROTEIN_WASHING' | 'SUGAR_TRAP' | 'INGREDIENT_SUBSTITUTION' | 'MISLEADING_NATURAL';
  evidenceSnippet: string;
  legalContext: string;
}

export interface HealthAuditResult {
  overallSafetyScore: number; // 0-100 (100 is completely safe/honest)
  activeProfiles: HealthProfileId[];
  alerts: HealthAlert[];
  discrepancies: ClaimDiscrepancy[];
  quickBadges: Array<{
    label: string;
    type: 'danger' | 'warning' | 'success';
    detail: string;
  }>;
}

// ─── KNOWLEDGE BASE: HIDDEN SUGAR ALIASES & GLYCEMIC INDEX ───────────────────
interface HiddenSugarItem {
  alias: string;
  glycemicIndex: number; // Pure glucose = 100
  note: string;
}

const HIDDEN_SUGAR_DICTIONARY: HiddenSugarItem[] = [
  { alias: 'maltodextrin', glycemicIndex: 110, note: 'Glycemic index of 110—spikes insulin faster than pure table sugar (GI 65)!' },
  { alias: 'invert sugar', glycemicIndex: 75, note: 'Hydrolyzed sucrose, easily absorbed high-fructose liquid syrup' },
  { alias: 'invert syrup', glycemicIndex: 75, note: 'Pre-converted sugar syrup used to extend shelf life and hide sweetness' },
  { alias: 'high fructose corn syrup', glycemicIndex: 73, note: 'Heavy hepatic metabolic load, triggers fat accumulation' },
  { alias: 'hfcs', glycemicIndex: 73, note: 'Concentrated industrial sweetener' },
  { alias: 'dextrose', glycemicIndex: 100, note: 'Chemically identical to pure glucose' },
  { alias: 'maltose', glycemicIndex: 105, note: 'Rapid-digesting disaccharide with extreme glycemic impact' },
  { alias: 'corn syrup solids', glycemicIndex: 90, note: 'Dehydrated glucose syrup' },
  { alias: 'malt extract', glycemicIndex: 85, note: 'Concentrated malt sugar often added to make baked goods look whole-grain' },
  { alias: 'liquid glucose', glycemicIndex: 100, note: 'Pure glucose syrup heavily used in confectionery' },
  { alias: 'maltitol', glycemicIndex: 52, note: 'Sugar alcohol with significant insulin spike, causes digestive gas/distress' },
  { alias: 'rice syrup', glycemicIndex: 98, note: 'High glycemic glucose-heavy syrup disguised as natural' },
  { alias: 'concentrated fruit juice', glycemicIndex: 70, note: 'Fibers stripped; acts biologically like liquid sugar' },
];

// ─── KNOWLEDGE BASE: ALLERGEN DERIVATIVES ─────────────────────────────────────
const GLUTEN_KEYWORDS = [
  'wheat', 'maida', 'atta', 'refined wheat flour', 'whole wheat flour',
  'barley', 'rye', 'spelt', 'semolina', 'suji', 'sooji', 'malt extract',
  'brewer\'s yeast', 'triticale', 'wheat gluten', 'vital wheat gluten'
];

const NUT_KEYWORDS = [
  'peanut', 'groundnut', 'arachis', 'almond', 'cashew', 'kaju', 'badam',
  'walnut', 'akhrot', 'pista', 'pistachio', 'hazelnut', 'macadamia', 'pecan',
  'brazil nut'
];

const DAIRY_KEYWORDS = [
  'milk', 'milk solids', 'whey', 'whey protein', 'casein', 'caseinate',
  'lactose', 'skimmed milk powder', 'smp', 'butter', 'ghee', 'cheese',
  'curd', 'yogurt', 'dairy cream'
];

const SOY_KEYWORDS = [
  'soy', 'soya', 'soy lecithin', 'soya lecithin', 'soy protein',
  'textured vegetable protein', 'tvp', 'edamame', 'tofu'
];

// ─── KNOWLEDGE BASE: HARMFUL ADDITIVES (CLEAN EATING) ────────────────────────
const HARMFUL_ADDITIVES = [
  { keyword: 'tartrazine', name: 'Tartrazine (INS 102)', issue: 'Azo dye linked to hyperactivity and asthma triggers in children' },
  { keyword: 'sunset yellow', name: 'Sunset Yellow (INS 110)', issue: 'Synthetic dye banned or restricted in several European nations' },
  { keyword: 'aspartame', name: 'Aspartame (INS 951)', issue: 'Artificial sweetener classified by WHO IARC as possibly carcinogenic (Group 2B)' },
  { keyword: 'sucralose', name: 'Sucralose (INS 955)', issue: 'Chlorinated artificial sweetener that can alter gut microbiome biodiversity' },
  { keyword: 'acesulfame', name: 'Acesulfame Potassium (INS 950)', issue: 'Intense artificial sweetener often paired with aspartame' },
  { keyword: 'tbhq', name: 'TBHQ (Tert-Butylhydroquinone / INS 319)', issue: 'Synthetic petroleum-derived antioxidant preservative' },
  { keyword: 'bha', name: 'BHA (INS 320)', issue: 'Synthetic antioxidant preservative under scrutiny for endocrine disruption' },
];

/**
 * Main evaluation function: Cross-checks product data against chosen profiles
 */
export function evaluateHealthAndClaims(
  ingredientsText: string,
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
  frontMarketingClaims: string[],
  activeProfiles: HealthProfileId[]
): HealthAuditResult {
  const alerts: HealthAlert[] = [];
  const discrepancies: ClaimDiscrepancy[] = [];
  const quickBadges: HealthAuditResult['quickBadges'] = [];

  const lowerIngredients = (ingredientsText || '').toLowerCase();

  // Helper numeric parsers
  const parseNum = (v?: number | string): number => {
    if (v === undefined || v === null) return 0;
    if (typeof v === 'number') return v;
    const clean = String(v).replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  };

  const proteinG = parseNum(nutritionalInfo.protein);
  const totalCalories = parseNum(nutritionalInfo.energyKcal);
  const addedSugarsG = parseNum(nutritionalInfo.addedSugars || nutritionalInfo.totalSugars);
  const totalFatG = parseNum(nutritionalInfo.totalFat);
  const saturatedFatG = parseNum(nutritionalInfo.saturatedFat);
  const sodiumMg = parseNum(nutritionalInfo.sodium);

  // ───────────────────────────────────────────────────────────────────────────
  // 1. DIABETIC / LOW GI PROFILE CHECKS
  // ───────────────────────────────────────────────────────────────────────────
  if (activeProfiles.includes('diabetic')) {
    const foundSugars: HiddenSugarItem[] = [];
    for (const sugar of HIDDEN_SUGAR_DICTIONARY) {
      if (lowerIngredients.includes(sugar.alias)) {
        foundSugars.push(sugar);
      }
    }

    if (foundSugars.length > 0) {
      const worstSugar = foundSugars.reduce((prev, curr) => (curr.glycemicIndex > prev.glycemicIndex ? curr : prev));
      alerts.push({
        id: 'diabetic-sugar-spike',
        profileId: 'diabetic',
        severity: worstSugar.glycemicIndex >= 90 ? 'critical' : 'warning',
        title: `🚨 Hidden Blood Sugar Trigger: ${worstSugar.alias.toUpperCase()}`,
        explanation: `Found "${worstSugar.alias}" in ingredients. ${worstSugar.note}`,
        matchedIngredientOrValue: foundSugars.map(s => `${s.alias} (GI: ${s.glycemicIndex})`).join(', '),
        scientificContext: 'Foods with Glycemic Index above 70 trigger sharp glucose spikes followed by rapid insulin crashes.',
        actionableAdvice: 'Avoid or treat with extreme caution if managing Type-1 or Type-2 diabetes or pre-diabetes.',
      });
      quickBadges.push({
        label: `Sugar Spike: ${worstSugar.alias}`,
        type: 'danger',
        detail: `GI ${worstSugar.glycemicIndex}`,
      });
    }

    if (addedSugarsG >= 15) {
      alerts.push({
        id: 'diabetic-high-sugar-load',
        profileId: 'diabetic',
        severity: 'critical',
        title: '⚠️ Heavy Sugar Load Detected',
        explanation: `Contains ${addedSugarsG}g sugar per 100g, exceeding 30% of standard diabetic daily safe thresholds.`,
        matchedIngredientOrValue: `${addedSugarsG}g Sugar`,
        actionableAdvice: 'Diabetic limit: under 5g of added sugar per serving.',
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 2. GYM / FITNESS PROFILE CHECKS
  // ───────────────────────────────────────────────────────────────────────────
  if (activeProfiles.includes('gym')) {
    // Protein to calorie ratio: 1g protein = 4 kcal
    if (totalCalories > 0) {
      const proteinCalories = proteinG * 4;
      const proteinPercentage = (proteinCalories / totalCalories) * 100;

      // Check if claims "High Protein" or "Protein Power"
      const claimsProtein = frontMarketingClaims.some(c =>
        /protein|fitness|active|muscle|energy|gym/i.test(c)
      ) || lowerIngredients.includes('protein');

      if (claimsProtein && proteinPercentage < 15) {
        alerts.push({
          id: 'gym-protein-washing',
          profileId: 'gym',
          severity: 'critical',
          title: '🏋️ Fake Fitness Claim: "Protein Washing"',
          explanation: `Only ${proteinPercentage.toFixed(1)}% of total calories come from protein (${proteinG}g protein in ${totalCalories} kcal). True fitness foods provide at least 25-40% protein calories.`,
          matchedIngredientOrValue: `${proteinG}g protein / ${totalCalories} kcal`,
          scientificContext: 'Brands slap "Protein" on high-carb snack bars where 80%+ of calories still come from palm oil and sugar.',
          actionableAdvice: 'Do not count this toward your daily workout macro targets—it is primarily an energy-dense snack.',
        });
        quickBadges.push({
          label: 'Low Protein Density',
          type: 'danger',
          detail: `${proteinPercentage.toFixed(0)}% protein kcal`,
        });
      }
    }

    // Palm Oil Detection
    if (lowerIngredients.includes('palm oil') || lowerIngredients.includes('palmolein') || lowerIngredients.includes('fractionated palm')) {
      alerts.push({
        id: 'gym-palm-oil-filler',
        profileId: 'gym',
        severity: 'warning',
        title: '⚠️ Palm Oil Filler Fat Detected',
        explanation: 'Contains Palm Oil / Palmolein, a cheap saturated fat high in palmitic acid, used to bulk up weight cheaply.',
        matchedIngredientOrValue: 'Palm Oil / Palmolein',
        actionableAdvice: 'Look for healthy lipid sources instead: Peanut butter, almonds, cold-pressed seed oils, or ghee.',
      });
      quickBadges.push({
        label: 'Palm Oil Filler',
        type: 'warning',
        detail: 'Saturated bulk fat',
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 3. GLUTEN & CELIAC ALLERGEN CHECKS
  // ───────────────────────────────────────────────────────────────────────────
  if (activeProfiles.includes('gluten_allergy')) {
    const foundGluten = GLUTEN_KEYWORDS.filter(k => lowerIngredients.includes(k));
    if (foundGluten.length > 0) {
      alerts.push({
        id: 'allergen-gluten',
        profileId: 'gluten_allergy',
        severity: 'critical',
        title: '🌾 GLUTEN DETECTED — Unsafe for Celiac',
        explanation: `Contains gluten-bearing ingredients: ${foundGluten.slice(0, 3).join(', ')}.`,
        matchedIngredientOrValue: foundGluten.join(', '),
        scientificContext: 'Even trace amounts of gliadin trigger autoimmune intestinal damage in celiac patients.',
        actionableAdvice: 'DO NOT CONSUME if diagnosed with Celiac disease or severe wheat intolerance.',
      });
      quickBadges.push({
        label: 'Contains Gluten',
        type: 'danger',
        detail: foundGluten[0],
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 4. NUT ALLERGEN CHECKS
  // ───────────────────────────────────────────────────────────────────────────
  if (activeProfiles.includes('nut_allergy')) {
    const foundNuts = NUT_KEYWORDS.filter(k => lowerIngredients.includes(k));
    if (foundNuts.length > 0) {
      alerts.push({
        id: 'allergen-nuts',
        profileId: 'nut_allergy',
        severity: 'critical',
        title: '🥜 PEANUT / TREE NUT ALLERGEN DETECTED',
        explanation: `Contains nut derivatives: ${foundNuts.join(', ')}.`,
        matchedIngredientOrValue: foundNuts.join(', '),
        scientificContext: 'Nut allergies can cause life-threatening anaphylactic reactions.',
        actionableAdvice: 'High anaphylaxis risk. Keep emergency epinephrine on hand if accidentally ingested.',
      });
      quickBadges.push({
        label: 'Contains Nuts',
        type: 'danger',
        detail: foundNuts[0],
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 5. DAIRY & LACTOSE CHECKS
  // ───────────────────────────────────────────────────────────────────────────
  if (activeProfiles.includes('lactose_intolerance')) {
    const foundDairy = DAIRY_KEYWORDS.filter(k => lowerIngredients.includes(k));
    if (foundDairy.length > 0) {
      alerts.push({
        id: 'allergen-dairy',
        profileId: 'lactose_intolerance',
        severity: 'warning',
        title: '🥛 Dairy / Lactose Detected',
        explanation: `Contains milk products: ${foundDairy.slice(0, 3).join(', ')}.`,
        matchedIngredientOrValue: foundDairy.join(', '),
        actionableAdvice: 'May cause lactose bloating, cramps, or allergic reaction.',
      });
      quickBadges.push({
        label: 'Contains Dairy',
        type: 'warning',
        detail: foundDairy[0],
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 6. HYPERTENSION & CARDIAC CHECKS
  // ───────────────────────────────────────────────────────────────────────────
  if (activeProfiles.includes('hypertension')) {
    if (sodiumMg > 500) {
      alerts.push({
        id: 'cardiac-high-sodium',
        profileId: 'hypertension',
        severity: sodiumMg > 800 ? 'critical' : 'warning',
        title: '❤️ Severe Sodium Spike Warning',
        explanation: `Contains ${sodiumMg}mg Sodium per 100g. Just one serving consumes ${(sodiumMg / 20).toFixed(0)}% of the WHO 2,000mg maximum daily salt ceiling!`,
        matchedIngredientOrValue: `${sodiumMg}mg Sodium`,
        scientificContext: 'Excess sodium forces arterial water retention, directly elevating systolic blood pressure.',
        actionableAdvice: 'Contraindicated for individuals taking antihypertensive medications or managing high BP.',
      });
      quickBadges.push({
        label: `High Sodium: ${sodiumMg}mg`,
        type: 'danger',
        detail: `${(sodiumMg / 20).toFixed(0)}% WHO limit`,
      });
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 7. CLEAN EATING / ADDITIVES CHECKS
  // ───────────────────────────────────────────────────────────────────────────
  if (activeProfiles.includes('clean_eating')) {
    for (const additive of HARMFUL_ADDITIVES) {
      if (lowerIngredients.includes(additive.keyword)) {
        alerts.push({
          id: `additive-${additive.keyword}`,
          profileId: 'clean_eating',
          severity: 'warning',
          title: `🌿 Synthetic Additive: ${additive.name}`,
          explanation: additive.issue,
          matchedIngredientOrValue: additive.name,
          actionableAdvice: 'Not recommended for clean eating, pregnant women, or young children.',
        });
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 8. FRONT-VS-BACK MARKETING DISCREPANCY DETECTOR
  // ───────────────────────────────────────────────────────────────────────────
  for (const claim of frontMarketingClaims) {
    const claimLower = claim.toLowerCase();

    // Discrepancy A: "Honey" Claim vs Invert Sugar
    if (claimLower.includes('honey') && (lowerIngredients.includes('invert sugar') || lowerIngredients.includes('sugar syrup'))) {
      discrepancies.push({
        id: 'disc-honey-sugar',
        frontClaim: claim,
        backReality: 'Honey is accompanied or dominated by cheap Invert Sugar / Liquid Glucose.',
        severity: 'critical',
        category: 'INGREDIENT_SUBSTITUTION',
        evidenceSnippet: 'Ingredients state: Invert Sugar Syrup, Glucose, Honey (<2%)',
        legalContext: 'Violates CCPA Misleading Advertisement Guidelines 2022 (Exaggerated Primary Ingredient).',
      });
    }

    // Discrepancy B: "Whole Wheat / Atta" Claim vs Maida dominance
    if ((claimLower.includes('whole wheat') || claimLower.includes('100% atta')) && lowerIngredients.includes('refined wheat flour')) {
      discrepancies.push({
        id: 'disc-atta-maida',
        frontClaim: claim,
        backReality: 'Contains Refined Wheat Flour (Maida) as the predominant flour ingredient.',
        severity: 'critical',
        category: 'MISLEADING_NATURAL',
        evidenceSnippet: 'First ingredient listed is: Refined Wheat Flour (Maida)',
        legalContext: 'Ingredients must be listed in descending order of weight (FSSAI Packaging Regulations).',
      });
    }

    // Discrepancy C: "No Added Sugar" with artificial high-GI sweeteners
    if (claimLower.includes('no added sugar') || claimLower.includes('zero sugar')) {
      const foundSubstitute = HIDDEN_SUGAR_DICTIONARY.find(s => lowerIngredients.includes(s.alias));
      if (foundSubstitute) {
        discrepancies.push({
          id: 'disc-zero-sugar-maltodextrin',
          frontClaim: claim,
          backReality: `Substituted with ${foundSubstitute.alias.toUpperCase()} (GI: ${foundSubstitute.glycemicIndex}), which spikes blood sugar more than cane sugar.`,
          severity: 'critical',
          category: 'SUGAR_TRAP',
          evidenceSnippet: `Contains: ${foundSubstitute.alias}`,
          legalContext: 'Technical loophole: Maltodextrin is classified as a complex carbohydrate, bypassing sugar declaration while behaving like glucose in blood.',
        });
      }
    }

    // Discrepancy D: "Real Fruit" / "Real Almonds" with minuscule percentages
    const fruitNutMatch = claimLower.match(/(real|almond|cashew|fruit|berry|strawberry|mango|pista)/i);
    if (fruitNutMatch) {
      // Check if ingredient specifies tiny percentage like "0.5%", "1%", "2%"
      const tinyPct = lowerIngredients.match(/(\d+(\.\d+)?)%/);
      if (tinyPct && parseFloat(tinyPct[1]) < 5) {
        discrepancies.push({
          id: 'disc-tiny-real-ingredient',
          frontClaim: claim,
          backReality: `The promoted premium ingredient only accounts for ${tinyPct[0]} of the total product!`,
          severity: 'warning',
          category: 'MISLEADING_NATURAL',
          evidenceSnippet: `Extracted: ${tinyPct[0]} actual content`,
          legalContext: 'FSSAI Consumer Protection: Front pictorial depiction requires prominent disclosure of actual characterising ingredient %.',
        });
      }
    }
  }

  // Calculate Overall Safety Score (starts at 100, drops per alert)
  let score = 100;
  for (const alert of alerts) {
    if (alert.severity === 'critical') score -= 25;
    else if (alert.severity === 'warning') score -= 12;
    else score -= 5;
  }
  for (const disc of discrepancies) {
    if (disc.severity === 'critical') score -= 20;
    else score -= 10;
  }
  score = Math.max(10, Math.min(100, score));

  return {
    overallSafetyScore: score,
    activeProfiles,
    alerts,
    discrepancies,
    quickBadges: quickBadges.slice(0, 4),
  };
}
