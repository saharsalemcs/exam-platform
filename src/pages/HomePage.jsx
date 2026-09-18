import { useEffect } from "react";
import LandingNavbar from "@/features/landing/components/LandingNavbar";
import HeroSection from "@/features/landing/components/HeroSection";
import RolesSection from "@/features/landing/components/RolesSection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import HowItWorksSection from "@/features/landing/components/HowItWorksSection";
import CtaSection from "@/features/landing/components/CtaSection";
import LandingFooter from "@/features/landing/components/LandingFooter";

const PAGE_TITLE = "EduTest | Online Exam Platform for Students & Teachers";

function HomePage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <LandingNavbar />

      <main>
        <HeroSection />
        <RolesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>

      <LandingFooter />
    </div>
  );
}

export default HomePage;
