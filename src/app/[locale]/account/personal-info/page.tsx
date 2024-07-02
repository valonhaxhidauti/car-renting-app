"use client";

import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PersonalInfoUpdate from "@/components/account/personalInfoUpdate";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function PersonalInfo() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/account");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return null;
  }

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
