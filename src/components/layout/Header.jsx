import { useUser } from "@/features/auth/hooks/useUser";
import { ChevronRight, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import AvatarMenu from "../shared/AvatarMenu";

const PAGE_META = {
  "/student/dashboard": { title: "Dashboard", breadcrumb: null },
  "/student/exams": { title: "Available Exams", breadcrumb: "Exams" },
  "/student/exams-history": { title: "Exams History", breadcrumb: "Exams" },
  "/student/results": { title: "My Results", breadcrumb: "Results" },
  "/student/profile": { title: "Profile", breadcrumb: "Profile" },

  "/instructor/dashboard": { title: "Dashboard", breadcrumb: null },
  "/instructor/exam-wizard": {
    title: "Exam Wizard",
    breadcrumb: "Exam",
  },
  "/instructor/exams-management": {
    title: "Exam Management",
    breadcrumb: "Exams",
  },
  "/instructor/exams-history": { title: "Exams History", breadcrumb: "Exams" },
  "/instructor/students": { title: "Students List", breadcrumb: "Students" },
  "/instructor/results": { title: "Result Monitoring", breadcrumb: "Results" },
  "/instructor/profile": { title: "Profile", breadcrumb: "Profile" },
};

function Header({ sidebarWidth, onMenuClick }) {
  const { data } = useUser();
  const { pathname } = useLocation();

  const profile = data?.profile;
  const meta = PAGE_META[pathname];
  const title = meta?.title ?? "EduTest";

  return (
    <header
      className="fixed top-0 right-0 z-30 flex h-16 items-center justify-between px-4 transition-all duration-300 sm:px-6"
      style={{
        backgroundColor: "var(--color-bg)",
        // height: "var(--header-height)",
        left: sidebarWidth,
        borderBottom: "1px solid var(--color-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* ── Left: Title + breadcrumb  */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="flex cursor-pointer items-center justify-center rounded-sm p-2 transition-all duration-150 md:hidden"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          <Menu size={16} />
        </button>
        {/* Breadcrumb — hidden on mobile */}
        <div className="hidden items-center gap-1.5 sm:flex">
          <span
            className="text-sm"
            style={{ color: "var(--color-text-faint)" }}
          >
            EduTest
          </span>

          {meta?.breadcrumb && (
            <>
              <ChevronRight
                size={13}
                style={{ color: "var(--color-text-faint)" }}
              />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {meta.breadcrumb}
              </span>
            </>
          )}

          <ChevronRight
            size={13}
            style={{ color: "var(--color-text-faint)" }}
          />
        </div>

        {/* Page title */}
        <h1
          className="text-sm font-semibold"
          style={{ color: "var(--color-text-muted)" }}
        >
          {title}
        </h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Avatar + name */}
        <AvatarMenu profile={profile} />
      </div>
    </header>
  );
}

export default Header;
