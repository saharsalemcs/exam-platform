import { useNavigate } from "react-router-dom";
import Button from "@/components/shared/Button";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import { useExamsManagement } from "../hooks/useExamsManagement";
import { useUser } from "@/features/auth/hooks/useUser";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { AlertTriangle, Search } from "lucide-react";
import { buildExamManagementColumns } from "../components/ExamManagementColumns";
import Table from "@/components/shared/Table";
import { useExamSearch } from "../hooks/useExamSearch";
import { useFilteredExams } from "@/hooks/useFilteredExams";
import { DIFFICULTIES } from "@/utils/constants";

function ExamManagementPage() {
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;
  const {
    exams: instructorExams,
    isFetchingExams,
    examsError,
  } = useExamsManagement({
    instructorId,
  });
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
    instructorExams,
    debouncedSearch,
    difficulty,
  );

  const columns = buildExamManagementColumns({
    // onStatusChange: (examId, status) => updateStatus({ examId, status }),
    // onEdit: handleEdit,
    // onDelete: setExamToDelete,
    // updatingExamId: isUpdatingStatus ? statusVars?.examId : checkingEditId,
  });

  if (isFetchingExams) return <LoadingSpinner />;

  if (examsError) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Couldn't load your exams"
        description={examsError.message}
        variant="error"
        size="lg"
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Exam Management</h1>
          <p className="mt-1 text-[15px] text-text-muted">
            {isFetchingExams
              ? "Loading..."
              : `${instructorExams.length} exam${instructorExams.length !== 1 ? "s" : ""} found, Manage, edit, and track all of them. `}
          </p>
        </div>
        <Button
          onClick={() => navigate("/instructor/exam-wizard")}
          variant="primary"
          size="md"
          className="w-full sm:w-auto"
        >
          + New Exam
        </Button>
      </div>

      {/* Search and filter */}
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
      {instructorExams.length === 0 ? (
        <EmptyState
          title="No exams yet"
          description="Exams you create will show up here, create one now"
          size="lg"
          action={
            <Button
              onClick={() => navigate("/instructor/exam-wizard")}
              variant="primary"
              size="md"
              className="mt-8 shadow-glow transition-transform hover:scale-105"
            >
              + New Exam
            </Button>
          }
        />
      ) : filteredExams.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No results match your filters"
          description="Try a different search term or clear the filters."
          size="lg"
          action={
            <Button variant="secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
          }
        />
      ) : (
        <Table columns={columns} rows={filteredExams} />
      )}
    </div>
  );
}

export default ExamManagementPage;
