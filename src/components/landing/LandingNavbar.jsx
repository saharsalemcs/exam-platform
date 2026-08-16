import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Menu, X, LayoutDashboard, ArrowRight } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";
import { ROLES } from "@/utils/constants";
import Button from "@/components/shared/Button";

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  const user = data?.user;
  const profile = data?.profile;

  const dashboardPath =
    profile?.role === ROLES.TEACHER
      ? "/instructor/dashboard"
      : "/student/dashboard";

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(13, 17, 23, 0.8)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[#0d1117]"
            style={{
              backgroundColor: "rgba(212, 175, 88, 0.12)",
              border: "1px solid rgba(212, 175, 88, 0.3)",
              color: "var(--color-primary)",
            }}
          >
            <GraduationCap size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--color-text)] font-display">
            Edu<span className="text-[var(--color-primary)]">Test</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick("features")}
            className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("how-it-works")}
            className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          >
            How it works
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoading && user ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(dashboardPath)}
              className="gap-2"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </Button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium px-4 py-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/register")}
                className="gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-4 pt-3 pb-6 border-b border-white/10 backdrop-blur-xl animate-fade-scale"
          style={{ backgroundColor: "rgba(17, 19, 24, 0.98)" }}
        >
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleNavClick("features")}
              className="text-left text-sm font-medium py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="text-left text-sm font-medium py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              How it works
            </button>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              {!isLoading && user ? (
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(dashboardPath);
                  }}
                  className="gap-2"
                >
                  <LayoutDashboard size={16} />
                  <span>Go to Dashboard</span>
                </Button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center text-sm font-medium py-2.5 rounded-md border border-[var(--color-border)] text-[var(--color-text)] hover:bg-white/5"
                  >
                    Sign In
                  </Link>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/register");
                    }}
                    className="gap-1.5"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={15} />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
