import React from 'react';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ManifestoStatementSection } from '../components/landing/ManifestoStatementSection';
import { TiltedPastelStatsSection } from '../components/landing/TiltedPastelStatsSection';
import { StepWorkflowSection } from '../components/landing/StepWorkflowSection';
import { ArchedPillCardsSection } from '../components/landing/ArchedPillCardsSection';
import { InteractiveTruthRadarSection } from '../components/landing/InteractiveTruthRadarSection';
import { TestimonialQuotesSection } from '../components/landing/TestimonialQuotesSection';
import { PillAccordionFaqSection } from '../components/landing/PillAccordionFaqSection';
import { PlayfulBottomBanner } from '../components/landing/PlayfulBottomBanner';
import { ModernSoftFooter } from '../components/landing/ModernSoftFooter';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF9] font-sans antialiased text-slate-900 selection:bg-amber-200 selection:text-slate-900">
      <LandingNavbar />
      <main className="flex-1">
        {/* 1. Hero with warm typography & hand-drawn doodle illustration */}
        <HeroSection />

        {/* 2. Big Bold Manifesto Statement with Highlighted Words & Scattered Doodles */}
        <ManifestoStatementSection />

        {/* 3. 4 playful tilted pastel stat cards matching reference */}
        <TiltedPastelStatsSection />

        {/* 4. How it works — 3 friendly steps with timeline graphic (#how-it-works) */}
        <StepWorkflowSection />

        {/* 5. 4 Arched cards with rich bespoke hand-drawn doodle illustrations */}
        <ArchedPillCardsSection />

        {/* 6. Live demo truth radar simulator */}
        <InteractiveTruthRadarSection />

        {/* 7. Pastel testimonial cards with avatars & star ratings */}
        <TestimonialQuotesSection />

        {/* 8. FAQ — rounded accordion with soft rose active highlight (#faq) */}
        <PillAccordionFaqSection />

        {/* 9. Dark rounded banner with joyful doodle character */}
        <PlayfulBottomBanner />
      </main>

      {/* 10. Warm, friendly footer */}
      <ModernSoftFooter />
    </div>
  );
};

export default AboutPage;
