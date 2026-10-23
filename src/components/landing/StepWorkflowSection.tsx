import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Sparkles, Flame, Check } from 'lucide-react';

export const StepWorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Spatial Label & Nutrition Extraction',
      description:
        'Multi-stage computer vision unwraps curved bottles and reflective pouches, extracting mandatory declaration fields and nutritional micro-tables.',
      badge: 'Vision & OCR',
      highlight: 'Rule 8 Font Heights',
    },
    {
      num: '02',
      title: 'Deceptive Claim & Discrepancy Matching',
      description:
        'Cross-checks front marketing slogans against back quantitative ingredients to uncover sugar syrups posing as natural honey, or 80% maida in "whole wheat" snacks.',
      badge: 'CCPA 2022 Aligned',
      highlight: 'Front vs. Back Discrepancies',
    },
    {
      num: '03',
      title: 'Personalized Health & Risk Guardrails',
      description:
        'Filters every product against your personal lifestyle: flags Maltodextrin (GI 110) for diabetics, protein washing for gym-goers, and hidden gluten for celiac patients.',
      badge: 'Personalized Protection',
      highlight: 'Gym • Diabetic • Allergens',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#070B13] border-b border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight mb-4">
            How SatyaDrishti Protects You
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Carrying out rigorous automated inspection so Indian families can trust the products in their shopping baskets.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Interactive Step Indicator */}
          <div className="lg:col-span-7 space-y-6">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#F8FAFC] dark:bg-slate-900/90 border-slate-900/20 dark:border-slate-700 shadow-md ring-1 ring-slate-900/5'
                      : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-lg sm:text-xl font-mono font-bold px-3 py-1 rounded-xl transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {step.num}
                    </span>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-lg sm:text-xl font-bold font-display ${
                            isActive
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {step.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {step.description}
                      </p>

                      {isActive && (
                        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{step.highlight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Graphic Card with Playful Arc Graphics & Illustration */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Soft decorative background circles */}
            <div className="w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-tr from-teal-100 via-sky-100 to-amber-100 dark:from-slate-800 dark:to-slate-900 p-6 flex items-center justify-center relative shadow-xl">
              {/* Circular Center Emblem */}
              <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-700 bg-white dark:bg-slate-900 p-8 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-9 h-9 stroke-[2.2]" />
                </div>
                <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white mb-1">
                  Verified Trust
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  Protecting 1.4B Indian consumers from retail dark patterns
                </p>

                {/* Floating Micro Badge */}
                <div className="absolute top-4 right-4 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300/60 dark:border-emerald-800">
                  100% Law Grounded
                </div>
              </div>

              {/* Floating Pill Accent Graphic */}
              <div className="absolute -bottom-3 -left-3 bg-white dark:bg-slate-800 px-3.5 py-1.5 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Evidence-Grade SCN Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
