import React from 'react';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ManifestoStatementSection } from '../components/landing/ManifestoStatementSection';
import { TiltedPastelStatsSection } from '../components/landing/TiltedPastelStatsSection';
import { InteractiveTruthRadarSection } from '../components/landing/InteractiveTruthRadarSection';
import { StepWorkflowSection } from '../components/landing/StepWorkflowSection';
import { ArchedPillCardsSection } from '../components/landing/ArchedPillCardsSection';
import { TestimonialQuotesSection } from '../components/landing/TestimonialQuotesSection';
import { PillAccordionFaqSection } from '../components/landing/PillAccordionFaqSection';
import { PlayfulBottomBanner } from '../components/landing/PlayfulBottomBanner';
import { ModernSoftFooter } from '../components/landing/ModernSoftFooter';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      <LandingNavbar />
      <main className="flex-1">
        {/* 1. Full-viewport editorial hero with live scan mockup */}
        <HeroSection />

        {/* 2. Dark manifesto statement + high-density stats strip */}
        <ManifestoStatementSection />

        {/* 3. Platform metrics Bento grid (4-column hover-to-dark) */}
        <TiltedPastelStatsSection />

        {/* 4. Interactive truth radar / live scanner demo */}
        <InteractiveTruthRadarSection />

        {/* 5. How it works — industrial step navigator */}
        <StepWorkflowSection />

        {/* 6. Common traps 2x2 editorial Bento */}
        <ArchedPillCardsSection />

        {/* 7. Testimonials on dark editorial strip */}
        <TestimonialQuotesSection />

        {/* 8. FAQ — editorial two-column accordion */}
        <PillAccordionFaqSection />

        {/* 9. Dark editorial CTA banner */}
        <PlayfulBottomBanner />
      </main>

      {/* 10. Structured grid footer */}
      <ModernSoftFooter />
    </div>
  );
};

export default AboutPage;
