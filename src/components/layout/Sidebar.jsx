import { ROLES } from "@/constants/roles";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useUser } from "@/features/auth/hooks/useUser";
import { getInitials } from "@/lib/utils";
import {
  BarChart2,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import NavItem from "../shared/NavItem";

const STUDENT_NAV = [
  { label: "Dashboard", to: "/student/dashboard", icon: LayoutDashboard },
  { label: "Exams", to: "/student/exams", icon: BookOpen },
  { label: "Results", to: "/student/results", icon: BarChart2 },
  { label: "Profile", to: "/student/profile", icon: User },
];

const TEACHER_NAV = [
  { label: "Dashboard", to: "/teacher/dashboard", icon: LayoutDashboard },
  { label: "My Exams", to: "/teacher/exams", icon: BookOpen },
  { label: "Results", to: "/teacher/results", icon: BarChart2 },
  { label: "Profile", to: "/teacher/profile", icon: User },
];

function Sidebar() {
  const { data } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const profile = data?.profile;
  const isTeacher = profile?.role === ROLES.TEACHER;
  const navItems = isTeacher ? TEACHER_NAV : STUDENT_NAV;

  return (
    <aside
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 z-40 flex h-screen flex-col"
      style={{
        backgroundColor: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        width: "var(--sidebar-width)",
      }}
    >
      {/* Logo */}
      <div
        className="flex h-16 shrink-0 items-center gap-3 px-5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border-1 border-solid border-[var(--color-border)] bg-[var(--color-surface-2)] text-lg font-bold text-[var(--color-primary)]">
          <GraduationCap />
        </div>
        <div className="flex flex-col leading-none">
          <span
            className="text-l font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            EduTest
          </span>
          <span
            className="mt-1 text-[13px] capitalize"
            style={{ color: "var(--color-text-faint)" }}
          >
            {isTeacher ? "Teacher Portal" : "Student Portal"}
          </span>
        </div>
      </div>

      {/* ── Nav label */}
      <div className="px-5 pt-5 pb-1.5">
        <span
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: "var(--color-text-faint)" }}
        >
          Menu
        </span>
      </div>
      {/* NAV */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </ul>
      </nav>
      {/* ── User footer  */}
      <div
        className="shrink-0 p-3"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {/* User card */}
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
              color: "#0d1117",
              boxShadow: "0 0 8px rgba(212,175,88,0.25)",
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

        {/* Logout button */}
        <button
          onClick={() => logout()}
          disabled={isLoggingOut}
          className="flex w-full cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            backgroundColor: "transparent",
            border: "1px solid transparent",
            color: "var(--color-text-muted)",
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
          <LogOut size={15} />
          {isLoggingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
