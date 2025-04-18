import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a search query string
 * @param value search query string
 * @param delay delay time in milliseconds, default is 500ms
 * @returns debounced search query string
 */
export const useDebounce = (value: string, delay = 500) => {
  const [searchQuery, setSearchQuery] = useState(value);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return searchQuery;
}