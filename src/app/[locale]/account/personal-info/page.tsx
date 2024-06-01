"use client";

import { useAuthRedirect } from "@/components/hooks/useAuthRedirect";
import PersonalInfoUpdate from "@/components/account/personalInfoUpdate";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function PersonalInfo() {
  const isAuthenticated = useAuthRedirect('/account', true);
  
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
