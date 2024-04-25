import { useState } from "react";

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => {
    if (count === 0) return;
    setCount((prevCount) => prevCount - 1);
  };
  return [count, increment, decrement] as const;
}
