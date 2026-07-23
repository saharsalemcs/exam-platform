import { useMemo } from "react";

/**
 * Filters a list of exams (or exam attempts) by search text and difficulty.
 *
 * @param {Array} items - list to filter
 * @param {string} debouncedSearch - debounced search text
 * @param {string} difficulty - selected difficulty value ("" = all)
 * @param {(item: any) => { title: string, difficulty: string }} getExamFields
 *   - maps an item to its title/difficulty. Defaults to reading them
 *     directly off the item, which works for exam rows. Pass a custom
 *     accessor for nested shapes, e.g. student history rows where the
 *     exam lives at `attempt.exams`.
 */
const defaultGetExamFields = (item) => ({
  title: item?.title,
  difficulty: item?.difficulty,
});

export function useFilteredExams(
  items,
  debouncedSearch,
  difficulty,
  getExamFields = defaultGetExamFields,
) {
  return useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return items.filter((item) => {
      const { title, difficulty: itemDifficulty } = getExamFields(item);

      const matchesSearch =
        !query || (title?.toLowerCase() ?? "").includes(query);
      const matchesDifficulty = !difficulty || itemDifficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [items, debouncedSearch, difficulty, getExamFields]);
}
