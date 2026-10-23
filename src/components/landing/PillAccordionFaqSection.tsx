import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { DoodleSquiggle, DoodleSparkle } from '../doodles/DoodleIcons';

const FAQS = [
  {
    num: '01',
    question: 'How does SatyaDrishti detect misleading marketing claims?',
    answer:
      'SatyaDrishti reads packaging photos using multi-stage optical recognition, extracts front marketing slogans (e.g., "100% Real Honey"), and algorithmically cross-references them against the mandatory quantitative ingredient list and nutritional declaration table on the back panel under FSSAI and CCPA 2022 guidelines.',
  },
  {
    num: '02',
    question: 'Can brands take legal action if their product is flagged?',
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
  {
    num: '06',
    question: 'Is SatyaDrishti free for everyday consumers?',
    answer:
      'Yes! Everyday consumer scanning, barcode lookup, discrepancy detection, and health profile alerts are 100% free and open to all Indian citizens to ensure equitable food safety and consumer rights.',
  },
];

export const PillAccordionFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Decorative Doodles */}
      <div className="absolute top-12 left-10 hidden lg:block pointer-events-none">
        <DoodleSquiggle className="w-16 h-4" color="#F59E0B" />
      </div>
      <div className="absolute top-16 right-12 hidden lg:block pointer-events-none">
        <DoodleSparkle className="w-7 h-7" color="#EC4899" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Centered Header matching Image 2 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            Common Questions
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about packaging truth, health alerts, and consumer rights protection.
          </p>
        </div>

        {/* Rounded Accordion Cards matching Image 2 */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-[22px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-rose-50/60 border-rose-200/90 shadow-[0_4px_20px_rgba(244,63,94,0.06)]'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    <span
                      className={`text-xs sm:text-sm font-mono font-black shrink-0 px-2.5 py-1 rounded-full transition-colors ${
                        isOpen
                          ? 'bg-rose-200 text-rose-900'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {faq.num}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? 'bg-rose-500 text-white rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-rose-100/80 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PillAccordionFaqSection;
