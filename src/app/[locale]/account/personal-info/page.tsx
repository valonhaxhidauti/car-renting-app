"use client";

import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PersonalInfoUpdate from "@/components/account/personalInfoUpdate";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function PersonalInfo() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  console.log(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/account");
    }
  }, []);

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <>
      <Header background={false} fixed={false} />
      <PersonalInfoUpdate />
      <Footer />
    </>
  );
}
