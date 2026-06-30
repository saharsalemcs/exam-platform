import { ROLES } from "@/constants/roles";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useUser } from "@/features/auth/hooks/useUser";
import { getInitials } from "@/lib/utils";
import {
  BarChart2,
  BookOpen,
  CircleUser,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  X,
} from "lucide-react";
import NavItem from "../shared/NavItem";

const STUDENT_NAV = [
  { label: "Dashboard", to: "/student/dashboard", icon: LayoutDashboard },
  { label: "Available Exams", to: "/student/exams", icon: BookOpen },
  { label: "My Results", to: "/student/results", icon: BarChart2 },
  { label: "Profile", to: "/student/profile", icon: CircleUser },
];

const TEACHER_NAV = [
  { label: "Dashboard", to: "/teacher/dashboard", icon: LayoutDashboard },
  { label: "My Exams", to: "/teacher/exams", icon: BookOpen },
  { label: "Results", to: "/teacher/results", icon: BarChart2 },
  { label: "Profile", to: "/teacher/profile", icon: CircleUser },
];

function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }) {
  const { data } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const profile = data?.profile;
  const isTeacher = profile?.role === ROLES.TEACHER;
  const navItems = isTeacher ? TEACHER_NAV : STUDENT_NAV;

  const sidebarWidth = isCollapsed ? "68px" : "var(--sidebar-width)";

  return (
    <>
      {/* ── Mobile backdrop  */}
      {isOpen && (
        <div
          className="sidebar-backdrop md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 z-40 flex h-screen flex-col transition-all duration-300"
        style={{
          backgroundColor: "var(--color-surface)",
          borderRight: "1px solid var(--color-border)",
          width: sidebarWidth,

          transform:
            window.innerWidth < 768
              ? isOpen
                ? "translateX(0)"
                : "translateX(-100%)"
              : "translateX(0)",
        }}
      >
        {/* Logo */}

        <div
          className="flex h-16 shrink-0 items-center gap-3 px-4"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border-1 border-solid border-[var(--color-border)] bg-[var(--color-surface-2)] text-lg font-bold text-[var(--color-primary)]"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <GraduationCap strokeWidth={2.5} />
          </div>

          {/* Brand name — hidden when collapsed */}
          {!isCollapsed && (
            <div className="flex min-w-0 flex-1 flex-col leading-none">
              <span
                className="text-l font-bold tracking-tight"
                style={{ color: "var(--color-text)" }}
              >
                EduTest
              </span>
              <span
                className="mt-1 text-[11px] capitalize"
                style={{ color: "var(--color-text-faint)" }}
              >
                {isTeacher ? "Teacher Portal" : "Student Portal"}
              </span>
            </div>
          )}

          {/* Collapse toggle — desktop only */}
          {/* <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-auto hidden cursor-pointer items-center justify-center rounded-[var(--radius-sm)] p-1.5 transition-all duration-150 lg:flex"
            style={{
              color: "var(--color-text-faint)",
              backgroundColor: "transparent",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-faint)";
            }}
          >
            {isCollapsed ? (
              <PanelLeftOpen size={17} />
            ) : (
              <PanelLeftClose size={17} />
            )}
          </button> */}

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="ml-auto flex cursor-pointer items-center justify-center rounded-[var(--radius-sm)] p-1.5 transition-all duration-150 md:hidden"
            style={{
              color: "var(--color-text-faint)",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/*  Section label — hidden when collapsed  */}

        {/* ── Nav label */}
        {!isCollapsed && (
          <div className="px-5 pt-5 pb-1.5">
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "var(--color-text-faint)" }}
            >
              Menu
            </span>
          </div>
        )}

        {/* NAV */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                isCollapsed={isCollapsed}
                onClick={onClose}
              />
            ))}
          </ul>
        </nav>
        {/* ── User footer  */}
        <div
          className="shrink-0 p-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {/* User card — full when expanded, avatar-only when collapsed */}
          {isCollapsed ? (
            // Collapsed: just avatar centered
            <div className="flex justify-center py-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-bg)",
                  boxShadow: "0 0 8px var(--shadow-glow)",
                }}
                title={profile?.full_name}
              >
                {getInitials(profile?.full_name)}
              </div>
            </div>
          ) : (
            // Expanded: full user card
            <div
              className="mb-1 flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5"
              style={{
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Avatar */}
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-bg)",
                  boxShadow: "0 0 8px var(--shadow-glow)",
                }}
              >
                {getInitials(profile?.full_name)}
              </div>

              {/* Name + role */}
              <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <span
                  className="truncate text-[13px] leading-tight font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {profile?.full_name ?? "User"}
                </span>
                <span
                  className="mt-0.5 text-[11px] leading-tight capitalize"
                  style={{ color: "var(--color-text-faint)" }}
                >
                  {profile?.role ?? ""}
                </span>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={() => logout()}
            disabled={isLoggingOut}
            className="flex w-full cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: "transparent",
              border: "1px solid transparent",
              color: "var(--color-text-muted)",
              justifyContent: isCollapsed ? "center" : "flex-start",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(200,93,106,0.08)";
              e.currentTarget.style.borderColor = "rgba(200,93,106,0.2)";
              e.currentTarget.style.color = "var(--color-danger)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            <LogOut size={15} className="shrink-0" />
            {!isCollapsed && (
              <span>{isLoggingOut ? "Signing out…" : "Sign Out"}</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
