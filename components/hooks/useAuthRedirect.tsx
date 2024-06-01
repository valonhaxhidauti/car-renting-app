import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function useAuthRedirect(
  redirectPath: string,
  checkItemExists: boolean
) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const item = window.localStorage.getItem("authenticated");
    if (checkItemExists ? !item : item) {
      router.replace(redirectPath);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
}
