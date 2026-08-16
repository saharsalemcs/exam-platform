import React from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import RoleFeaturesSection from "@/components/landing/RoleFeaturesSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import LandingFooter from "@/components/landing/LandingFooter";

function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary-glow selection:text-primary">
      {/* Top Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <HowItWorksSection />
        <RoleFeaturesSection />
        <FinalCTASection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}

export default HomePage;
