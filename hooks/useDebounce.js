import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDeboundcedValue] = useState(value);


  useEffect(() => {
    const handler = setTimeout(() => setDeboundcedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}