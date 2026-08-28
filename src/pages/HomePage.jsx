import { useEffect } from "react";
import LandingNavbar from "@/features/landing/components/LandingNavbar";
import HeroSection from "@/features/landing/components/HeroSection";
import StatsRibbon from "@/features/landing/components/StatsRibbon";
import RoleSwitcherSection from "@/features/landing/components/RoleSwitcherSection";
import BentoFeaturesSection from "@/features/landing/components/BentoFeaturesSection";
import InteractiveExamPreview from "@/features/landing/components/InteractiveExamPreview";
import WorkflowSection from "@/features/landing/components/WorkflowSection";
import SecuritySection from "@/features/landing/components/SecuritySection";
import CtaSection from "@/features/landing/components/CtaSection";
import LandingFooter from "@/features/landing/components/LandingFooter";

export default function HomePage() {
  // Set page document title for SEO & clarity
  useEffect(() => {
    document.title = "EduTest | Precision Online Examination Suite for Students & Teachers";
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary/30 selection:text-primary overflow-x-hidden font-sans">
      {/* Floating Glass Navigation */}
      <LandingNavbar />

      {/* Main Landing Flow */}
      <main>
        {/* 1. Hero Section with Interactive Split-Preview */}
        <HeroSection />

        {/* 2. Platform Metrics & Authority Ribbon */}
        <StatsRibbon />

        {/* 3. Dual Persona Value Matrix (Teacher vs Student Switcher) */}
        <RoleSwitcherSection />

        {/* 4. Bento Grid: Core Capabilities */}
        <BentoFeaturesSection />

        {/* 5. Live Interactive Test-Drive Assessment */}
        {/* <InteractiveExamPreview /> */}

        {/* 6. 3-Step "How It Works" Workflow */}
        <WorkflowSection />

        {/* 7. Academic Integrity & Security Guarantee */}
        {/* <SecuritySection /> */}

        {/* 8. High-Impact Bottom Call to Action */}
        <CtaSection />
      </main>

      {/* Comprehensive Academic Footer */}
      <LandingFooter />
    </div>
  );
}
