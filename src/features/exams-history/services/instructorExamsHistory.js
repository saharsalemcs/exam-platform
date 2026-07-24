import supabase from "@/services/supabase";

export async function getInstructorExamsHistory(instructorId) {
  const { data, error } = await supabase
    .from("exam_attempts")
    .select(
      `
      id,
      score,
      total_marks,
      status,
      submitted_at,
      student:profiles!student_id ( full_name ),
      exams!inner (
        title,
        category,
        difficulty,
        department,
        grade,
        pass_marks,
        created_by
      )
    `,
    )
    .eq("exams.created_by", instructorId)
    .in("status", ["submitted", "timed_out", "violated"])
    .order("submitted_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
