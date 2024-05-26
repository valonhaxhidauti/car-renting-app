import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import VehiclePayment from "@/components/other/vehiclePayment";

export default function page() {
  return (
    <>
      <Header background={false} fixed={false} />
      <VehiclePayment />
      <Footer />
    </>
  );
}
