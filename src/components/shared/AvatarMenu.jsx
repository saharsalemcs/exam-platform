import { useNavigate } from "react-router-dom";

//  AvatarMenu
function AvatarMenu({ profile }) {
  const navigate = useNavigate();

  const profilePath =
    profile?.role === "teacher" ? "/instructor/profile" : "/student/profile";

  return (
    <button
      title="Go to profile"
      onClick={() => navigate(profilePath)}
      aria-label={`Go to profile — ${profile?.full_name}`}
      className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-1.5 transition-all duration-150"
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
      <div className="flex shrink-0 items-center justify-center">
        <img
          src={profile?.avatar_url || "/default-avatar.jpg"}
          alt={profile?.full_name}
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

      {/* Name — hidden on small screens */}
      <div className="hidden flex-col items-start leading-none sm:flex">
        <span className="text-[16px] font-semibold text-text">
          {profile?.full_name?.split(" ")[0] ?? "User"}
        </span>
      </div>
    </button>
  );
}

export default AvatarMenu;
