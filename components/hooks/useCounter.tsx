import { useState } from "react";

export function useCounter(initialValue = 0, limit = Infinity) {
  const [count, setCount] = useState(initialValue);
  const [savedCount, setSavedCount] = useState<number | null>(null);

  const increment = () => {
    if (count < limit) {
      setCount((prevCount) => prevCount + 1);
    } else {
      setSavedCount(count);
    }
  };

  const decrement = () => {
    if (count === 0) return;
    if (savedCount !== null && count === savedCount) {
      setSavedCount(null);
    }
    setCount((prevCount) => prevCount - 1);
  };

  return [
    savedCount !== null ? savedCount : count,
    increment,
    decrement,
  ] as const;
}
