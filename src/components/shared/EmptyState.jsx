import { cn } from "@/lib/utils";

const VARIANTS = {
  default: {
    bg: "var(--color-primary-glow)",
    border: "rgba(212,175,88,0.15)",
    color: "var(--color-primary)",
  },
  error: {
    bg: "rgba(200,93,106,0.1)",
    border: "rgba(200,93,106,0.2)",
    color: "var(--color-danger)",
  },
  search: {
    bg: "var(--color-surface-2)",
    border: "var(--color-border)",
    color: "var(--color-text-muted)",
  },
};

const SIZES = {
  sm: {
    wrapperPadding: "py-10",
    iconBox: "h-11 w-11",
    iconSize: 18,
    titleSize: "text-sm",
    descSize: "text-xs",
    gap: "gap-1",
    maxWidth: "max-w-[240px]",
  },
  md: {
    wrapperPadding: "py-16",
    iconBox: "h-14 w-14",
    iconSize: 22,
    titleSize: "text-base",
    descSize: "text-sm",
    gap: "gap-1.5",
    maxWidth: "max-w-xs",
  },
  lg: {
    wrapperPadding: "py-24",
    iconBox: "h-16 w-16",
    iconSize: 26,
    titleSize: "text-lg",
    descSize: "text-sm",
    gap: "gap-2",
    maxWidth: "max-w-sm",
  },
};

function EmptyState({
  icon: Icon,
  title,
  description,
  variant = "default",
  action,
  size = "md",
  className,
}) {
  const dims = SIZES[size] ?? SIZES.md;
  const colors = VARIANTS[variant] ?? VARIANTS.default;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 text-center",
        dims.wrapperPadding,
        className,
      )}
    >
      {/* Icon */}
      {Icon && (
        <div
          className={cn(
            "mb-4 flex shrink-0 items-center justify-center rounded-[var(--radius-md)]",
            dims.iconBox,
          )}
          style={{
            backgroundColor: colors.bg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <Icon size={dims.iconSize} style={{ color: colors.color }} />
        </div>
      )}

      {/* title and description */}
      <div className={cn("flex flex-col", dims.gap, action && "mb-5")}>
        <h3
          className={cn("font-semibold", dims.titleSize)}
          style={{ color: "var(--color-text)" }}
        >
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              dims.maxWidth,
              dims.descSize,
              "mx-auto leading-relaxed",
            )}
            style={{ color: "var(--color-text-muted)" }}
          >
            {description}
          </p>
        )}
      </div>

      {/* action */}
      {action}
    </div>
  );
}

export default EmptyState;
