import { useRouter } from "next/navigation";

export const useHandleLogout = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    router.push("/account");
  };

  return handleLogout;
};
