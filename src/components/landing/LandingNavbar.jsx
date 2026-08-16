import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
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
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-bg">
            <GraduationCap size={20} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-text">
            Edu<span className="text-primary">Test</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => handleNavClick("how-it-works")}
            className="cursor-pointer text-sm font-medium text-text-muted transition-colors hover:text-text"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick("features")}
            className="cursor-pointer text-sm font-medium text-text-muted transition-colors hover:text-text"
          >
            Features
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
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
                className="rounded-md px-4 py-2 text-sm font-medium text-text-muted transition-all hover:bg-white/5 hover:text-text"
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
          className="cursor-pointer rounded-md p-2 text-text-muted transition-colors hover:bg-white/5 hover:text-text md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="animate-fade-scale border-b border-white/10 bg-surface/98 px-4 pt-3 pb-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleNavClick("features")}
              className="py-2 text-left text-sm font-medium text-text-muted hover:text-text"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="py-2 text-left text-sm font-medium text-text-muted hover:text-text"
            >
              How it works
            </button>

            <div className="flex flex-col gap-2.5 border-t border-white/10 pt-3">
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
                    className="w-full rounded-md border border-border py-2.5 text-center text-sm font-medium text-text hover:bg-white/5"
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
