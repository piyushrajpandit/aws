import React from 'react';

const TESTIMONIALS = [
  {
    quote:
      'Thanks to SatyaDrishti, I discovered that the "Zero Sugar" digestive biscuits I gave my diabetic mother were loaded with Maltodextrin (GI 110). It genuinely prevented severe glucose spikes.',
    author: 'Dr. Meera N.',
    role: 'Endocrinologist & Caregiver',
    location: 'New Delhi',
    tag: 'Diabetic Safety',
    tagColor: 'text-teal-700 bg-teal-50 border-teal-200',
    index: 'T01',
  },
  {
    quote:
      'As an athlete, finding out that a "15g Protein" cookie bar had an asterisk referencing the entire multi-pack rather than a single bar was eye-opening. SatyaDrishti keeps brands honest.',
    author: 'Rohan Mehta',
    role: 'Marathon Runner & Fitness Coach',
    location: 'Bengaluru',
    tag: 'Gym & Fitness',
    tagColor: 'text-rose-700 bg-rose-50 border-rose-200',
    index: 'T02',
  },
  {
    quote:
      'In field inspections, generating a tamper-evident evidence dossier with Section 36(1) gazette citations in 30 seconds has completely transformed our regulatory audit workflow.',
    author: 'K. Suresh Kumar',
    role: 'Senior Enforcement Officer',
    location: 'Legal Metrology Dept.',
    tag: 'Statutory Grade',
    tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
    index: 'T03',
  },
];

export const TestimonialQuotesSection: React.FC = () => {
  return (
    <section className="bg-slate-950 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header bar */}
        <div className="flex items-center gap-4 py-6 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.16em] font-mono text-slate-500">
              Verified Experiences — 50k+ Citizens & Regulators
            </span>
          </div>
          <div className="flex-1 h-px bg-white/6" />
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-white/6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="py-12 px-8 first:pl-0 last:pr-0 relative group">
              {/* Index */}
              <div className="text-[10px] font-black font-mono text-slate-700 uppercase tracking-[0.1em] mb-6">
                {t.index}
              </div>

              {/* Opening quote mark */}
              <div className="text-4xl font-black text-slate-700 leading-none mb-4 font-mono select-none">"</div>

              <blockquote className="text-sm text-slate-300 leading-relaxed font-sans mb-8">
                {t.quote}
              </blockquote>

              {/* Author */}
              <div className="pt-6 border-t border-white/8">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[12px] font-black text-white mb-0.5">{t.author}</div>
                    <div className="text-[11px] text-slate-500 font-sans">
                      {t.role} · {t.location}
                    </div>
                  </div>
                  <span className={`text-[9px] font-black font-mono uppercase tracking-[0.1em] px-2 py-1 border shrink-0 ${t.tagColor}`}>
                    {t.tag}
                  </span>
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
