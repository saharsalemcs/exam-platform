import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, Heart } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-surface-2/40 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border">
          {/* Brand & Summary (2 cols) */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-surface text-primary"
                style={{ boxShadow: "0 0 16px rgba(212, 175, 88, 0.15)" }}
              >
                <GraduationCap strokeWidth={2.2} size={22} />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-text">
                Edu<span className="text-primary">Test</span>
              </span>
            </Link>

            <p className="mt-4 text-xs sm:text-sm text-text-muted leading-relaxed">
              The modern online examination platform for schools, universities, and educators.
              Delivering secure, adaptive, and stress-free testing environments.
            </p>

            {/* Live System Status Pill */}
            {/* <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span>All Systems Operational (99.99% Uptime)</span>
            </div> */}
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text mb-4 font-mono">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#features" className="text-text-muted hover:text-primary transition-colors">
                  Adaptive Exam Builder
                </a>
              </li>
              {/* <li>
                <a href="#live-demo" className="text-text-muted hover:text-primary transition-colors">
                  Interactive Test Demo
                </a>
              </li> */}
              <li>
                <a href="#how-it-works" className="text-text-muted hover:text-primary transition-colors">
                  Automated Grading
                </a>
              </li>
              <li>
                <a href="#security" className="text-text-muted hover:text-primary transition-colors">
                  Session Auto-Save
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text mb-4 font-mono">
              Portals
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/login" className="text-text-muted hover:text-primary transition-colors">
                  Instructor Dashboard
                </Link>
              </li>
              {/* <li>
                <Link to="/login" className="text-text-muted hover:text-primary transition-colors">
                  Student Examination Room
                </Link>
              </li> */}
              <li>
                <Link to="/register" className="text-text-muted hover:text-primary transition-colors">
                  Create Free Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-text-muted hover:text-primary transition-colors">
                  Sign In to Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text mb-4 font-mono">
              Trust & Integrity
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#security" className="text-text-muted hover:text-primary transition-colors">
                  Session Tokenization
                </a>
              </li>
              {/* <li>
                <a href="#security" className="text-text-muted hover:text-primary transition-colors">
                  Data Encryption
                </a>
              </li> */}
              <li>
                <span className="text-text-muted">Single-Attempt Rules</span>
              </li>
              <li>
                <span className="text-text-muted">Academic Fair Play</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-faint">
          <div>
            © {new Date().getFullYear()} EduTest Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed for precision & academic excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
