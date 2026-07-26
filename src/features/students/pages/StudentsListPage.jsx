import { useMemo, useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";
import { useInstructorStudents } from "../hooks/useInstructorStudents";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { instructorStudentsColumns } from "../components/instructorStudentsColumns";
import Table from "@/components/shared/Table";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import Button from "@/components/shared/Button";

function StudentsListPage() {
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;

  const { students, isFetchingStudents, studentsError } = useInstructorStudents(
    { instructorId },
  );

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [department, setDepartment] = useState("");

  const gradeOptions = useMemo(
    () => [...new Set(students.map((s) => s.grade).filter(Boolean))].sort(),
    [students],
  );
  const departmentOptions = useMemo(
    () =>
      [...new Set(students.map((s) => s.department).filter(Boolean))].sort(),
    [students],
  );
  const hasActiveFilters = Boolean(search || grade || department);

  const clearFilters = () => {
    setSearch("");
    setGrade("");
    setDepartment("");
  };

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((s) => {
      const matchesSearch =
        !query || s.full_name?.toLowerCase().includes(query);
      const matchesGrade = !grade || s.grade === grade;
      const matchesDepartment = !department || s.department === department;
      return matchesSearch && matchesGrade && matchesDepartment;
    });
  }, [students, search, grade, department]);

  if (isFetchingStudents) return <LoadingSpinner />;

  if (studentsError) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Couldn't load students"
        description={studentsError.message}
        variant="error"
        size="lg"
      />
    );
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-text">
          Students List
        </h1>
        <p className="text-text-muted">
          {filteredStudents.length} student
          {filteredStudents.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Search + Filters */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search students..."
        filters={[
          {
            key: "grade",
            options: gradeOptions,
            value: grade,
            onChange: setGrade,
            placeholder: "All Grades",
          },
          {
            key: "department",
            options: departmentOptions,
            value: department,
            onChange: setDepartment,
            placeholder: "All Departments",
          },
        ]}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {filteredStudents.length === 0 ? (
        <EmptyState
          title="No students found"
          description="Try a different search or filter."
          size="lg"
          action={
            hasActiveFilters ? (
              <Button
                variant="secondary"
                className="mt-8"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <Table
          columns={instructorStudentsColumns}
          rows={filteredStudents}
          getRowKey={(s) => s.student_id}
        />
      )}
    </div>
  );
}

export default StudentsListPage;
