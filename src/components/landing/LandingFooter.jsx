import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function LandingFooter() {
  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="py-12 border-t"
      style={{
        backgroundColor: "rgba(13, 17, 23, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.07)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(212, 175, 88, 0.12)",
                  border: "1px solid rgba(212, 175, 88, 0.3)",
                  color: "var(--color-primary)",
                }}
              >
                <GraduationCap size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--color-text)] font-display">
                Edu<span className="text-[var(--color-primary)]">Test</span>
              </span>
            </Link>
            <p className="text-xs text-[var(--color-text-muted)] max-w-sm">
              Modern tools for creating, delivering, and understanding online assessments.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[var(--color-text-muted)]">
            <button
              onClick={() => handleNavClick("features")}
              className="hover:text-[var(--color-text)] transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="hover:text-[var(--color-text)] transition-colors cursor-pointer"
            >
              How it works
            </button>
            <Link
              to="/login"
              className="hover:text-[var(--color-text)] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="hover:text-[var(--color-text)] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-[var(--color-text-faint)]">
          <p>© 2026 EduTest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
