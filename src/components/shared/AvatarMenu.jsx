import { getInitials } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

//  AvatarMenu
function AvatarMenu({ profile }) {
  const navigate = useNavigate();

  const profilePath =
    profile?.role === "teacher" ? "/teacher/profile" : "/student/profile";

  return (
    <button
      title="Go to profile"
      onClick={() => navigate(profilePath)}
      aria-label={`Go to profile — ${profile?.full_name}`}
      className="flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] px-2 py-1.5 transition-all duration-150"
      style={{
        backgroundColor: "transparent",
        border: "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-surface-2)";
        e.currentTarget.style.borderColor = "var(--color-border)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      {/* Avatar circle */}
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

      {/* Name — hidden on small screens */}
      <div className="hidden flex-col items-start leading-none sm:flex">
        <span
          className="text-[13px] font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          {profile?.full_name?.split(" ")[0] ?? "User"}
        </span>
        <span
          className="mt-0.5 text-[10px] capitalize"
          style={{ color: "var(--color-text-faint)" }}
        >
          {profile?.role ?? ""}
        </span>
      </div>
    </button>
  );
}

export default AvatarMenu;
