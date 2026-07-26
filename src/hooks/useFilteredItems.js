import { useMemo } from "react";

/**
 * Filters a list of items by search text plus an arbitrary set of
 * exact-match filters (difficulty, grade, department, status, ...).
 *
 * @param {Array} items - list to filter
 * @param {string} debouncedSearch - debounced search text
 * @param {Object} filterValues - e.g. { difficulty: "easy", grade: "" }
 *   empty string / falsy value means "no filter on this key"
 * @param {(item: any) => Record<string, any>} getFields
 *   - maps an item to a flat object whose keys match filterValues' keys,
 *     plus a `title` key for search. Defaults to reading props directly
 *     off the item; pass a custom accessor for nested shapes.
 */
const defaultGetFields = (item) => item;

export function useFilteredItems(
  items,
  debouncedSearch,
  filterValues,
  getFields = defaultGetFields,
) {
  return useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return items.filter((item) => {
      const fields = getFields(item);

      const matchesSearch =
        !query || (fields.title?.toLowerCase() ?? "").includes(query);

      const matchesFilters = Object.entries(filterValues).every(
        ([key, value]) => !value || fields[key] === value,
      );

      return matchesSearch && matchesFilters;
    });
  }, [items, debouncedSearch, filterValues, getFields]);
}
