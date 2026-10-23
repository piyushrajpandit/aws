import React from 'react';
import { Star } from 'lucide-react';
import { DoodleSquiggle, DoodleSparkle } from '../doodles/DoodleIcons';

const TESTIMONIALS = [
  {
    quote:
      'Thanks to SatyaDrishti, I discovered that the "Zero Sugar" digestive biscuits I gave my diabetic father were packed with Maltodextrin (Glycemic Index 110). It genuinely prevented severe glycemic spikes.',
    author: 'Pooja Iyer',
    role: 'Nutritionist & Mother',
    location: 'Bengaluru',
    bgColor: 'bg-[#EEF2FF]',
    borderColor: 'border-[#C7D2FE]',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
  },
  {
    quote:
      'I scan my protein supplements before buying. Uncovered a brand whose "24g Protein" label was calculated for a 3-scoop portion hidden behind a microscopic asterisk. Total game-changer.',
    author: 'Vikram Malhotra',
    role: 'Fitness Coach & Athlete',
    location: 'Mumbai',
    bgColor: 'bg-[#FDF2F8]',
    borderColor: 'border-[#FBCFE8]',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  },
  {
    quote:
      'We noticed our favourite almond brand silently reduced net weight from 250g to 180g on quick-commerce apps while keeping the exact same price. SatyaDrishti generated the consumer grievance in 1-click.',
    author: 'Ananya & Rohit Sen',
    role: 'Conscious Consumers',
    location: 'New Delhi',
    bgColor: 'bg-[#F0FDFA]',
    borderColor: 'border-[#99F6E4]',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
  },
];

export const TestimonialQuotesSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] relative overflow-hidden">
      {/* Decorative Doodles */}
      <div className="absolute top-12 right-12 hidden lg:block pointer-events-none">
        <DoodleSquiggle className="w-16 h-5" color="#EC4899" />
      </div>
      <div className="absolute bottom-12 left-14 hidden lg:block pointer-events-none">
        <DoodleSparkle className="w-7 h-7" color="#F59E0B" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header matching Image 2 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Verified Consumer Stories
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            We have already protected more than{' '}
            <span className="text-amber-600">50,000 shoppers</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real feedback from consumers, parents, and fitness enthusiasts across India.
          </p>
        </div>

        {/* 3 Pastel Testimonial Cards matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className={`${t.bgColor} ${t.borderColor} rounded-[28px] p-8 border shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                {/* Quotation mark */}
                <div className="text-4xl sm:text-5xl font-serif text-slate-400/80 leading-none mb-3 select-none">
                  “
                </div>

                {/* Quote body */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {t.quote}
                </p>
              </div>

              {/* Author info & stars */}
              <div className="pt-4 border-t border-slate-900/10 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {t.author}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {t.role} • {t.location}
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuotesSection;
