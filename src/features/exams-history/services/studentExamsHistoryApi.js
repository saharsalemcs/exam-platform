import supabase from "@/services/supabase";

export async function getExamsHistory(studentId) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .select(
      `
      id,
      score,
      total_marks,
      time_taken,
      submitted_at,
      status,
      exams (
        id,
        title,
        difficulty,
        category,
        pass_marks,
        instructor:profiles!created_by ( full_name )
      )
    `,
    )
    .eq("student_id", studentId)
    .in("status", ["submitted", "timed_out", "violated"])
    .order("submitted_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
