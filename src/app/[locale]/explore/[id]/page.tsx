import VehiclePage from "@/components/common/vehiclePage";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import React from "react";

export default function page() {
  return (
    <>
      <Header background={false} fixed={false} />
      <VehiclePage />
      <Footer />
    </>
  );
}
