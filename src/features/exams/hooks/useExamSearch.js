import { useEffect, useRef, useState } from "react";

export function useExamSearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const timerRef = useRef(null);

  useEffect(
    function () {
      if (search === "") {
        if (timerRef.current) clearTimeout(timerRef.current);
        setDebouncedSearch("");
        return;
      }

      timerRef.current = setTimeout(() => {
        setDebouncedSearch(search);
      }, 400);

      return () => clearTimeout(timerRef.current);
    },
    [search],
  );

  function clearFilters() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDebouncedSearch("");
    setSearch("");
    setCategory("");
    setDifficulty("");
  }

  const hasActiveFilters =
    search.trim() !== "" || category !== "" || difficulty !== "";

  return {
    search,
    category,
    difficulty,
    setSearch,
    setCategory,
    setDifficulty,
    clearFilters,
    hasActiveFilters,
    debouncedSearch,
  };
}
