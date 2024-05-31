"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Reservations from "@/components/account/reservations";

export default function MyReservations() {

  return (
    <>
      <Header background={false} fixed={false} />
      <Reservations />
      <Footer />
    </>
  );
}
