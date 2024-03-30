import AboutUs from "@/components/general/aboutUs";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function About() {
  return (
    <>
      <Header background={false} fixed={false} />
      <AboutUs />
      <Footer />
    </>
  );
}
