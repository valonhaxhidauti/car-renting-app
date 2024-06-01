import { useRouter } from "next/navigation";

export function useHandleLogout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    router.push("/account");
  };

  return handleLogout;
}
