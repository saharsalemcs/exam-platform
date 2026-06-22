import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely.
 * Resolves conflicts (e.g. px-2 + px-4 → px-4) via tailwind-merge.
 * Handles conditional classes via clsx.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format seconds into MM:SS */
export function formatTime(seconds) {
  if (typeof seconds !== "number" || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Format ISO date string to readable date */
export function formatDate(dateString, options = {}) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date)) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

/** Safe percentage calculation */
export function calculatePercentage(value, total) {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
}

/** Get initials from full name — "Sahar Salem" → "SS" */
export function getInitials(fullName) {
  if (!fullName) return "?";
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

/** Truncate string with ellipsis */
export function truncate(str, maxLength = 100) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/** Delay utility for dev/testing */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
