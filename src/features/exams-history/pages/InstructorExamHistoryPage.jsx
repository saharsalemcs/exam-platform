import React from "react";
import { useInstructorExamsHistory } from "../hooks/useInstructorExamsHistory";
import { useUser } from "@/features/auth/hooks/useUser";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { AlertTriangle, FileX2, Search } from "lucide-react";
import { instructorHistoryColumns } from "../components/instructorHistoryColumns";
import { useExamSearch } from "@/features/exams/hooks/useExamSearch";
import { useFilteredExams } from "@/hooks/useFilteredExams";
import Button from "@/components/shared/Button";
import Table from "@/components/shared/Table";
import { DEPARTMENTS, GRADES } from "@/utils/constants";

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
    hasActiveFilters,
    debouncedSearch,
  } = useExamSearch();
  const filteredSubmissions = useFilteredExams(
    submissions,
    debouncedSearch,
    difficulty,
    (attempt) => ({
      title: attempt.exams?.title,
      difficulty: attempt.exams?.difficulty,
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

      {/* Search + Filters */}

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
          action={
            <Button variant="secondary" className="mt-8" onClick={clearFilters}>
              Clear Filters
            </Button>
          }
        />
      )}

      {!isFetchingSubmissions &&
        !submissionsError &&
        filteredSubmissions.length > 0 && (
          <Table columns={instructorHistoryColumns} rows={submissions} />
        )}
    </div>
  );
}

export default InstructorExamHistoryPage;
