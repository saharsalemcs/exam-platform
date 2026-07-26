import { BookOpen, Funnel, Search, X } from "lucide-react";
import { RippleLoader } from "react-loadly";
import { useExams } from "../hooks/useExams";
import { useExamSearch } from "../hooks/useExamSearch";
import { useExamCategories } from "../hooks/useExamCategories";
import { useStudentExamStatus } from "../hooks/useStudentExamStatus";
import { DIFFICULTIES } from "@/utils/constants";
import EmptyState from "@/components/shared/EmptyState";
import ExamCard from "../components/ExamCard";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import { useMemo, useState } from "react";
import ClearButton from "@/components/shared/ClearButton";
import FilterModal from "@/components/shared/FilterModal";

function AvailableExamsPage() {
  const {
    search,
    category,
    difficulty,
    setSearch,
    setCategory,
    setDifficulty,
    clearFilters,
    debouncedSearch,
  } = useExamSearch();
  const { categories } = useExamCategories();

  const {
    exams: fetchedExams,
    isLoading,
    error,
  } = useExams({
    search: debouncedSearch,
    category,
    difficulty,
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [instructor, setInstructor] = useState("");

  const instructorOptions = useMemo(
    () =>
      [
        ...new Set(
          fetchedExams.map((e) => e.profiles?.full_name).filter(Boolean),
        ),
      ]
        .sort()
        .map((name) => ({ value: name, label: name })),
    [fetchedExams],
  );
  const exams = useMemo(
    () =>
      instructor
        ? fetchedExams.filter((e) => e.profiles?.full_name === instructor)
        : fetchedExams,
    [fetchedExams, instructor],
  );

  const { attemptStatus } = useStudentExamStatus();

  const hasActiveFilters = Boolean(
    search || category || difficulty || instructor,
  );
  const clearAllFilters = () => {
    clearFilters(); // بيمسح search + category + difficulty
    setInstructor("");
  };

  return (
    <div className="flex animate-[fade-up_0.4s_ease_both] flex-col gap-5 sm:gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Available Exams
        </h2>
        <p className="text-[16px]" style={{ color: "var(--color-text-muted)" }}>
          {isLoading
            ? "Loading..."
            : `${exams.length} exam${exams.length !== 1 ? "s" : ""} available`}
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
            options: categories.map((c) => ({ value: c, label: c })),
            value: category,
            onChange: setCategory,
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

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <RippleLoader
            showText={true}
            loadingText="Loading Exams..."
            color="#d4af58"
            secondaryColor="rgba(212,175,88,0.15)"
          />
        </div>
      ) : error ? (
        <EmptyState
          icon={X}
          title="Failed to load exams"
          description={error.message}
          variant="error"
          size="lg"
        />
      ) : exams.length === 0 ? (
        <EmptyState
          icon={hasActiveFilters ? Search : BookOpen}
          title={
            hasActiveFilters
              ? "No exams match your filters"
              : "No exams available yet"
          }
          description={
            hasActiveFilters
              ? "Try adjusting your search or clearing the filters."
              : "Check back later, your teacher will publish exams here."
          }
          variant={hasActiveFilters ? "search" : "default"}
          size="lg"
          action={<ClearButton onClick={clearAllFilters} />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam, i) => (
            <ExamCard
              exam={exam}
              key={exam.id}
              index={i}
              attemptInfo={attemptStatus[exam.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailableExamsPage;
