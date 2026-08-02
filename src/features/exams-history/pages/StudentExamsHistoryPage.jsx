import { useMemo, useState } from "react";
import { useUser } from "@/features/auth/hooks/useUser";
import { useStudentExamsHistory } from "../hooks/useStudentExamsHistory";
import { AlertTriangle, FileX2, Funnel, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useExamSearch } from "@/features/exams/hooks/useExamSearch";
import { DIFFICULTIES } from "@/utils/constants";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import Button from "@/components/shared/Button";
import Table from "@/components/shared/Table";
import { studentHistoryColumns } from "../components/studentHistoryColumns";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import FilterModal from "@/components/shared/FilterModal";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import ClearButton from "@/components/shared/ClearButton";

function StudentExamsHistoryPage() {
  const { data } = useUser();
  const studentId = data?.profile?.id;
  const { studentExams, isFetchingStudentExams, studentExamsError } =
    useStudentExamsHistory({ studentId });
  const navigate = useNavigate();

  const {
    search,
    difficulty,
    setSearch,
    setDifficulty,
    clearFilters,
    debouncedSearch,
  } = useExamSearch();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [instructor, setInstructor] = useState("");

  const subjectOptions = useMemo(
    () =>
      [...new Set(studentExams.map((a) => a.exams?.category).filter(Boolean))]
        .sort()
        .map((c) => ({ value: c, label: c })),
    [studentExams],
  );

  const instructorOptions = useMemo(
    () =>
      [
        ...new Set(
          studentExams
            .map((a) => a.exams?.instructor?.full_name)
            .filter(Boolean),
        ),
      ]
        .sort()
        .map((name) => ({ value: name, label: name })),
    [studentExams],
  );

  const hasActiveFilters = Boolean(
    search || difficulty || subject || instructor,
  );

  const clearAllFilters = () => {
    clearFilters(); // بيمسح search + difficulty
    setSubject("");
    setInstructor("");
  };

  const filterValues = { difficulty, subject, instructor };

  const filteredExams = useFilteredItems(
    studentExams,
    debouncedSearch,
    filterValues,
    (attempt) => ({
      title: attempt.exams?.title,
      difficulty: attempt.exams?.difficulty,
      subject: attempt.exams?.category,
      instructor: attempt.exams?.instructor?.full_name,
    }),
  );

  const hasNoSubmissionsAtAll = studentExams.length === 0;
  const hasNoFilterResults =
    !hasNoSubmissionsAtAll && filteredExams.length === 0;

  return (
    <div className="flex flex-col gap-lg">
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

      {/* Search + Filters trigger */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <SearchFilterBar
          className="flex-1"
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search exams..."
          filters={[]}
          hasActiveFilters={false}
          onClearFilters={() => {}}
        />

        <button
          title="Filter By"
          onClick={() => setIsFilterModalOpen(true)}
          className="flex w-fit cursor-pointer items-center rounded-md bg-surface p-md text-base font-medium text-text-muted"
        >
          <Funnel />
        </button>

        {hasActiveFilters && <ClearButton onClick={clearAllFilters} />}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onClearAll={clearAllFilters}
        sections={[
          {
            key: "difficulty",
            label: "Difficulty",
            options: DIFFICULTIES,
            value: difficulty,
            onChange: setDifficulty,
          },
          {
            key: "subject",
            label: "Subject",
            options: subjectOptions,
            value: subject,
            onChange: setSubject,
          },
          {
            key: "instructor",
            label: "Instructor",
            options: instructorOptions,
            value: instructor,
            onChange: setInstructor,
          },
        ]}
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
          action={<ClearButton onClick={clearAllFilters} />}
        />
      )}

      {!isFetchingStudentExams &&
        !studentExamsError &&
        filteredExams.length > 0 && (
          <Table columns={studentHistoryColumns} rows={filteredExams} />
        )}
    </div>
  );
}

export default StudentExamsHistoryPage;
