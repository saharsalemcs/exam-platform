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

/**
 * ⚠️ SECURITY: submitAttempt ميبعتش score/totalMarks خالص، ولا بتعمل
 * update مباشر على exam_attempts من الفرونت. بدل كده بتنادي الـ
 * Postgres function (RPC) submit_exam_attempt، وهي اللي بتحسب
 * الدرجة وتحدّث الصف سيرفر-سايد، وترجّع النتيجة بس للفرونت.
 */
export async function submitAttempt({
  attemptId,
  answerRows,
  timeTaken,
  submitStatus,
}) {
  const { data, error } = await supabase.rpc("submit_exam_attempt", {
    p_attempt_id: attemptId,
    p_answers: answerRows,
    p_time_taken: timeTaken,
    p_status: submitStatus,
  });

  if (error) throw new Error(error.message);

  // { score, totalMarks }
  return data;
}

// import supabase from "@/services/supabase";

// // لو الطالب خرج من الامتحان بسبب عطل، هنجيب المحاولة بتاعته الموجودة دي
// export async function getExistingAttempt(examId, studentId) {
//   const { data, error } = await supabase
//     .from("exam_attempts")
//     .select("id, started_at, status")
//     .eq("exam_id", examId)
//     .eq("student_id", studentId)
//     .eq("status", "in_progress")
//     .maybeSingle();

//   if (error) throw new Error(error.message);

//   return data;
// }

// // if there is no paused attempts
// export async function createAttempt(examId, studentId) {
//   const { data, error } = await supabase
//     .from("exam_attempts")
//     .insert({
//       exam_id: examId,
//       student_id: studentId,
//       status: "in_progress",
//       started_at: new Date().toISOString(),
//     })
//     .select("id, started_at")
//     .single();

//   if (error) throw new Error(error.message);

//   return data;
// }

// // get answers for paused attempt (status: resume)
// export async function getSavedAnswers(attemptId) {
//   const { data, error } = await supabase
//     .from("answers")
//     .select("question_id, selected, is_bookmarked")
//     .eq("attempt_id", attemptId);

//   if (error) throw new Error(error.message);

//   return data ?? [];
// }

// // auto-save answers
// export async function upsertAnswers(rows) {
//   // لو الصف موجود حدّثه، ولو مش موجود ضيفه
//   const { error } = await supabase
//     .from("answers")
//     .upsert(rows, { onConflict: "attempt_id,question_id" });

//   if (error) throw new Error(error.message);
// }

// export async function submitAttempt({ attemptId, answerRows, submitStatus }) {
//   // الاتنين بيشتغلوا بالتوازي — أسرع من sequential await
//   // وكمان العمليتين مستقلتين
//   const [answersResult, attemptResult] = await Promise.all([
//     supabase
//       .from("answers")
//       .upsert(answerRows, { onConflict: "attempt_id,question_id" }),

//     supabase
//       .from("exam_attempts")
//       .update({
//         status: submitStatus,
//         submitted_at: new Date().toISOString(),
//       })
//       .eq("id", attemptId),
//   ]);

//   if (answersResult.error) throw answersResult.error;
//   if (attemptResult.error) throw attemptResult.error;
// }
