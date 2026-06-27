import { useUser } from "@/features/auth/hooks/useUser";
import { getInitials } from "@/lib/utils";
import { Bell, ChevronRight, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import AvatarMenu from "../shared/AvatarMenu";

const PAGE_META = {
  "/student/dashboard": { title: "Dashboard", breadcrumb: null },
  "/student/exams": { title: "Available Exams", breadcrumb: "Exams" },
  "/student/results": { title: "My Results", breadcrumb: "Results" },
  "/student/profile": { title: "Profile", breadcrumb: "Profile" },

  "/teacher/dashboard": { title: "Dashboard", breadcrumb: null },
  "/teacher/exams": { title: "Exam Management", breadcrumb: "Exams" },
  "/teacher/results": { title: "Result Monitoring", breadcrumb: "Results" },
  "/teacher/profile": { title: "Profile", breadcrumb: "Profile" },
};

function Header() {
  const { data } = useUser();
  const { pathname } = useLocation();

  const profile = data?.profile;
  const meta = PAGE_META[pathname];
  const title = meta?.title ?? "EduTest";

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center justify-between px-6"
      style={{
        backgroundColor: "var(--color-bg)",
        height: "var(--header-height)",
        left: "var(--sidebar-width)",
        borderBottom: "1px solid var(--color-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* ── Left: Title + breadcrumb  */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span
          className="hidden text-sm sm:inline"
          style={{ color: "var(--color-text-faint)" }}
        >
          EduTest
        </span>

        {meta?.breadcrumb && (
          <div className="hidden items-center gap-1.5 sm:flex sm:gap-2">
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
          </div>
        )}

        {meta?.breadcrumb && (
          <ChevronRight
            size={13}
            className="hidden sm:block"
            style={{ color: "var(--color-text-faint)" }}
          />
        )}

        <h1
          className="text-sm font-semibold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          {title}
        </h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] transition-all duration-150"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(212,175,88,0.2)";
            e.currentTarget.style.color = "var(--color-text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          <Bell size={15} />
          {/* Notification dot */}
          <span
            className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </button>

        {/* Divider */}
        <div
          className="mx-1 h-6 w-px"
          style={{ backgroundColor: "var(--color-border)" }}
        />

        {/* Avatar + name */}
        <AvatarMenu profile={profile} />
      </div>
    </header>
  );
}

export default Header;
