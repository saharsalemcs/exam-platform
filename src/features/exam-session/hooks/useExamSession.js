import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getExistingAttempt,
  createAttempt,
  getSavedAnswers,
  submitAttempt,
} from "../services/examSessionApi";
import { useUser } from "@/features/auth/hooks/useUser";
import { useCountdownTimer } from "./useCountdownTimer";
import { useAutoSave } from "./useAutoSave";
import { useAntiCheat } from "./useAntiCheat";

const VIOLATION_MESSAGES = {
  tab_switch: "Switching tabs is not allowed during the exam",
  window_blur: "You must stay focused on the exam window",
  right_click: "Right-clicking is not allowed during the exam",
  devtools_shortcut: "This keyboard shortcut is not allowed during the exam",
  view_source: "Viewing page source is not allowed",
  tab_switch_shortcut: "Tab navigation shortcuts are not allowed",
  copy_attempt: "Copying is not allowed during the exam",
};

const MAX_VIOLATIONS = 3;
const ANTI_CHEAT_TOAST_ID = "anti-cheat-warning";

export function useExamSession(exam) {
  const navigate = useNavigate();

  // useUser() بترجع { data: { user, profile }, isLoading }
  const { data: userData } = useUser();
  const studentId = userData?.profile?.id;

  const [attemptId, setAttemptId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [status, setStatus] = useState("idle");
  const [showTimesUp, setShowTimesUp] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // { score, totalMarks } بعد التسليم

  const submittingRef = useRef(false);
  const startingRef = useRef(false);
  const timeExpiredRef = useRef(false);

  const questions = exam?.questions ?? [];
  const totalSeconds = (exam?.duration_mins ?? 0) * 60;

  // مفتاح فريد لكل (امتحان + طالب) عشان منمنعش تصادم على نفس الجهاز
  const timerStorageKey =
    exam?.id && studentId ? `${exam.id}_${studentId}` : undefined;

  const {
    timeLeft,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
  } = useCountdownTimer(
    totalSeconds,
    () => {
      timeExpiredRef.current = true;
      setShowTimesUp(true);
    },
    timerStorageKey,
  );

  const { flush: flushAnswers } = useAutoSave(
    attemptId,
    answers,
    bookmarks,
    status === "active",
  );

  // -------------- handleSubmit --------------
  // submitStatus: 'submitted' | 'timed_out' | 'violated'
  const handleSubmit = useCallback(
    async (submitStatus = "submitted") => {
      if (!attemptId) return;
      if (submittingRef.current) return;
      if (status === "submitting" || status === "submitted") return;

      submittingRef.current = true;
      setStatus("submitting");
      setShowTimesUp(false);
      setShowConfirm(false);
      pauseTimer();

      try {
        await flushAnswers();

        // ⚠️ من غير score ومن غير is_correct — دول بيتحسبوا سيرفر-سايد
        // جوه submit_exam_attempt RPC، مش هنا
        const answerRows = questions.map((q) => ({
          attempt_id: attemptId,
          question_id: q.id,
          selected: answers[q.id] ?? null,
          is_bookmarked: bookmarks[q.id] ?? false,
          updated_at: new Date().toISOString(),
        }));

        const response = await submitAttempt({
          attemptId,
          answerRows,
          timeTaken: totalSeconds - timeLeft,
          submitStatus,
        });

        setResult(response ?? null);
        setStatus("submitted");
        navigate(`/student/results/${attemptId}`, { replace: true });
      } catch (err) {
        console.error("[useExamSession] handleSubmit:", err.message);
        setError(err.message);
        submittingRef.current = false;

        if (timeExpiredRef.current) {
          setStatus("submitting");
          setShowTimesUp(true);
        } else {
          setStatus("active");
          resumeTimer();
        }
      }
    },
    [
      attemptId,
      status,
      questions,
      answers,
      bookmarks,
      timeLeft,
      totalSeconds,
      flushAnswers,
      pauseTimer,
      resumeTimer,
      navigate,
    ],
  );

  // -------------- Anti-cheat --------------
  // بنبعت toast فوري لكل مخالفة (imperative، مش state) — نفس فلسفة
  // الهوك نفسه: مفيش داعي لـ re-render عشان نعرض تحذير بيختفي لوحده
  const handleViolation = useCallback((type, count) => {
    const message = VIOLATION_MESSAGES[type] ?? "Violation detected";
    toast.error(`${message} (warning ${count} of ${MAX_VIOLATIONS})`, {
      id: ANTI_CHEAT_TOAST_ID, // نفس الـ id عشان التحذيرات متتكدّسش فوق بعض
    });
  }, []);

  // ref بتحمل آخر نسخة من handleSubmit. السبب: handleSubmit بيتغيّر كل
  // ثانية (لإن timeLeft من ضمن الـ deps بتاعته)، فلو استخدمناه مباشرة
  // في deps بتاعة handleAutoSubmit، useAntiCheat هيعيد تسجيل كل
  // event listeners بتاعته كل ثانية من غير داعي. الـ ref هنا بتخلي
  // handleAutoSubmit ثابتة، وبرضو دايمًا بتنادي أحدث نسخة من handleSubmit
  const handleSubmitRef = useRef(handleSubmit);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  // لما نوصل للحد الأقصى: بنوقف التايمر فورًا (عشان الطالب ميتلخبطش
  // بعدّاد شغال وهو بيقرا رسالة السحب)، بنعرض التحذير الأخير، وبعدها
  // بمهلة بسيطة بننفذ التسليم فعليًا كـ "violated"
  const handleAutoSubmit = useCallback(() => {
    pauseTimer();
    toast.error(
      "You've exceeded the maximum number of violations. Your exam will be submitted now",
      { id: ANTI_CHEAT_TOAST_ID, duration: 4000 },
    );
    setTimeout(() => {
      handleSubmitRef.current("violated");
    }, 2000);
  }, [pauseTimer]);

  useAntiCheat({
    enabled: status === "active",
    onViolation: handleViolation,
    maxViolations: MAX_VIOLATIONS,
    onAutoSubmit: handleAutoSubmit,
  });

  // -------------- startSession --------------
  const startSession = useCallback(async () => {
    if (!exam || !studentId) return;
    if (startingRef.current) return;
    if (status !== "idle") return;

    startingRef.current = true;
    setStatus("starting");
    setError(null);

    try {
      const existing = await getExistingAttempt(exam.id, studentId);
      let attempt = existing;

      if (!attempt) {
        attempt = await createAttempt(exam.id, studentId);
      }

      if (
        attempt.status === "submitted" ||
        attempt.status === "timed_out" ||
        attempt.status === "violated"
      ) {
        setStatus("submitted");
        navigate(`/student/results/${attempt.id}`, { replace: true });
        return;
      }

      if (existing) {
        const saved = await getSavedAnswers(attempt.id);
        if (saved.length) {
          const ansMap = {};
          const bkmMap = {};
          saved.forEach(({ question_id, selected, is_bookmarked }) => {
            if (selected) ansMap[question_id] = selected;
            if (is_bookmarked) bkmMap[question_id] = true;
          });
          setAnswers(ansMap);
          setBookmarks(bkmMap);
        }
      }

      setAttemptId(attempt.id);

      const remaining =
        typeof attempt.remaining_seconds === "number"
          ? attempt.remaining_seconds
          : Math.max(
              0,
              totalSeconds -
                Math.floor(
                  (Date.now() - new Date(attempt.started_at).getTime()) / 1000,
                ),
            );

      if (remaining <= 0) {
        timeExpiredRef.current = true;
        setStatus("active");
        setShowTimesUp(true);
        return;
      }

      setStatus("active");
      startTimer(remaining);
    } catch (err) {
      console.error("[useExamSession] startSession:", err.message);
      setError(err.message);
      setStatus("idle");
    } finally {
      startingRef.current = false;
    }
  }, [exam, studentId, status, totalSeconds, startTimer, navigate]);

  // -------------- Auto-submit عند انتهاء الوقت --------------
  useEffect(() => {
    if (showTimesUp && status === "active") {
      pauseTimer();
    }
  }, [showTimesUp, status, pauseTimer]);

  // -------------- beforeunload --------------
  useEffect(() => {
    if (status !== "active") return;
    const handler = (e) => {
      flushAnswers();
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [status, flushAnswers]);

  // -------------- Actions --------------
  const selectAnswer = useCallback(
    (qId, optId) => setAnswers((prev) => ({ ...prev, [qId]: optId })),
    [],
  );

  const toggleBookmark = useCallback(
    (qId) => setBookmarks((prev) => ({ ...prev, [qId]: !prev[qId] })),
    [],
  );

  const goToQuestion = useCallback(
    (i) => setCurrentIndex(Math.max(0, Math.min(i, questions.length - 1))),
    [questions.length],
  );

  const goNext = useCallback(
    () => goToQuestion(currentIndex + 1),
    [currentIndex, goToQuestion],
  );
  const goPrev = useCallback(
    () => goToQuestion(currentIndex - 1),
    [currentIndex, goToQuestion],
  );

  return {
    status,
    error,
    timeLeft,
    result,
    exam,
    currentIndex,
    currentQuestion: questions[currentIndex] ?? null,
    questions,
    answers,
    bookmarks,
    answeredCount: Object.keys(answers).length,
    unansweredCount: questions.length - Object.keys(answers).length,
    attemptId,
    showTimesUp,
    showConfirm,
    setShowConfirm,
    startSession,
    selectAnswer,
    toggleBookmark,
    goToQuestion,
    goNext,
    goPrev,
    handleSubmit,
  };
}
