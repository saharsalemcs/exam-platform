import { calculatePercentage } from "@/lib/utils";
import supabase from "@/services/supabase";

export async function getStudentDashboardStats(studentId) {
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
  const finishedAttempts = attempts ?? [];
  const totalExams = finishedAttempts.length;

  const percentages = finishedAttempts.map((a) =>
    calculatePercentage(a.score, a.total_marks),
  );

  // 4 Stats
  const averageScore = percentages.length
    ? Math.round(
        percentages.reduce((sum, p) => sum + p, 0) / percentages.length,
      )
    : 0;
  const highestScore = percentages.length ? Math.max(...percentages) : 0;
  const passedCount = finishedAttempts.filter(
    (a) => a.score >= (a.exams?.pass_marks ?? 0),
  ).length;
  const passRate = totalExams
    ? Math.round((passedCount / totalExams) * 100)
    : 0;

  // Performance over Time >> array of objects >> [{id, title, percentage}, {}, ... ]
  const performanceOverTime = finishedAttempts.map((a) => ({
    id: a.id,
    title: a.exams?.title ?? "—",
    percentage: calculatePercentage(a.score, a.total_marks),
  }));

  return {
    totalExams,
    averageScore,
    highestScore,
    passRate,
    performanceOverTime,
  };
}
