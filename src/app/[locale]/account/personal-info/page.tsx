"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PersonalInfoUpdate from "@/components/account/personalInfoUpdate";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function PersonalInfo() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const item = window.localStorage.getItem("authenticated");
    if (!item) {
      router.replace("/account");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
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
