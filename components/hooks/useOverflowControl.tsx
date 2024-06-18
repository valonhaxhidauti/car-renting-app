import { useState, useEffect } from "react";

export function useOverflowControl(initialState = false): () => void {
  const [shown, setShown] = useState<boolean>(initialState);

  useEffect(() => {
    if (shown) {
      document.body.style.setProperty("overflow-y", "auto", "important");
    } else {
      document.body.style.removeProperty("overflow-y");
    }

    return () => {
      document.body.style.removeProperty("overflow-y");
    };
  }, [shown]);

  const toggleShown = () => {
    setShown((prevShown) => !prevShown);
  };

  return toggleShown;
}
