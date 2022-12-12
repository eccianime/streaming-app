import { useState, useEffect, useMemo } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const newDelay = useMemo(() => delay, [delay]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, newDelay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, newDelay]);

  return debouncedValue;
};

export default useDebounce;
