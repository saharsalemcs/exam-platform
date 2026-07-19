import { calculatePercentage } from "@/lib/utils";
import supabase from "@/services/supabase";

export async function getStudentDashboardStats(studentId) {
  // const percentage = calculatePercentage(attempt.score, totalMarks);

  const { data: attempts, error: attemptsErr } = await supabase
    .from("exam_attempts")
    .select(
      `
      id, score, total_marks, time_taken, submitted_at, status,
      exams (
        id, title, pass_marks,
        instructor:profiles!created_by ( full_name )
      )
    `,
    )
    .eq("student_id", studentId)
    .in("status", ["submitted", "timed_out", "violated"])
    .order("submitted_at", { ascending: true });

  if (attemptsErr) throw new Error(attemptsErr.message);
  const finished = attempts ?? [];
  const totalExams = finished.length;

  const percentages = finished.map((a) =>
    calculatePercentage(a.score, a.total_marks),
  );

  const averageScore = percentages.length
    ? Math.round(
        percentages.reduce((sum, p) => sum + p, 0) / percentages.length,
      )
    : 0;
  const highestScore = percentages.length ? Math.max(...percentages) : 0;
  const passedCount = finished.filter(
    (a) => a.score >= (a.exams?.pass_marks ?? 0),
  ).length;
  const passRate = totalExams
    ? Math.round((passedCount / totalExams) * 100)
    : 0;

  return {
    totalExams,
    averageScore,
    highestScore,
    passRate,
  };
}
