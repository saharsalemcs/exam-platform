import supabase from "@/services/supabase";

// لو الطالب خرج من الامتحان بسبب عطل، هنجيب المحاولة بتاعته الموجودة دي
export async function getExistingAttempt(examId, studentId) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .select("id, started_at, status")
    .eq("exam_id", examId)
    .eq("student_id", studentId)
    .eq("status", "in_progress")
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

// if there is no paused attempts
export async function createAttempt(examId, studentId) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .insert({
      exam_id: examId,
      student_id: studentId,
      status: "in_progress",
      started_at: new Date().toISOString(),
    })
    .select("id, started_at")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

// get answers for paused attempt (status: resume)
export async function getSavedAnswers(attemptId) {
  const { data, error } = await supabase
    .from("answers")
    .select("question_id, selected, is_bookmarked")
    .eq("attempt_id", attemptId);

  if (error) throw new Error(error.message);

  return data ?? [];
}

// auto-save answers
export async function upsertAnswers(rows) {
  // لو الصف موجود حدّثه، ولو مش موجود ضيفه
  const { error } = await supabase
    .from("answers")
    .upsert(rows, { onConflict: "attempt_id,question_id" });

  if (error) throw new Error(error.message);
}

// export async function submitAttempt({ attemptId, answerRows, status }) {
//   // flush any answers that autosave hasn't caught yet
//   if (answerRows.length > 0) {
//     const { error: answersError } = await supabase
//       .from("answers")
//       .upsert(answerRows, { onConflict: "attempt_id,question_id" });

//     if (answersError) throw new Error(answersError.message);
//   }

//   // scoring, time_taken, and status all happen server-side
//   const { error: rpcError } = await supabase.rpc("submit_exam_attempt", {
//     p_attempt_id: attemptId,
//     p_status: status,
//   });

//   if (rpcError) throw new Error(rpcError.message);
// }

export async function submitAttempt({ attemptId, answerRows, submitStatus }) {
  // الاتنين بيشتغلوا بالتوازي — أسرع من sequential await
  // وكمان العمليتين مستقلتين
  const [answersResult, attemptResult] = await Promise.all([
    supabase
      .from("answers")
      .upsert(answerRows, { onConflict: "attempt_id,question_id" }),

    supabase
      .from("exam_attempts")
      .update({
        status: submitStatus,
        submitted_at: new Date().toISOString(),
      })
      .eq("id", attemptId),
  ]);

  if (answersResult.error) throw answersResult.error;
  if (attemptResult.error) throw attemptResult.error;
}
