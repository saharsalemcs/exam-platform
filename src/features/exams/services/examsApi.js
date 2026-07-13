import supabase from "@/services/supabase";

export async function getExams({
  search = "",
  category = "",
  difficulty = "",
} = {}) {
  let query = supabase
    .from("exams")
    .select(
      `id, title, description, category, difficulty,
      duration_mins, total_marks, pass_marks,
      is_published, created_at,
      profiles:created_by(full_name)`,
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });

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

export async function getExamCategories() {
  const { data, error } = await supabase
    .from("exams")
    .select("category")
    .eq("is_published", true)
    .not("category", "is", null);

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

export async function getExamById(examId) {
  const { data, error } = await supabase
    .from("exams")
    .select(
      `
      id, title, description, category, difficulty,
      duration_mins, total_marks, pass_marks,
      is_published, created_at,
      profiles:created_by ( full_name ),
      questions (
        id, body, type, options,
        correct_answer, marks, order_index
      )
    `,
    )
    .eq("id", examId)
    .order("order_index", { referencedTable: "questions", ascending: true })
    .single();

  if (error) throw new Error(error.message);

  return data;
}
