import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Camera, Search, ShieldCheck } from 'lucide-react';
import {
  DoodleSquiggle,
  DoodleSparkle,
  DoodleArrow,
} from '../doodles/DoodleIcons';

const STEPS = [
  {
    num: '1',
    title: 'Snap or Upload Product Packaging',
    description:
      'Photograph the front marketing claims and back nutrition panel of any grocery item, snack, or personal care bottle. Our multi-angle OCR instantly handles curved containers, glossy foils, and faint fonts.',
    badge: 'Step 01 • Optical Vision',
    icon: Camera,
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    accentColor: '#F59E0B',
  },
  {
    num: '2',
    title: 'AI Matches Marketing Against Ingredient Reality',
    description:
      'Our statutory rule engine cross-references front slogans (e.g., "Zero Sugar", "15g Protein") against quantitative back-panel disclosures under CCPA 2022 guidelines and FSSAI rules.',
    badge: 'Step 02 • Discrepancy Engine',
    icon: Search,
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    accentColor: '#F43F5E',
  },
  {
    num: '3',
    title: 'Instant Consumer Verdict & Health Protection',
    description:
      'Receive a transparent 0-100 compliance score, personalized health warnings (Maltodextrin spikes for diabetics, palm oil fillers for gym-goers), and 1-click evidence dossiers for DoCA complaints.',
    badge: 'Step 03 • Actionable Verdict',
    icon: ShieldCheck,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentColor: '#10B981',
  },
];

export const StepWorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#FAF9F5] relative overflow-hidden">
      {/* Decorative Doodles */}
      <div className="absolute top-16 right-16 hidden lg:block pointer-events-none">
        <DoodleSquiggle className="w-20 h-5" color="#F97316" />
      </div>
      <div className="absolute bottom-16 left-12 hidden lg:block pointer-events-none">
        <DoodleSparkle className="w-7 h-7" color="#8B5CF6" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Simple 3-Step Process
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            How SatyaDrishti works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From photo snap to legal compliance verdict in under 2 seconds. No legal background or chemistry degree required.
          </p>
        </div>

        {/* 3-Step Layout matching Image 2 specialist selection layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Step items */}
          <div className="lg:col-span-7 space-y-6">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 rounded-[24px] border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white border-amber-400 shadow-[0_12px_30px_rgba(0,0,0,0.06)] ring-2 ring-amber-400/20'
                      : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    {/* Step Number Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center font-black text-lg transition-colors ${
                        isActive
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {step.num}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                          {step.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${step.color}`}
                        >
                          {step.badge}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Launch Scanner CTA button */}
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/dashboard/scanner"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                Try Live Scanner Now
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <DoodleArrow className="w-8 h-6" color="#F97316" />
                <span>Try with any sample image</span>
              </div>
            </div>
          </div>

          {/* Right: Visual Graphic with organic pastel shapes and doodles */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm bg-white rounded-[32px] p-8 border border-slate-200/90 shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex flex-col items-center text-center">
              {/* Organic colorful backdrop */}
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-200 via-rose-200 to-emerald-200 p-1 mb-6 flex items-center justify-center relative">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-4">
                  {React.createElement(STEPS[activeStep].icon, {
                    className: 'w-16 h-16 text-slate-800 transition-all duration-300 transform',
                  })}
                </div>
                {/* Hand-drawn swirl around circle */}
                <svg
                  viewBox="0 0 160 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="75"
                    stroke={STEPS[activeStep].accentColor}
                    strokeWidth="3"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-slate-100 text-slate-800">
                Active Verification Engine
              </div>

              <h4 className="text-xl font-black text-slate-900 mb-2">
                {STEPS[activeStep].title}
              </h4>

              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Automated statutory analysis calibrated to the Legal Metrology Packaged Commodities Rules 2011.
              </p>

              {/* Mini scan stats */}
              <div className="w-full grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <div className="p-3 bg-[#FAF9F5] rounded-xl text-left">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Detection Speed</div>
                  <div className="text-base font-black text-slate-900">1.8s</div>
                </div>
                <div className="p-3 bg-[#FAF9F5] rounded-xl text-left">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</div>
                  <div className="text-base font-black text-emerald-600">98.4%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepWorkflowSection;
