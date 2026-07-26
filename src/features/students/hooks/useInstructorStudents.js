import { useQuery } from "@tanstack/react-query";
import { getInstructorStudents } from "../services/studentsApi";

export function useInstructorStudents({ instructorId }) {
  const {
    data: students,
    isPending: isFetchingStudents,
    error: studentsError,
  } = useQuery({
    queryKey: ["instructor-students", instructorId],
    queryFn: () => getInstructorStudents(instructorId),
    enabled: !!instructorId,
  });

  return { students: students ?? [], isFetchingStudents, studentsError };
}
