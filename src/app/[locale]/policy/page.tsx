import PrivacyPolicy from "@/components/general/privacyPolicy";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Policy() {
  return (
    <>
      <Header background={false} fixed={false}/>
      <PrivacyPolicy />
      <Footer />
    </>
  );
}
