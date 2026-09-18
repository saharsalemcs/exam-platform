/**
 * Smooth-scrolls to an in-page anchor (e.g. "#features") without touching the
 * URL, falling back to the browser default when the target isn't on the page
 * or the visitor asks for reduced motion.
 */
export function scrollToSection(event, href) {
  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}
