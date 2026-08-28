import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X, ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data } = useUser();
  const profile = data?.profile;

  const getDashboardLink = () => {
    if (profile?.role === "teacher") return "/instructor/dashboard";
    if (profile?.role === "student") return "/student/dashboard";
    return "/login";
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6"
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-border px-4 py-2.5 sm:px-6 sm:py-3 shadow-xl backdrop-blur-xl transition-all duration-200"
        style={{
          backgroundColor: "rgba(17, 19, 24, 0.85)",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label="EduTest Home"
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-surface-2 text-primary transition-all duration-300 group-hover:border-primary group-hover:scale-105"
            style={{
              boxShadow: "0 0 16px rgba(212, 175, 88, 0.15)",
            }}
          >
            <GraduationCap strokeWidth={2.2} size={22} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-text">
                Edu<span className="text-primary">Test</span>
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary border border-primary/20">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-text-muted hidden sm:block -mt-0.5">
              Online Examination Suite
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-7 lg:flex">
          <a
            href="#features"
            className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150 cursor-pointer"
          >
            Features
          </a>
          <a
            href="#roles"
            className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150 cursor-pointer"
          >
            For Teachers & Students
          </a>
          {/* <a
            href="#live-demo"
            className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles size={14} className="text-primary" />
            Live Demo
          </a> */}
          <a
            href="#how-it-works"
            className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150 cursor-pointer"
          >
            How It Works
          </a>
          {/* <a
            href="#security"
            className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150 cursor-pointer"
          >
            Security
          </a> */}
        </div>

        {/* Right CTA Cluster */}
        <div className="hidden sm:flex items-center gap-3">
          {profile ? (
            <Link
              to={getDashboardLink()}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-bg transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] cursor-pointer"
            >
              <LayoutDashboard size={16} />
              <span>Go to Dashboard</span>
              <ArrowRight size={15} />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-text-muted hover:text-text hover:bg-surface-2/60 transition-all duration-150 cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="group relative flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-bg transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-text-muted hover:text-text lg:hidden cursor-pointer transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          className="mx-auto mt-2 max-w-7xl rounded-2xl border border-border bg-surface/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden animate-fade-scale"
          style={{ backgroundColor: "rgba(17, 19, 24, 0.98)" }}
        >
          <div className="flex flex-col gap-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted hover:bg-surface-2 hover:text-text transition-colors cursor-pointer"
            >
              Features
            </a>
            <a
              href="#roles"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted hover:bg-surface-2 hover:text-text transition-colors cursor-pointer"
            >
              For Teachers & Students
            </a>
            {/* <a
              href="#live-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted hover:bg-surface-2 hover:text-text transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={15} className="text-primary" />
              Live Interactive Demo
            </a> */}
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted hover:bg-surface-2 hover:text-text transition-colors cursor-pointer"
            >
              How It Works
            </a>
            {/* <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted hover:bg-surface-2 hover:text-text transition-colors cursor-pointer"
            >
              Security & Integrity
            </a> */}

            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {profile ? (
                <Link
                  to={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-bg"
                >
                  <LayoutDashboard size={16} />
                  <span>Go to Dashboard</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-text hover:bg-surface-2/80"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-bg"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight size={15} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
