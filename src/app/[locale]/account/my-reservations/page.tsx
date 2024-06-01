"use client";

import { useAuthRedirect } from "@/components/hooks/useAuthRedirect";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Reservations from "@/components/account/reservations";

export default function MyReservations() {
  const isAuthenticated = useAuthRedirect('/account', true);
  
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <>
      <Header background={false} fixed={false} />
      <Reservations />
      <Footer />
    </>
  );
}
