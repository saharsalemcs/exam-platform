//  useExamSearch => manage UI state  (search + filter)

import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

export function useExamSearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const debouncedSearch = useDebounce(search);

  function clearFilters() {
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
