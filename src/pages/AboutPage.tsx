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
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0B0F19] font-sans antialiased selection:bg-slate-900 selection:text-white">
      <LandingNavbar />
      <main className="flex-1">
        {/* 1. Giant Bold Hero with Organic Artwork & Pill Buttons */}
        <HeroSection />

        {/* 2. Big Bold Manifesto Statement with Highlighted Words & Scattered Doodles */}
        <ManifestoStatementSection />

        {/* 3. Tilted Soft Pastel Stats Cards (250k+, 98%, 2 sec, 100%) */}
        <TiltedPastelStatsSection />

        {/* 4. Interactive Live Truth Radar Simulator */}
        <InteractiveTruthRadarSection />

        {/* 5. 3-Step Protection Workflow with Numbered Badges & Circles */}
        <StepWorkflowSection />

        {/* 6. Arched Cards Grid Busting Packaging Deceptions */}
        <ArchedPillCardsSection />

        {/* 7. Soft Pastel Testimonial Quote Cards */}
        <TestimonialQuotesSection />

        {/* 8. Clean Rounded Pill Accordion FAQ */}
        <PillAccordionFaqSection />

        {/* 9. High-Contrast Playful Bottom Callout Banner */}
        <PlayfulBottomBanner />
      </main>
      {/* 10. Minimalist Modern Footer with Scroll-to-Top Button */}
      <ModernSoftFooter />
    </div>
  );
};

export default AboutPage;
