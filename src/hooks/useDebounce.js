import { useEffect, useState } from "react";

export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(
    function () {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timer);
    },
    [value, delay],
  );

  return debouncedValue;
}
