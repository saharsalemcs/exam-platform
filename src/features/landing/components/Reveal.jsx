import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades its children up the first time they scroll into view, using the
 * `fade-up` keyframes already defined in the theme. Skipped entirely when the
 * visitor asks for reduced motion.
 */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [prefersReducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        !prefersReducedMotion && (isVisible ? "animate-fade-up" : "opacity-0"),
        className,
      )}
      style={
        !prefersReducedMotion && isVisible
          ? { animationDelay: `${delay}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
}

export default Reveal;
