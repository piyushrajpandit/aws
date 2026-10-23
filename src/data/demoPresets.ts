/**
 * Iconic Real-World Presets for Hackathon Stage Demos
 *
 * Guaranteed to produce instant, verified wow-moments during live pitching:
 * 1. "Gym Bro Protein Trap" (Protein Cookie)
 * 2. "Diabetic Sugar Stealth" (Zero Sugar Digestive)
 * 3. "Quick-Commerce Shrinkflation & PCR Violation" (Nuts & Quick Snacks)
 */

import type { HealthProfileId } from '../lib/healthProfileEngine';

export interface DemoPresetProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  tagline: string;
  suggestedProfile: HealthProfileId[];
  frontClaims: string[];
  ingredientsText: string;
  nutritionalInfo: {
    servingSize: string;
    energyKcal: number;
    protein: number;
    carbohydrates: number;
    totalSugars: number;
    addedSugars: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    sodium: number;
  };
  mrp: string;
  unitSalePrice: string;
  netQuantity: string;
  shrinkflation: {
    detected: boolean;
    previousWeight: string;
    currentWeight: string;
    stealthPriceHikePercent: number;
    notes: string;
  };
  statutoryViolations: Array<{
    ruleCode: string;
    actName: string;
    description: string;
    severity: 'critical' | 'high' | 'medium';
  }>;
  stageNarrative: string;
}

