import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavItem({
  to,
  icon: Icon,
  label,
  isCollapsed,
  onClick,
}) {
  return (
    <li>
      <NavLink
        onClick={onClick}
        title={isCollapsed ? label : undefined} // tooltip when collapsed
        to={to}
        className={({ isActive }) =>
          [
            "relative flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 no-underline transition-all duration-150 outline-none",
            isCollapsed ? "justify-center px-0 py-3" : "",
            isActive ? "font-bold" : "font-semibold",
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
          const isActive =
            e.currentTarget.style.color === "var(--color-primary)";
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
            e.currentTarget.style.color = "var(--color-text)";
          }
        }}
        onMouseLeave={(e) => {
          const isActive =
            e.currentTarget.getAttribute("aria-current") === "page";
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }
        }}
      >
        {({ isActive }) => (
          <>
            {isActive && !isCollapsed && (
              <span
                className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
            )}

            <Icon
              size={18}
              strokeWidth={isActive ? 2.5 : 2}
              className="shrink-0"
            />

            {/* Label — hidden when collapsed */}
            {!isCollapsed && (
              <>
                <span className="flex-1">{label}</span>
                {isActive && (
                  <ChevronRight size={13} style={{ opacity: 0.5 }} />
                )}
              </>
            )}
          </>
        )}
      </NavLink>
    </li>
  );
}
