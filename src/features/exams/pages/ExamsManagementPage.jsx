import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/shared/Button";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import FilterModal from "@/components/shared/FilterModal";
import { useExamsManagement } from "../hooks/useExamsManagement";
import { useUser } from "@/features/auth/hooks/useUser";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { AlertTriangle, Funnel, Search, SlidersHorizontal } from "lucide-react";
import { buildExamManagementColumns } from "../components/ExamManagementColumns";
import Table from "@/components/shared/Table";
import { useExamSearch } from "../hooks/useExamSearch";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import { DIFFICULTIES } from "@/utils/constants";
import { useUpdateExamStatus } from "../hooks/useUpdateExamStatus";
import { useDeleteExam } from "../hooks/useDeleteExam";
import ConfirmDeleteExamModal from "../components/ConfirmDeleteExamModal";
import ClearButton from "@/components/shared/ClearButton";
import { getEffectiveStatus } from "../helpers/getEffectiveStatus";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
];

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
  const { updateStatus, isUpdatingStatus, statusVars } = useUpdateExamStatus();
  const { removeExam, isDeletingExam } = useDeleteExam();
  const [examToDelete, setExamToDelete] = useState(null);

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
  const [status, setStatus] = useState("");

  const subjectOptions = useMemo(
    () =>
      [...new Set(instructorExams.map((e) => e.category).filter(Boolean))]
        .sort()
        .map((s) => ({ value: s, label: s })),
    [instructorExams],
  );

  const hasActiveFilters = Boolean(search || difficulty || subject || status);

  const clearAllFilters = () => {
    clearFilters(); // بيمسح search + difficulty من useExamSearch
    setSubject("");
    setStatus("");
  };

  const filterValues = { difficulty, subject, status };

  const filteredExams = useFilteredItems(
    instructorExams,
    debouncedSearch,
    filterValues,
    (exam) => ({
      title: exam.title,
      difficulty: exam.difficulty,
      subject: exam.category,
      status: getEffectiveStatus(exam),
    }),
  );

  function handleEdit(exam) {
    navigate(`/instructor/exam-wizard/${exam.id}?step=1`);
  }

  function handleConfirmDelete() {
    if (!examToDelete) return;
    removeExam(examToDelete.id, {
      onSuccess: () => setExamToDelete(null),
    });
  }

  const columns = buildExamManagementColumns({
    onStatusChange: (examId, status) => updateStatus({ examId, status }),
    onEdit: handleEdit,
    onDelete: setExamToDelete,
    updatingExamId: isUpdatingStatus ? statusVars?.examId : null,
    // بتعطل الصف ال بيتعدل او ال بيتمسح بس
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
            key: "status",
            label: "Status",
            options: STATUS_OPTIONS,
            value: status,
            onChange: setStatus,
          },
        ]}
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
          action={<ClearButton onClick={clearAllFilters} />}
        />
      ) : (
        <Table columns={columns} rows={filteredExams} />
      )}

      <ConfirmDeleteExamModal
        isOpen={!!examToDelete}
        onClose={() => setExamToDelete(null)}
        onConfirm={handleConfirmDelete}
        examTitle={examToDelete?.title}
        isDeleting={isDeletingExam}
      />
    </div>
  );
}

export default ExamManagementPage;
