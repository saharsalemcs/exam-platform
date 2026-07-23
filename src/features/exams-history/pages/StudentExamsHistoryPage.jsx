import { useUser } from "@/features/auth/hooks/useUser";
import { useStudentExamsHistory } from "../hooks/useStudentExamsHistory";
import { AlertTriangle, FileX2, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useExamSearch } from "@/features/exams/hooks/useExamSearch";
import { DIFFICULTIES } from "@/utils/constants";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import Button from "@/components/shared/Button";
import Table from "@/components/shared/Table";
import { studentHistoryColumns } from "../components/studentHistoryColumns";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import { useFilteredExams } from "@/hooks/useFilteredExams";

function StudentExamsHistoryPage() {
  const { data } = useUser();
  const studentId = data?.user?.id;
  const { studentExams, isFetchingStudentExams, studentExamsError } =
    useStudentExamsHistory({ studentId });
  const navigate = useNavigate();

  const {
    search,
    difficulty,
    setSearch,
    setDifficulty,
    clearFilters,
    hasActiveFilters,
    debouncedSearch,
  } = useExamSearch();

  const filteredExams = useFilteredExams(
    studentExams,
    debouncedSearch,
    difficulty,
    (attempt) => ({
      title: attempt.exams?.title,
      difficulty: attempt.exams?.difficulty,
    }),
  );

  const hasNoSubmissionsAtAll = studentExams.length === 0;
  const hasNoFilterResults =
    !hasNoSubmissionsAtAll && filteredExams.length === 0;

  return (
    <div className="flex flex-col gap-lg p-4">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Exams History
        </h2>
        <p className="text-[16px]" style={{ color: "var(--color-text-muted)" }}>
          {isFetchingStudentExams
            ? "Loading..."
            : `${filteredExams.length} submission${filteredExams.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* Search + Filters */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search exams..."
        filters={[
          {
            key: "difficulty",
            options: DIFFICULTIES,
            value: difficulty,
            onChange: setDifficulty,
            placeholder: "All Levels",
          },
        ]}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* content */}

      {isFetchingStudentExams && <LoadingSpinner />}

      {!isFetchingStudentExams && studentExamsError && (
        <EmptyState
          icon={AlertTriangle}
          title="Couldn't load your exams history"
          description={studentExamsError.message}
          variant="error"
          size="lg"
        />
      )}

      {!isFetchingStudentExams &&
        !studentExamsError &&
        hasNoSubmissionsAtAll && (
          <EmptyState
            icon={FileX2}
            title="No exams submitted yet"
            description="Your completed exams will show up here once you submit them."
            size="lg"
            action={
              <Button
                className="mt-8"
                onClick={() => navigate("/student/exams")}
              >
                Take an Exam
              </Button>
            }
          />
        )}

      {!isFetchingStudentExams && !studentExamsError && hasNoFilterResults && (
        <EmptyState
          icon={Search}
          title="No results match your filters"
          description="Try a different search term or clear the filters."
          size="lg"
          action={
            <Button variant="secondary" className="mt-8" onClick={clearFilters}>
              Clear Filters
            </Button>
          }
        />
      )}

      {!isFetchingStudentExams &&
        !studentExamsError &&
        filteredExams.length > 0 && (
          <Table columns={studentHistoryColumns} rows={studentExams} />
        )}
    </div>
  );
}

export default StudentExamsHistoryPage;
