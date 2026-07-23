import { BookOpen, Search, X } from "lucide-react";
import { RippleLoader } from "react-loadly";
import { useExams } from "../hooks/useExams";
import { useExamSearch } from "../hooks/useExamSearch";
import { useExamCategories } from "../hooks/useExamCategories";
import { useStudentExamStatus } from "../hooks/useStudentExamStatus";
import { DIFFICULTIES } from "@/utils/constants";
import EmptyState from "@/components/shared/EmptyState";
import EmptyStateAction from "@/components/shared/EmptyStateAction";
import ExamCard from "../components/ExamCard";
import SearchFilterBar from "@/components/shared/SearchFilterBar";
import { useFilteredExams } from "@/hooks/useFilteredExams";

function AvailableExamsPage() {
  const {
    search,
    category,
    difficulty,
    setSearch,
    setCategory,
    setDifficulty,
    clearFilters,
    hasActiveFilters,
    debouncedSearch,
  } = useExamSearch();

  const { exams, isLoading, error } = useExams({
    search: debouncedSearch,
    category,
    difficulty,
  });
  const { categories } = useExamCategories();
  const { attemptStatus } = useStudentExamStatus();
  const filteredExams = useFilteredExams(exams, debouncedSearch, difficulty);

  return (
    <div className="flex animate-[fade-up_0.4s_ease_both] flex-col gap-5 sm:gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-1 p-4">
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

      {/* Search +  Filters */}
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search exams..."
        filters={[
          categories.length > 0 && {
            key: "category",
            options: categories.map((c) => ({ value: c, label: c })),
            value: category,
            onChange: setCategory,
            placeholder: "All Categories",
          },
          {
            key: "difficulty",
            options: DIFFICULTIES,
            value: difficulty,
            onChange: setDifficulty,
            placeholder: "All Levels",
          },
        ].filter(Boolean)}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
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
          size="md"
          action={
            hasActiveFilters && (
              <EmptyStateAction icon={X} variant="ghost" onClick={clearFilters}>
                Clear
              </EmptyStateAction>
            )
          }
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
