import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import VehicleDetails from "@/components/other/vehicleDetails";

export default function page() {
  return (
    <>
      <Header background={false} fixed={false} />
      <VehicleDetails />
      <Footer />
    </>
  );
}
