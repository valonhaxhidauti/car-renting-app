"use client";

import PersonalInfoUpdate from "@/components/account/personalInfoUpdate";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { useRouter } from "next/navigation";

export default function PersonalInfo() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const item = window.localStorage.getItem("authenticated");
    if (!item) {
      router.push("/account");
    }
  }
  
  return (
    <>
      <Header background={false} fixed={false} />
      <PersonalInfoUpdate />
      <Footer />
    </>
  );
}
