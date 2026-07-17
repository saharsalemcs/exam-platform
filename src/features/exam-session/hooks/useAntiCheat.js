import { useEffect, useRef, useCallback } from "react";

/**
 * useAntiCheat
 * ─────────────────────────────────────────────────────────────────
 * Callback-based (مش state-based) — كل مخالفة بتنادي onViolation
 * مباشرة، فمفيش مشكلة "نفس القيمة مش بتعمل re-render" اللي كانت
 * موجودة في النسخة القديمة المعتمدة على lastWarning state.
 *
 * @param {object}   options
 * @param {boolean}  options.enabled          - يراقب بس لما تكون true
 * @param {function} options.onViolation      - بتتنادى بـ (violationType, count)
 * @param {number}   [options.maxViolations]   - افتراضي 3
 * @param {function} [options.onAutoSubmit]    - بتتنادى لما نوصل maxViolations
 *
 * Detections:
 *   1. Tab switch / window blur
 *   2. Right-click
 *   3. Keyboard shortcuts خطيرة (F12, Ctrl+Shift+I/J/C, Ctrl+U, إلخ)
 *   4. محاولة نسخ (selection + copy)
 *   5. منع زرار الرجوع/التقدم — بس من غير ما تتحسب مخالفة (بقرار)
 *
 * ⚠️ ملحوظ عمداً من نسخة المرجع:
 *   - DevTools detection (resize + debugger timing) — شيلناها خالص
 *   - Split-screen detection (نفس منطق الـ resize) — شيلناها
 *   - beforeunload كمخالفة — شيلناها، الـ autosave-only handler
 *     الموجود في useExamSession يفضل هو المسؤول عن ده لوحده
 */
export function useAntiCheat({
  enabled,
  onViolation,
  maxViolations = 3,
  onAutoSubmit,
} = {}) {
  const violationCountRef = useRef(0);
  const autoSubmittedRef = useRef(false);

  const report = useCallback(
    (type) => {
      if (!enabled) return;
      if (autoSubmittedRef.current) return;

      violationCountRef.current += 1;
      const count = violationCountRef.current;
      onViolation?.(type, count);

      if (count >= maxViolations) {
        autoSubmittedRef.current = true;
        onAutoSubmit?.();
      }
    },
    [enabled, onViolation, maxViolations, onAutoSubmit],
  );

  useEffect(() => {
    if (!enabled) return;

    // 1. تبديل التاب
    const handleVisibilityChange = () => {
      if (document.hidden) report("tab_switch");
    };

    // 2. فقدان التركيز (blur) — بس لو مش نفس لحظة تبديل التاب،
    //    عشان منحسبش نفس الحدث مرتين
    const handleWindowBlur = () => {
      if (!document.hidden) report("window_blur");
    };

    // 3. الضغط بزرار الفأرة الأيمن
    const handleContextMenu = (e) => {
      e.preventDefault();
      report("right_click");
    };

    // 4. اختصارات لوحة المفاتيح الخطيرة
    const BLOCKED_KEYS = new Set(["F12", "F5", "F11"]);

    const handleKeyDown = (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const key = e.key;

      if (BLOCKED_KEYS.has(key)) {
        e.preventDefault();
        if (key === "F12") report("devtools_shortcut");
        return;
      }

      if (ctrl && shift && ["i", "I", "j", "J", "c", "C"].includes(key)) {
        e.preventDefault();
        report("devtools_shortcut");
        return;
      }

      if (ctrl && key.toLowerCase() === "u") {
        e.preventDefault();
        report("view_source");
        return;
      }

      if (ctrl && (key.toLowerCase() === "s" || key.toLowerCase() === "p")) {
        e.preventDefault(); // منع بس، من غير ما تتحسب مخالفة
        return;
      }

      if (ctrl && (key === "Tab" || key.toLowerCase() === "w")) {
        e.preventDefault();
        if (key === "Tab") report("tab_switch_shortcut");
        return;
      }

      // ⚠️ Alt+Left/Right (رجوع/تقدم) — بمنعها بس من غير ما أعتبرها
      // مخالفة، بناءً على طلبك
      if (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        return;
      }
    };

    // 5. منع تحديد/نسخ النص
    const handleSelectStart = (e) => e.preventDefault();

    const handleCopy = (e) => {
      e.preventDefault();
      report("copy_attempt");
    };

    // 6. منع زرار الرجوع/التقدم بالكامل — من غير ما تتحسب مخالفة
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      // (مفيش report هنا عمداً)
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("copy", handleCopy);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("copy", handleCopy);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled, report]);
  // eslint-disable-next-line react-hooks/refs
  return { violationCount: violationCountRef.current };
}
