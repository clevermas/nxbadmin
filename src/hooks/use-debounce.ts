import { useCallback, useEffect, useState } from "react";

export const useDebounce = (
  value: string,
  delay: number,
  onChange?: (value: string) => void,
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const onDebounce = useCallback(
    (value: string) => onChange?.(value),
    [onChange],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value !== debouncedValue) {
        setDebouncedValue(value);
        onDebounce(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue, onDebounce]);

  return debouncedValue;
};
