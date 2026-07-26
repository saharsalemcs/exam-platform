import React, { useMemo, useState } from "react";
import { useInstructorExamsHistory } from "../hooks/useInstructorExamsHistory";
import { useUser } from "@/features/auth/hooks/useUser";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import FilterModal from "@/components/shared/FilterModal";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { AlertTriangle, FileX2, Funnel, Search } from "lucide-react";
import { instructorHistoryColumns } from "../components/instructorHistoryColumns";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import Table from "@/components/shared/Table";
import {
  DEPARTMENTS,
  DIFFICULTIES,
  GRADES,
  STATUS_OPTIONS,
} from "@/utils/constants";
import { useExamSearch } from "@/features/exams/hooks/useExamSearch";
import { toOptions } from "@/utils/helpers";
import ClearButton from "@/components/shared/ClearButton";
import { isPassed } from "../hooks/examHistoryHelpers";

function InstructorExamHistoryPage() {
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;
  const { submissions, isFetchingSubmissions, submissionsError } =
    useInstructorExamsHistory({ instructorId });
  const {
    search,
    difficulty,
    setSearch,
    setDifficulty,
    clearFilters,
    debouncedSearch,
  } = useExamSearch();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [grade, setGrade] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");

  const hasActiveFilters = Boolean(
    search || difficulty || grade || department || subject || status,
  );

  const clearAllFilters = () => {
    clearFilters();
    setGrade("");
    setDepartment("");
    setSubject("");
    setStatus("");
  };
  const subjectOptions = useMemo(
    () =>
      [...new Set(submissions.map((s) => s.exams?.category).filter(Boolean))]
        .sort()
        .map((sub) => ({ value: sub, label: sub })),
    [submissions],
  );

  const filterValues = { difficulty, grade, department, subject, status };

  const filteredSubmissions = useFilteredItems(
    submissions,
    debouncedSearch,
    filterValues,
    (attempt) => ({
      title: attempt.exams?.title,
      difficulty: attempt.exams?.difficulty,
      grade: attempt.exams?.grade,
      department: attempt.exams?.department,
      subject: attempt.exams?.category,
      status: isPassed(attempt.score, attempt.exams?.pass_marks)
        ? "passed"
        : "failed",
    }),
  );

  const hasNoSubmissionsAtAll = submissions.length === 0;
  const hasNoFilterResults =
    !hasNoSubmissionsAtAll && filteredSubmissions.length === 0;

  return (
    <div className="flex flex-col gap-lg">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-text">
          Exams History
        </h1>
        <p className="text-sm text-text-muted">
          {isFetchingSubmissions
            ? "Loading..."
            : `${submissions.length} submission${submissions.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* Search + Filters trigger */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <SearchFilterBar
          className="flex-1"
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search submissions..."
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
            key: "grade",
            label: "Grade",
            options: toOptions(GRADES),
            value: grade,
            onChange: setGrade,
          },
          {
            key: "department",
            label: "Department",
            options: toOptions(DEPARTMENTS),
            value: department,
            onChange: setDepartment,
          },
          {
            key: "subject",
            label: "Subject",
            options: subjectOptions,
            value: subject,
            onChange: setSubject,
          },
          {
            key: "status",
            label: "Status",
            options: STATUS_OPTIONS,
            value: status,
            onChange: setStatus,
          },
        ]}
      />

      {/* content */}
      {isFetchingSubmissions && <LoadingSpinner />}

      {!isFetchingSubmissions && submissionsError && (
        <EmptyState
          icon={AlertTriangle}
          title="Couldn't load your exams history"
          description={submissionsError.message}
          variant="error"
          size="lg"
        />
      )}

      {!isFetchingSubmissions && !submissionsError && hasNoSubmissionsAtAll && (
        <EmptyState
          icon={FileX2}
          title="No submissions yet"
          description="Once students start submitting your exams, they'll show up here."
          size="lg"
        />
      )}

      {!isFetchingSubmissions && !submissionsError && hasNoFilterResults && (
        <EmptyState
          icon={Search}
          title="No results match your filters"
          description="Try a different search term or clear the filters."
          size="lg"
          action={<ClearButton onClick={clearAllFilters} />}
        />
      )}

      {!isFetchingSubmissions &&
        !submissionsError &&
        filteredSubmissions.length > 0 && (
          <Table
            columns={instructorHistoryColumns}
            rows={filteredSubmissions}
          />
        )}
    </div>
  );
}

export default InstructorExamHistoryPage;
