import React from 'react';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { LandingFooter } from '../components/layout/LandingFooter';
import { HeroSection } from '../components/landing/HeroSection';
import { InteractiveTruthRadarSection } from '../components/landing/InteractiveTruthRadarSection';
import { TrustedByRegulators } from '../components/landing/TrustedByRegulators';
import { StatsCounterSection } from '../components/landing/StatsCounterSection';
import { CoreCapabilitiesSection } from '../components/landing/CoreCapabilitiesSection';
import { WorkflowTimelineSection } from '../components/landing/WorkflowTimelineSection';
import { BentoFeaturesGrid } from '../components/landing/BentoFeaturesGrid';
import { CtaBannerSection } from '../components/landing/CtaBannerSection';
import { TechJourneyBanner } from '../components/about/TechJourneyBanner';

export const AboutPage: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <InteractiveTruthRadarSection />
        <TechJourneyBanner />
        <TrustedByRegulators />
        <StatsCounterSection />
        <CoreCapabilitiesSection />
        <WorkflowTimelineSection />
        <BentoFeaturesGrid />
        <CtaBannerSection />
      </main>
      <LandingFooter />

    </div>
  );
};
