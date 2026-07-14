import { useEffect, useRef, useCallback } from "react";
import { upsertAnswers } from "../services/examSessionApi";

export function useAutoSave(attemptId, answers, bookmarks, enabled = true) {
  const debounceRef = useRef(null);
  const intervalRef = useRef(null);
  const isSavingRef = useRef(false);
  const lastSavedRef = useRef(null);

  const buildRows = useCallback(
    (ans, bkm) =>
      Object.entries(ans).map(([questionId, selected]) => ({
        attempt_id: attemptId,
        question_id: questionId,
        selected: selected ?? null,
        is_bookmarked: bkm[questionId] ?? false,
        updated_at: new Date().toISOString(),
      })),
    [attemptId],
  );

  const save = useCallback(
    async (ans, bkm) => {
      if (!attemptId || isSavingRef.current) return;
      if (!Object.keys(ans).length) return;

      isSavingRef.current = true;
      try {
        await upsertAnswers(buildRows(ans, bkm));
        lastSavedRef.current = JSON.stringify(ans);
      } catch (err) {
        console.error("[useAutoSave]", err.message);
      } finally {
        isSavingRef.current = false;
      }
    },
    [attemptId, buildRows],
  );

  // Debounced save on change
  useEffect(() => {
    if (!enabled || !attemptId) return;
    if (JSON.stringify(answers) === lastSavedRef.current) return;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(answers, bookmarks), 800);

    return () => clearTimeout(debounceRef.current);
  }, [answers, bookmarks, enabled, attemptId, save]);

  // Interval save every 30s
  useEffect(() => {
    if (!enabled || !attemptId) return;
    intervalRef.current = setInterval(() => save(answers, bookmarks), 30_000);
    return () => clearInterval(intervalRef.current);
  }, [enabled, attemptId, answers, bookmarks, save]);

  // flush — احفظ فوراً قبل الـ submit
  const flush = useCallback(async () => {
    clearTimeout(debounceRef.current);
    await save(answers, bookmarks);
  }, [answers, bookmarks, save]);

  return { flush };
}
