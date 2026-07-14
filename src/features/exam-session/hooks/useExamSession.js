import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getExistingAttempt,
  createAttempt,
  getSavedAnswers,
  upsertAnswers,
  submitAttempt,
} from "../services/examSessionApi";
import { useUser } from "@/features/auth/hooks/useUser";
import { useCountdownTimer } from "./useCountdownTimer";
import { useAutoSave } from "./useAutoSave";

export function useExamSession(exam) {
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const studentId = userData?.profile?.id;

  const [attemptId, setAttemptId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: selectedOptionId }
  const [bookmarks, setBookmarks] = useState({});
  const [status, setStatus] = useState("idle");
  const [showTimesUp, setShowTimesUp] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  const questions = exam?.questions ?? [];
  const totalSeconds = (exam?.duration_mins ?? 0) * 60;

  const {
    timeLeft,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
  } = useCountdownTimer(totalSeconds, () => setShowTimesUp(true));

  const { flush: flushAnswers } = useAutoSave(
    attemptId,
    answers,
    bookmarks,
    status === "active",
  );

  // -------------- startSession --------------
  const startSession = useCallback(async () => {
    if (!exam || !studentId) return;
    setStatus("starting");
    setError(null);

    try {
      const existing = await getExistingAttempt(exam.id, studentId);
      let attempt = existing;

      if (!attempt) {
        attempt = await createAttempt(exam.id, studentId);
      } else {
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

      const elapsed = Math.floor(
        (Date.now() - new Date(attempt.started_at).getTime()) / 1000,
      );
      const remaining = Math.max(0, totalSeconds - elapsed);

      if (remaining <= 0) {
        setShowTimesUp(true);
        return;
      }

      setStatus("active");
      startTimer(remaining);
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }, [exam, studentId, totalSeconds, startTimer]);

  // -------------- handleSubmit --------------
  const handleSubmit = useCallback(
    async (submitStatus = "submitted") => {
      if (!attemptId || status === "submitting" || status === "submitted")
        return;
      setStatus("submitting");
      setShowTimesUp(false);
      setShowConfirm(false);
      pauseTimer();

      try {
        console.log("Flushing answers...");
        await flushAnswers();

        const score = questions.reduce(
          (total, q) =>
            total + (answers[q.id] === q.correct_answer ? (q.marks ?? 1) : 0),
          0,
        );

        const answerRows = questions.map((q) => ({
          attempt_id: attemptId,
          question_id: q.id,
          selected: answers[q.id] ?? null,
          is_correct: answers[q.id] === q.correct_answer,
          is_bookmarked: bookmarks[q.id] ?? false,
          updated_at: new Date().toISOString(),
        }));

        await submitAttempt({
          attemptId,
          answerRows,
          score,
          totalMarks: exam?.total_marks ?? 0,
          timeTaken: totalSeconds - timeLeft,
          submitStatus,
        });

        setStatus("submitted");
        navigate(`/student/results/${attemptId}`, { replace: true });
      } catch (err) {
        setError(err.message);
        setStatus("active");
        resumeTimer();
      }
    },
    [
      attemptId,
      status,
      questions,
      answers,
      bookmarks,
      exam,
      timeLeft,
      totalSeconds,
      flushAnswers,
      pauseTimer,
      resumeTimer,
      navigate,
    ],
  );

  // -------------- Actions --------------

  function selectAnswer(questionId, optionId) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }
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
  function toggleBookmark(qId) {
    setBookmarks((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  }

  return {
    status,
    error,
    timeLeft,
    exam,
    currentQuestion: questions[currentIndex] ?? null,
    currentIndex,
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
    toggleBookmark,
    selectAnswer,
    goNext,
    goPrev,
    goToQuestion,
    handleSubmit,
  };
}
