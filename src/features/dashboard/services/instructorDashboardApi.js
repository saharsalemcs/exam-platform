import { calculatePercentage } from "@/lib/utils";
import supabase from "@/services/supabase";

const REASON_MAP = {
  submitted: "MANUAL",
  timed_out: "TIME_UP",
  violated: "CHEAT",
};

export async function getInstructorDashboardStats(instructorId) {
  const { data: exams, error: examsErr } = await supabase
    .from("exams")
    .select("id, title, starts_at")
    .eq("created_by", instructorId)
    .order("starts_at", { ascending: true });

  if (examsErr) throw new Error(examsErr.message);

  const examIds = (exams ?? []).map((e) => e.id);
  const totalExams = exams?.length ?? 0;

  if (examIds.length === 0) {
    return {
      totalExams: 0,
      totalSubmissions: 0,
      studentsAverageScore: 0,
      totalStudents: 0,
      performanceOverTime: [],
      submissionsBreakdown: { passed: 0, failed: 0, total: 0 },
      recentSubmissions: [],
    };
  }

  const { data: attempts, error: attemptsErr } = await supabase
    .from("exam_attempts")
    .select(
      `
      id, exam_id, student_id, score, total_marks, status, submitted_at,
      student:profiles!student_id ( full_name ),
      exams!inner ( title, pass_marks )
    `,
    )
    .in("exam_id", examIds)
    .in("status", ["submitted", "timed_out", "violated"])
    .order("submitted_at", { ascending: false });

  if (attemptsErr) throw new Error(attemptsErr.message);

  const finished = attempts ?? [];
  const totalSubmissions = finished.length;
  const totalStudents = new Set(finished.map((a) => a.student_id)).size;
  // الطلاب ال امتحنوا امتحانات الراجل دا بس ، مش كل الطلاب ال ف المنصة
  const percentages = finished.map((a) =>
    calculatePercentage(a.score, a.total_marks),
  );
  const studentsAverageScore = percentages.length
    ? Math.round(percentages.reduce((s, p) => s + p, 0) / percentages.length)
    : 0;

  const passedCount = finished.filter(
    (a) => a.score >= (a.exams?.pass_marks ?? 0),
  ).length;
  const submissionsBreakdown = {
    passed: passedCount,
    failed: totalSubmissions - passedCount,
    total: totalSubmissions,
  };

  // 3. Performance Over Time = متوسط الدرجة *لكل امتحان* (مش لكل محاولة)،
  // بترتيب الامتحانات الزمني، وبس الامتحانات اللي عندها محاولات فعلاً
  const attemptsByExam = {};
  finished.forEach((a) => {
    if (!attemptsByExam[a.exam_id]) attemptsByExam[a.exam_id] = [];
    attemptsByExam[a.exam_id].push(calculatePercentage(a.score, a.total_marks));
  });

  const performanceOverTime = (exams ?? [])
    .filter((e) => attemptsByExam[e.id]?.length)
    .map((e) => {
      const scores = attemptsByExam[e.id];
      const avg = Math.round(scores.reduce((s, p) => s + p, 0) / scores.length);
      return { id: e.id, title: e.title, percentage: avg };
    });

  // 4. آخر 5 محاولات
  const recentSubmissions = finished.slice(0, 5).map((a) => ({
    id: a.id,
    examTitle: a.exams?.title ?? "—",
    studentName: a.student?.full_name ?? "—",
    percentage: calculatePercentage(a.score, a.total_marks),
    passed: a.score >= (a.exams?.pass_marks ?? 0),
    reason: REASON_MAP[a.status] ?? a.status,
    submittedAt: a.submitted_at,
  }));

  return {
    totalExams,
    totalSubmissions,
    studentsAverageScore,
    totalStudents,
    performanceOverTime,
    submissionsBreakdown,
    recentSubmissions,
  };
}
