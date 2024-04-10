import ExploreVehicles from "@/components/general/exploreVehicles";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Explore() {
  return (
    <>
      <Header background={false} fixed={false} />
      <ExploreVehicles />
      <Footer />
    </>
  );
}
