import { BookOpen, Search, X } from "lucide-react";
import { RippleLoader } from "react-loadly";
import { useExams } from "../hooks/useExams";
import { useExamSearch } from "../hooks/useExamSearch";
import { useExamCategories } from "../hooks/useExamCategories";
import { useStudentExamStatus } from "../hooks/useStudentExamStatus";
import FilterSelect from "@/components/shared/FilterSelect";
import EmptyState from "@/components/shared/EmptyState";
import EmptyStateAction from "@/components/shared/EmptyStateAction";
import ExamCard from "../components/ExamCard";

const DIFFICULTIES = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

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

  return (
    <div className="flex animate-[fade-up_0.4s_ease_both] flex-col gap-5 sm:gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h2
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Available Exams
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {isLoading
            ? "Loading..."
            : `${exams.length} exam${exams.length !== 1 ? "s" : ""} available`}
        </p>
      </div>

      {/* Search +  Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
            style={{ color: "var(--color-text-muted)" }}
            size={15}
          />
          <input
            type="search"
            placeholder="Search exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[var(--radius-sm)] py-2.5 pr-4 pl-9 transition-all duration-150 outline-none"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-primary)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Category filter */}
          {categories.length > 0 && (
            <FilterSelect
              options={categories.map((c) => ({ value: c, label: c }))}
              value={category}
              onChange={setCategory}
              className="min-w-[120px] flex-1 sm:min-w-[145px] sm:flex-none"
              placeholder="All Categories"
            />
          )}
          {/* Difficulty filter */}
          <FilterSelect
            options={DIFFICULTIES}
            value={difficulty}
            onChange={setDifficulty}
            className="min-w-[110px] flex-1 sm:min-w-[145px] sm:flex-none"
            placeholder="All Levels"
          />

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              aria-label="Clear filters"
              className="flex shrink-0 cursor-pointer items-center gap-1 rounded-[var(--radius-sm)] px-2.5 py-2.5 text-sm transition-all duration-150"
              style={{
                color: "var(--color-text-muted)",
                backgroundColor: "transparent",
                border: "1px solid var(--color-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(200,93,106,0.06)";
                e.currentTarget.style.borderColor = "rgba(200,93,106,0.3)";
                e.currentTarget.style.color = "var(--color-danger)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
            >
              <X size={15} />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

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
