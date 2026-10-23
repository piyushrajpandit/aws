import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const PillAccordionFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Default open second one matching the inspiration!

  const faqs = [
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
        'No. SatyaDrishti does not publish subjective opinions. We calculate pure, objective mathematical and statutory facts based on the brand\'s own printed packaging disclosures, comparing them directly against Section 36(1) of the Legal Metrology Act, 2009 and the Central Consumer Protection Authority (CCPA) Guidelines 2022.',
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

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAF9] dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight">
            FAQ
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-sans">
            Frequently asked questions about packaging truth and consumer rights
          </p>
        </div>

        {/* Pill-Shaped Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[1.75rem] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FFF1F2] dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-800/40 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 sm:py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 dark:text-slate-500">
                      {faq.num}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-bold font-display text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-rose-500 text-white rotate-180'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 sm:px-8 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-rose-200/60 dark:border-rose-900/40 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
