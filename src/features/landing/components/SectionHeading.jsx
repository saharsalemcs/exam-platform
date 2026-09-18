import { cn } from "@/lib/utils";

function SectionHeading({ eyebrow, title, description, className = "" }) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow && (
        <span className="mb-3 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-145 text-sm leading-relaxed text-text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
