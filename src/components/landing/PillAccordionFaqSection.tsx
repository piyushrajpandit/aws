import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    num: '01',
    question: 'How does SatyaDrishti detect misleading marketing claims?',
    answer:
      'SatyaDrishti reads packaging photos using multi-stage optical recognition, extracts front marketing slogans (e.g. "100% Real Honey"), and algorithmically cross-references them against the mandatory quantitative ingredient list and nutritional declaration table on the back panel under FSSAI and CCPA 2022 guidelines.',
  },
  {
    num: '02',
    question: 'Can brands sue for defamation if their product is flagged?',
    answer:
      "No. SatyaDrishti does not publish subjective opinions. We calculate pure, objective mathematical and statutory facts based on the brand's own printed packaging disclosures, comparing them directly against Section 36(1) of the Legal Metrology Act, 2009 and the Central Consumer Protection Authority (CCPA) Guidelines 2022.",
  },
  {
    num: '03',
    question: 'What personalized health profiles can I customize?',
    answer:
      'You can toggle multiple active filters simultaneously: Gym & Fitness (macro protein density and palm oil fillers), Diabetic & Low GI (Maltodextrin, high-GI syrups), Celiac & Gluten-Free (wheat, maida, barley contamination), Nut Allergens, Dairy/Lactose, and Cardiac/High Sodium thresholds.',
  },
  {
    num: '04',
    question: 'How does the Shrinkflation radar work on quick-commerce apps?',
    answer:
      'Our catalog intelligence indexes historical barcode and packaging listings across Blinkit, Zepto, Swiggy Instamart, and Amazon India. When a brand retains the identical SKU and price tag but quietly drops net quantity (e.g., 250g down to 180g), our diff engine automatically logs the stealth price hike percentage.',
  },
  {
    num: '05',
    question: 'Is the generated evidence dossier legally recognized by DoCA?',
    answer:
      'Yes. The 1-click exported PDF complaint is formatted to the exact evidentiary specifications required by the National Consumer Helpline (NCH / consumerhelpline.gov.in) and the Department of Consumer Affairs, complete with timestamps, image crops, and statutory clause citations.',
  },
];

export const PillAccordionFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white border-t border-slate-900/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header bar */}
        <div className="flex items-center gap-4 py-6 border-b border-slate-900/8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.16em] font-mono text-slate-500">
              Frequently Asked Questions
            </span>
          </div>
          <div className="flex-1 h-px bg-slate-900/6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left label */}
          <div className="hidden lg:flex lg:col-span-4 lg:border-r border-slate-900/8 py-16 pr-12 flex-col justify-between">
            <div>
              <h2
                className="font-black text-slate-950 leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', letterSpacing: '-0.025em' }}
              >
                Consumer Rights & Platform Questions
              </h2>
              <p className="text-sm text-slate-500 font-sans leading-relaxed">
                Everything about packaging truth, health profiles, legal standing, and how we protect Indian consumers.
              </p>
            </div>
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-8 lg:pl-12 py-10 lg:py-16">
            <div className="divide-y divide-slate-900/8">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full py-6 flex items-start justify-between text-left gap-4 group"
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <span className="text-[11px] font-black font-mono text-slate-300 shrink-0 mt-0.5 group-hover:text-slate-400 transition-colors">
                          {faq.num}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-950 leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className={`w-6 h-6 shrink-0 flex items-center justify-center border transition-colors mt-0.5 ${
                          isOpen
                            ? 'bg-slate-950 border-slate-950 text-white'
                            : 'bg-transparent border-slate-300 text-slate-500 group-hover:border-slate-950 group-hover:text-slate-950'
                        }`}
                      >
                        {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pb-6 pl-9">
                        <p className="text-sm text-slate-500 leading-relaxed font-sans">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillAccordionFaqSection;
