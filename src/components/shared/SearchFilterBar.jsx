import { Search, X } from "lucide-react";
import FilterSelect from "./FilterSelect";
import ClearButton from "./ClearButton";

export default function SearchFilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  hasActiveFilters,
  onClearFilters,
  className = "",
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      {/* Search */}
      <div className="relative min-w-[200px] flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
          style={{ color: "var(--color-text-muted)" }}
          size={15}
        />
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-[var(--radius-sm)] py-2.5 pr-4 pl-9 transition-all duration-150 outline-none"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {filters.map((filter) => (
          <FilterSelect
            key={filter.key}
            options={filter.options}
            value={filter.value}
            onChange={filter.onChange}
            placeholder={filter.placeholder}
            className={
              filter.className ??
              "min-w-[120px] flex-1 sm:min-w-[145px] sm:flex-none"
            }
          />
        ))}

        {hasActiveFilters && <ClearButton onClick={onClearFilters} />}
      </div>
    </div>
  );
}