export const DEMO_PRESETS: DemoPresetProduct[] = [
  {
    id: 'preset-gym-cookie',
    name: 'PowerPro Active Almond & Honey Protein Crunch',
    brand: 'FitBite Foods Ltd.',
    category: 'Fitness Nutrition / Baked Goods',
    tagline: 'Claims "High Protein & 100% Real Honey", but 82% of calories come from Maida and Palm Oil.',
    suggestedProfile: ['gym', 'nut_allergy', 'gluten_allergy'],
    frontClaims: [
      'HIGH PROTEIN (15g*)',
      '100% PURE KASHMIRI HONEY',
      'ENRICHED WITH REAL ALMONDS',
      'ZERO CHOLESTEROL',
    ],
    ingredientsText:
      'Refined Wheat Flour (Maida) 42%, Edible Vegetable Oil (Palmolein / Palm Oil) 24%, Invert Sugar Syrup 18%, Soy Protein Isolate 4.2%, Almond Flakes 0.8%, Honey 0.5%, Maltodextrin, Emulsifier (INS 322 - Soy Lecithin), Raising Agents (INS 500ii), Synthetic Vanilla Flavour.',
    nutritionalInfo: {
      servingSize: '100g (Pack contains 3 cookies)',
      energyKcal: 495,
      protein: 5.2, // Only 5.2g per 100g! (The "15g*" on front is an asterisk trick for whole box)
      carbohydrates: 62.0,
      totalSugars: 24.5,
      addedSugars: 22.0,
      totalFat: 24.8,
      saturatedFat: 12.4,
      transFat: 0.1,
      sodium: 420,
    },
    mrp: '₹99.00',
    unitSalePrice: '₹0.99 / g',
    netQuantity: '100 g',
    shrinkflation: {
      detected: true,
      previousWeight: '125 g',
      currentWeight: '100 g',
      stealthPriceHikePercent: 25.0,
      notes: 'Packaging box dimensions stayed 18x12cm, but inner tray thickness increased to hide 20% volume drop.',
    },
    statutoryViolations: [
      {
        ruleCode: 'Rule 8(1)',
        actName: 'Legal Metrology (Packaged Commodities) Rules, 2011',
        description: 'Mandatory Unit Sale Price font height is 1.2mm, below statutory minimum 3.0mm for 100g packaging area.',
        severity: 'high',
      },
      {
        ruleCode: 'CCPA Sec 2(28)',
        actName: 'Consumer Protection Act, 2019',
        description: 'Misleading Claim: Asterisk on "15g Protein*" references total pack weight rather than standard serving.',
        severity: 'critical',
      },
    ],
    stageNarrative:
      'Watch this: Front screams "HIGH PROTEIN & REAL HONEY". SatyaDrishti checks the back: Honey is only 0.5%, Almonds are 0.8%, and protein is just 5.2g per 100g. It is 66% sugar and palm oil!',
  },
  {
    id: 'preset-diabetic-digestive',
    name: 'SugarLite GlucoDefend 100% Whole Grain Biscuits',
    brand: 'NutriCare Life',
    category: 'Diabetic & Low GI Nutrition',
    tagline: 'Claims "Zero Added Sugar & Diabetic Friendly", secretly loads Maltodextrin with Glycemic Index 110.',
    suggestedProfile: ['diabetic', 'gluten_allergy', 'clean_eating'],
    frontClaims: [
      'ZERO ADDED CANE SUGAR',
      '100% WHOLE GRAIN ATTA',
      'DIABETIC SAFE & LOW GI',
      'DOCTOR RECOMMENDED FIBER',
    ],
    ingredientsText:
      'Refined Wheat Flour (Maida) 36%, Whole Wheat Flour (Atta) 18%, Maltodextrin (15%), Edible Vegetable Oil (Hydrogenated Palm Kernel Oil), Polydextrose Fiber, Maltitol (INS 965), Inulin, Salt, Raising Agent (INS 503ii), Artificial Sweetener (Sucralose - INS 955 0.05%), Preservative (TBHQ - INS 319).',
    nutritionalInfo: {
      servingSize: '100g',
      energyKcal: 440,
      protein: 7.1,
      carbohydrates: 68.0,
      totalSugars: 2.1,
      addedSugars: 0.0, // Technically 0 cane sugar!
      totalFat: 16.5,
      saturatedFat: 8.2,
      transFat: 0.2,
      sodium: 580,
    },
    mrp: '₹75.00',
    unitSalePrice: 'Missing',
    netQuantity: '150 g',
    shrinkflation: {
      detected: false,
      previousWeight: '150 g',
      currentWeight: '150 g',
      stealthPriceHikePercent: 0,
      notes: 'Standard weight retained, but cheaper hydrogenated oils substituted for butter.',
    },
    statutoryViolations: [
      {
        ruleCode: 'Rule 6(1)(e)',
        actName: 'Legal Metrology (Packaged Commodities) Amendment Rules, 2021',
        description: 'Complete absence of Unit Sale Price (USP) declaration on primary display panel.',
        severity: 'critical',
      },
      {
        ruleCode: 'FSSAI Packaging Reg 2.4.4',
        actName: 'Food Safety and Standards (Packaging and Labelling) Regulations',
        description: 'Contains artificial sweetener Sucralose; lacks statutory box warning "NOT RECOMMENDED FOR CHILDREN".',
        severity: 'high',
      },
    ],
    stageNarrative:
      'A diabetic buys this thinking it has "Zero Sugar". But SatyaDrishti flags Maltodextrin: GI 110. It literally spikes blood glucose higher than pure white table sugar!',
  },
  {
    id: 'preset-shrinkflation-cashew',
    name: 'NatureValley Royal Whole Roasted Jumbo Cashews',
    brand: 'Golden Harvest Agro',
    category: 'Dry Fruits & E-Commerce Quick Comm',
    tagline: 'Quietly dropped weight from 250g to 180g (+38% stealth price hike) on Blinkit/Zepto with missing USP.',
    suggestedProfile: ['nut_allergy', 'hypertension'],
    frontClaims: [
      '100% ROYAL JUMBO WHOLE CASHEWS',
      'SUPER SAVER MEGA PACK',
      'LIGHTLY SALTED & CRISPY',
      'RICH IN ANTIOXIDANTS',
    ],
    ingredientsText:
      'Cashew Nuts (Kaju) 96%, Edible Common Salt, Palmolein Oil (Roasting Glaze), Antioxidant (INS 320 - BHA).',
    nutritionalInfo: {
      servingSize: '100g',
      energyKcal: 582,
      protein: 18.2,
      carbohydrates: 30.1,
      totalSugars: 5.9,
      addedSugars: 0.0,
      totalFat: 43.8,
      saturatedFat: 7.8,
      transFat: 0.0,
      sodium: 980, // Heavy salt for hypertension!
    },
    mrp: '₹349.00',
    unitSalePrice: '₹1.94 / g',
    netQuantity: '180 g',
    shrinkflation: {
      detected: true,
      previousWeight: '250 g',
      currentWeight: '180 g',
      stealthPriceHikePercent: 38.8,
      notes: 'Historical catalog scrape confirmed 250g pack sold at ₹349 in May 2026. Pack size was reduced to 180g while retaining identical MRP.',
    },
    statutoryViolations: [
      {
        ruleCode: 'Rule 6(1)(ab)',
        actName: 'Legal Metrology (Packaged Commodities) Rules, 2011',
        description: 'Manufacturer / Packer complete geographic address missing state and 6-digit PIN code.',
        severity: 'high',
      },
    ],
    stageNarrative:
      'Look at this: Same bag, same ₹349 price tag. But the net quantity dropped from 250g to 180g. That is a 38% silent price hike that no shopper noticed!',
  },
];
