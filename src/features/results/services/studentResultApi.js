import supabase from "@/services/supabase";

export async function getExamResult(attemptId, studentId) {
  const { data: attempt, error: attemptErr } = await supabase
    .from("exam_attempts")
    .select(
      `
      id,
      score,
      total_marks,
      time_taken,
      submitted_at,
      status,
      exam_id,
      exams (
        title,
        difficulty,
        pass_marks,
        instructor:profiles!created_by ( full_name )
      )
    `,
    )
    .eq("id", attemptId)
    .eq("student_id", studentId)
    .single();

  if (attemptErr) throw new Error(attemptErr.message);

  const { data: questions, error: questionsErr } = await supabase
    .from("questions")
    .select("id, body, options, marks, correct_answer, order_index")
    .eq("exam_id", attempt.exam_id)
    .order("order_index", { ascending: true });

  if (questionsErr) throw new Error(questionsErr.message);

  const { data: answers, error: answersErr } = await supabase
    .from("answers")
    .select("question_id, selected")
    .eq("attempt_id", attemptId);

  if (answersErr) throw new Error(answersErr.message);

  const answersByQuestion = Object.fromEntries(
    (answers ?? []).map((a) => [a.question_id, a.selected]),
  );

  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const questionResults = (questions ?? []).map((q) => {
    const selectedOptionId = answersByQuestion[q.id] ?? null;

    let questionStatus;
    if (selectedOptionId == null) {
      questionStatus = "skipped";
      skippedCount += 1;
    } else if (selectedOptionId === q.correct_answer) {
      questionStatus = "correct";
      correctCount += 1;
    } else {
      questionStatus = "wrong";
      wrongCount += 1;
    }

    return {
      id: q.id,
      body: q.body,
      options: q.options ?? [],
      marks: q.marks ?? 0,
      correctOptionId: q.correct_answer,
      selectedOptionId,
      status: questionStatus,
      earnedMarks: questionStatus === "correct" ? (q.marks ?? 0) : 0,
    };
  });

  const totalMarks = attempt.total_marks ?? 0;
  const percentage = totalMarks
    ? Math.round((attempt.score / totalMarks) * 100)
    : 0;
  const passed = attempt.score >= (attempt.exams?.pass_marks ?? 0);

  return {
    exam: {
      title: attempt.exams?.title ?? "—",
      difficulty: attempt.exams?.difficulty ?? null,
      instructorName: attempt.exams?.instructor?.full_name ?? "—",
    },
    submittedAt: attempt.submitted_at,
    timeTaken: attempt.time_taken ?? 0,
    score: attempt.score ?? 0,
    totalMarks,
    percentage,
    passed,
    cheatingDetected: attempt.status === "violated",
    correctCount,
    wrongCount,
    skippedCount,
    questions: questionResults,
  };
}
