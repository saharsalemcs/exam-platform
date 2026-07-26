import supabase from "@/services/supabase";

export async function getInstructorStudents(instructorId) {
  const { data, error } = await supabase.rpc("get_instructor_students", {
    p_instructor_id: instructorId,
  });

  if (error) throw new Error(error.message);
  return data ?? [];
}
