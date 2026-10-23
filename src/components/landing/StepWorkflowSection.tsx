import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';

const STEPS = [
  {
    index: '01',
    title: 'Spatial Label & Nutrition Extraction',
    description:
      'Multi-stage computer vision unwraps curved bottles and reflective pouches, extracting mandatory declaration fields, nutritional micro-tables, and MRP typographic measurements.',
    badge: 'Vision + OCR',
    highlight: 'Rule 8 Font Heights · Mandatory Fields · Spatial Layout',
    lawRef: 'Legal Metrology PCR, 2011 Rule 8',
    color: 'amber',
  },
  {
    index: '02',
    title: 'Deceptive Claim & Discrepancy Matching',
    description:
      'Cross-checks front marketing slogans against back quantitative ingredients to uncover sugar syrups posing as natural honey, or 80% maida in "whole wheat" snacks.',
    badge: 'CCPA 2022 Aligned',
    highlight: 'Front vs. Back Discrepancies · Asterisk Loophole Detection',
    lawRef: 'CCPA Misleading Ads Guidelines, 2022',
    color: 'rose',
  },
  {
    index: '03',
    title: 'Personalized Health & Risk Guardrails',
    description:
      'Filters every product against your personal lifestyle profile: flags Maltodextrin (GI 110) for diabetics, protein washing for gym-goers, and hidden gluten for celiac patients.',
    badge: 'Personalized Protection',
    highlight: 'Gym · Diabetic · Allergens · Pregnancy · Cardiac Risk',
    lawRef: 'FSSAI Labelling Regs, 2019',
    color: 'teal',
  },
];

const COLOR_MAP: Record<string, { accent: string; tag: string; check: string }> = {
  amber: { accent: 'bg-amber-400', tag: 'text-amber-600 bg-amber-50 border-amber-200', check: 'text-amber-600' },
  rose: { accent: 'bg-rose-500', tag: 'text-rose-600 bg-rose-50 border-rose-200', check: 'text-rose-600' },
  teal: { accent: 'bg-teal-500', tag: 'text-teal-600 bg-teal-50 border-teal-200', check: 'text-teal-600' },
};

export const StepWorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const active = STEPS[activeStep];
  const colors = COLOR_MAP[active.color];

  return (
    <section id="how-it-works" className="bg-white border-t border-slate-900/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header bar */}
        <div className="flex items-center gap-4 py-6 border-b border-slate-900/8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.16em] font-mono text-slate-500">
              How It Works
            </span>
          </div>
          <div className="flex-1 h-px bg-slate-900/6" />
          <Link
            to="/dashboard/scanner"
            className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400 hover:text-slate-950 flex items-center gap-1 transition-colors"
          >
            Try Live Scanner <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left rail: step navigation */}
          <div className="lg:col-span-5 lg:border-r border-slate-900/8 py-12 pr-0 lg:pr-12">
            <div className="space-y-0">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const stepColors = COLOR_MAP[step.color];
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-6 border-b border-slate-900/6 transition-all duration-200 group ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step index */}
                      <div
                        className={`text-sm font-black font-mono shrink-0 mt-0.5 transition-colors ${
                          isActive ? 'text-slate-400' : 'text-slate-300 group-hover:text-slate-500'
                        }`}
                      >
                        {step.index}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3
                            className={`text-sm font-black leading-tight transition-colors ${
                              isActive ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {step.title}
                          </h3>
                          {isActive && (
                            <div className={`w-2 h-2 ${stepColors.accent} shrink-0`} />
                          )}
                        </div>
                        <p
                          className={`text-[11px] font-mono transition-colors ${
                            isActive ? 'text-slate-400' : 'text-slate-400'
                          }`}
                        >
                          {step.badge}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: active step detail */}
          <div className="lg:col-span-7 lg:pl-12 py-12">
            {/* Large step index */}
            <div className="text-8xl font-black font-mono text-slate-100 leading-none mb-6 select-none">
              {active.index}
            </div>

            <h2
              className="font-black text-slate-950 leading-tight mb-5"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', letterSpacing: '-0.025em' }}
            >
              {active.title}
            </h2>

            <p className="text-sm text-slate-500 leading-relaxed mb-8 font-sans max-w-xl">
              {active.description}
            </p>

            {/* Capability tags */}
            <div className="mb-8">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">
                Detected Capabilities
              </div>
              <div className="flex flex-wrap gap-2">
                {active.highlight.split(' · ').map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] font-mono font-semibold px-3 py-1 border ${colors.tag}`}
                  >
                    <span className={`mr-1.5 ${colors.check}`}>✓</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Law reference */}
            <div className="bg-slate-50 border border-slate-200 p-4 flex items-start gap-3">
              <div className={`w-0.5 h-full self-stretch ${colors.accent} shrink-0`} />
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-slate-400 mb-0.5">
                  Legal Basis
                </div>
                <div className="text-[12px] font-semibold text-slate-700 font-mono">{active.lawRef}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepWorkflowSection;
