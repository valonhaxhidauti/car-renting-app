"use client";

import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Reservations from "@/components/account/reservations";

export default function MyReservations() {
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
      <Reservations />
      <Footer />
    </>
  );
}
