import supabase from "@/services/supabase";

function buildExamPayload(examDetails, questions) {
  const totalMarks = questions.reduce(
    (sum, q) => sum + (Number(q.marks) || 0),
    0,
  );
  const passMarks = Math.round(
    (Number(examDetails.passPercentage) / 100) * totalMarks,
  );

  return {
    title: examDetails.title,
    description: examDetails.description || null,
    category: examDetails.category,
    duration_mins: Number(examDetails.duration_mins),
    difficulty: examDetails.difficulty,
    grade: examDetails.grade,
    department: examDetails.department,
    starts_at: examDetails.starts_at,
    ends_at: examDetails.ends_at,
    pass_marks: passMarks,
    total_marks: totalMarks,
  };
}

function buildQuestionsPayload(questions) {
  return questions.map((q, i) => ({
    body: q.body,
    type: q.type,
    options: q.options,
    correct_answer: q.correct_answer,
    marks: Number(q.marks) || 0,
    order_index: i,
  }));
}

export async function publishExam(examDetails, questions, instructorId) {
  const { data, error } = await supabase.rpc("create_exam_with_questions", {
    p_exam: buildExamPayload(examDetails, questions),
    p_questions: buildQuestionsPayload(questions),
    p_created_by: instructorId,
  });

  if (error) throw new Error(error.message);
  return data; // exam id
}

export async function updateExam(examId, examDetails, questions, instructorId) {
  const { data, error } = await supabase.rpc("update_exam_with_questions", {
    p_exam_id: examId,
    p_exam: buildExamPayload(examDetails, questions),
    p_questions: buildQuestionsPayload(questions),
    p_instructor_id: instructorId,
  });

  if (error) throw new Error(error.message);
  return data; // exam id
}

/**
 * Fetch a single exam (with its questions, including correct_answer) for the
 * edit wizard. Scoped to the requesting instructor so a teacher can't load —
 * or overwrite via update_exam_with_questions — another teacher's exam.
 */
export async function getExamById(examId, instructorId) {
  const { data, error } = await supabase
    .from("exams")
    .select("*, questions(*)")
    .eq("id", examId)
    .eq("created_by", instructorId)
    .single();

  if (error) throw new Error(error.message);

  return {
    ...data,
    questions: (data.questions ?? []).sort(
      (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0),
    ),
  };
}
