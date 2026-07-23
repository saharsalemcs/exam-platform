import { cn } from "@/lib/utils";

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm sm:text-base",
  lg: "px-6 py-3 text-base ",
  icon: "p-2",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
  ...rest
}) {
  const styles = {
    primary: "bg-[var(--color-primary)] text-[#0d1117] hover:opacity-85",
    secondary:
      "border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)]",
    danger: "bg-danger/20 text-danger border border-danger/30 hover:opacity-85",
    outline:
      "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-glow)]",
    ghost:
      "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]",
    success:
      "bg-[rgba(45,212,191,0.1)] text-[var(--color-success)] border border-[rgba(45,212,191,0.25)] hover:opacity-85",
  };
  const variantClass = styles[variant] ?? "";
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] font-semibold",
        "transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        fullWidth && "w-full",
        SIZES[size],
        variantClass,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
