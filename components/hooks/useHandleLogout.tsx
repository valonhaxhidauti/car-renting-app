import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export function useHandleLogout() {
  const router = useRouter();
  const { setAuthenticated, setToken } = useAuth();

  const handleLogout = () => {
    setAuthenticated(false);
    setToken(null);

    router.push("/account");
  };

  return handleLogout;
}
