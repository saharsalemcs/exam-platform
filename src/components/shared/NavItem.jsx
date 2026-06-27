import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavItem({ to, icon: Icon, label }) {
  return (
    <li key={to}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            "relative flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3 text-sm no-underline transition-all duration-150 outline-none",
            isActive ? "font-semibold" : "font-normal hover:opacity-80",
          ].join(" ")
        }
        style={({ isActive }) => ({
          backgroundColor: isActive
            ? "var(--color-primary-glow)"
            : "transparent",
          color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
          border: isActive
            ? "1px solid rgba(212,175,88,0.15)"
            : "1px solid transparent",
        })}
        onMouseEnter={(e) => {
          if (!e.currentTarget.dataset.active) {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
            e.currentTarget.style.color = "var(--color-text)";
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.dataset.active) {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }
        }}
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <span
                className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
            )}

            <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />

            <span className="flex-1">{label}</span>

            {isActive && <ChevronRight size={13} style={{ opacity: 0.5 }} />}
          </>
        )}
      </NavLink>
    </li>
  );
}
