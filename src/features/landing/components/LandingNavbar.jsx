import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import Button from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "../constants/landingContent";
import { useLandingCta } from "../hooks/useLandingCta";
import { scrollToSection } from "../helpers/scrollToSection";

function LandingNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, primaryTo, primaryLabel } = useLandingCta();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAnchorClick(event, href) {
    setIsMenuOpen(false);
    scrollToSection(event, href);
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-300 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="EduTest home"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-primary"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <GraduationCap strokeWidth={2.5} size={22} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-primary">
            EduTest
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Page sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="rounded-sm px-3 py-2 text-sm font-semibold text-text-muted transition-colors duration-150 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {!isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          )}
          <Button size="sm" onClick={() => navigate(primaryTo)}>
            {isAuthenticated ? primaryLabel : "Get started"}
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="landing-mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex cursor-pointer items-center justify-center rounded-sm border border-border bg-surface p-2 text-text-muted transition-colors duration-150 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile panel */}
      {isMenuOpen && (
        <div
          id="landing-mobile-menu"
          className="animate-fade-up border-t border-border bg-surface px-4 pt-3 pb-5 sm:px-6 md:hidden"
        >
          <nav aria-label="Page sections">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="block rounded-sm px-2 py-3 text-sm font-semibold text-text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
            {!isAuthenticated && (
              <Button
                variant="secondary"
                fullWidth
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            )}
            <Button fullWidth onClick={() => navigate(primaryTo)}>
              {primaryLabel}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default LandingNavbar;
