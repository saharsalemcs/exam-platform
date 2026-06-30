import { cn } from "@/lib/utils";

function EmptyStateAction({
  icon: Icon,
  children,
  onClick,
  variant = "primary",
  className,
}) {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80",
        className,
      )}
      style={
        isPrimary
          ? {
              backgroundColor: "var(--color-primary)",
              color: "#0d1117",
              border: "1px solid transparent",
            }
          : {
              backgroundColor: "var(--color-primary-glow)",
              color: "var(--color-primary)",
              border: "1px solid rgba(212,175,88,0.2)",
            }
      }
    >
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}

export default EmptyStateAction;
