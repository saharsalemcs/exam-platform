import supabase from "@/services/supabase";

function applyAvailabilityFilters(query) {
  return query.eq("status", "active").gt("ends_at", new Date().toISOString());
}

export async function getExams({
  search = "",
  category = "",
  difficulty = "",
  grade = "",
  department = "",
} = {}) {
  let query = supabase
    .from("exams")
    .select(
      `id, title, description, category, difficulty,
      duration_mins, total_marks, pass_marks,
      status, ends_at, created_at,
      profiles:created_by(full_name)`,
    )
    .order("created_at", { ascending: false });

  query = applyAvailabilityFilters(query);

  // Targeting: a student only sees exams published for their own
  // grade & department. This is exact-match, not optional — grade/department
  // aren't exposed as togglable filters in the UI.
  if (grade) query = query.eq("grade", grade);
  if (department) query = query.eq("department", department);

  if (search.trim()) {
    query = query.or(
      `title.ilike.%${search.trim()}%,description.ilike.%${search.trim()}%`,
    );
  }
  if (category.trim()) query = query.eq("category", category.trim());
  if (difficulty.trim()) query = query.eq("difficulty", difficulty.trim());

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getExamCategories({ grade = "", department = "" } = {}) {
  let query = supabase
    .from("exams")
    .select("category")
    .not("category", "is", null);
  query = applyAvailabilityFilters(query);

  if (grade) query = query.eq("grade", grade);
  if (department) query = query.eq("department", department);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const unique = [...new Set(data.map((r) => r.category))].sort();
  return unique;
}

export async function getStudentExamAttempts(studentId) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .select("id, exam_id, status")
    .eq("student_id", studentId);

  if (error) throw new Error(error.message);

  const statusMap = {};
  data?.forEach((attempt) => {
    statusMap[attempt.exam_id] = {
      status: attempt.status,
      attemptId: attempt.id,
    };
  });

  return statusMap;
}

export async function getExamById(
  examId,
  { grade = "", department = "" } = {},
) {
  let query = supabase
    .from("exams")
    .select(
      `
      id, title, description, category, difficulty,
      duration_mins, total_marks, pass_marks,
      status, ends_at, created_at,
      profiles:created_by ( full_name ),
      questions (
        id, body, type, options, marks, order_index
      )
    `,
    )
    .eq("id", examId);

  query = applyAvailabilityFilters(query);

  // Same targeting rule as getExams: a student can't load an exam meant
  // for a different grade/department, even by navigating straight to its
  // URL. When it doesn't match, .single() below returns a "no rows" error,
  // which the page already renders as the generic "Exam not found" state —
  // deliberately not distinguishing "doesn't exist" from "not yours to see".
  if (grade) query = query.eq("grade", grade);
  if (department) query = query.eq("department", department);

  const { data, error } = await query
    .order("order_index", { referencedTable: "questions", ascending: true })
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getInstructorExams(instructorId) {
  const { data, error } = await supabase
    .from("exams")
    .select(
      "id, title, category, difficulty, duration_mins, grade, department, starts_at, ends_at, status",
    )
    .eq("created_by", instructorId)
    .order("starts_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateExamStatus(examId, status, instructorId) {
  const { error } = await supabase.rpc("update_exam_status", {
    p_exam_id: examId,
    p_status: status,
    p_instructor_id: instructorId,
  });

  if (error) throw new Error(error.message);
}

export async function examHasSubmissions(examId) {
  const { count, error } = await supabase
    .from("exam_attempts")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId);

  if (error) throw new Error(error.message);
  return (count ?? 0) > 0;
}

// بنجيب عدد الـ submissions لكل الامتحانات بتاعة المدرّس دفعة واحدة
// بدل ما نسأل عن كل امتحان لوحده (N+1 queries)
export async function getSubmissionCountsByExamIds(examIds) {
  if (!examIds?.length) return {};

  const { data, error } = await supabase
    .from("exam_attempts")
    .select("exam_id")
    .in("exam_id", examIds);

  if (error) throw new Error(error.message);

  const counts = {};
  for (const row of data) {
    counts[row.exam_id] = (counts[row.exam_id] ?? 0) + 1;
  }
  return counts;
}

export async function deleteExam(examId, instructorId) {
  const { error } = await supabase.rpc("delete_exam", {
    p_exam_id: examId,
    p_instructor_id: instructorId,
  });

  if (error) throw new Error(error.message);
}
