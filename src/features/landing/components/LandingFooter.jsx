import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { NAV_LINKS } from "../constants/landingContent";
import { scrollToSection } from "../helpers/scrollToSection";

const ACCOUNT_LINKS = [
  { label: "Sign in", to: "/login" },
  { label: "Create an account", to: "/register" },
  { label: "Forgot password", to: "/forgot-password" },
];

function LandingFooter() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-300 flex-col gap-8 sm:flex-row sm:justify-between">
        {/* Brand */}
        <div className="max-w-80">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-primary">
              <GraduationCap strokeWidth={2.5} size={19} />
            </span>
            <span className="font-display text-base font-bold tracking-tight text-primary">
              EduTest
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            An online examination platform for students and teachers — exam
            creation, timed sessions, scoring and results in one place.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12 sm:gap-16">
          <nav aria-labelledby="footer-explore">
            <h2
              id="footer-explore"
              className="mb-3 text-[11px] font-semibold tracking-widest text-text-muted uppercase"
            >
              Explore
            </h2>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-sm text-text-muted transition-colors duration-150 hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-account">
            <h2
              id="footer-account"
              className="mb-3 text-[11px] font-semibold tracking-widest text-text-muted uppercase"
            >
              Account
            </h2>
            <ul className="flex flex-col gap-2">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-muted transition-colors duration-150 hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-300 border-t border-border pt-6">
        <p className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} EduTest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default LandingFooter;
