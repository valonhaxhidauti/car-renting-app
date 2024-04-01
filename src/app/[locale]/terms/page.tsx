import RentalTerms from "@/components/general/rentalTerms";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Terms() {
  return (
    <>
      <Header background={false} fixed={false} />
      <RentalTerms />
      <Footer />
    </>
  );
}
