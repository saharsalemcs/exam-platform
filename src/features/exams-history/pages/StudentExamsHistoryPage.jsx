import { useMemo } from "react";
import { useUser } from "@/features/auth/hooks/useUser";
import { useStudentExamsHistory } from "../hooks/useStudentExamsHistory";
import { AlertTriangle, FileX2, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useExamSearch } from "@/features/exams/hooks/useExamSearch";
import { DIFFICULTIES } from "@/utils/constants";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import Button from "@/components/shared/Button";
import FilterSelect from "@/components/shared/FilterSelect";
import Table from "@/components/shared/Table";
import { studentHistoryColumns } from "../components/studentHistoryColumns";

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

  const filteredExams = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return studentExams.filter((attempt) => {
      const title = attempt.exams?.title?.toLowerCase() ?? "";
      const matchesSearch = !query || title.includes(query);
      const matchesDifficulty =
        !difficulty || attempt.exams?.difficulty === difficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [studentExams, debouncedSearch, difficulty]);

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
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="relative min-w-[100px] flex-1">
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

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <FilterSelect
            options={DIFFICULTIES}
            value={difficulty}
            onChange={setDifficulty}
            className="min-w-[110px] flex-1 sm:min-w-[145px] sm:flex-none"
            placeholder="All Levels"
          />

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
