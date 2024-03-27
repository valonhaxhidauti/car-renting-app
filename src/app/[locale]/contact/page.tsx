import Contact from "@/components/general/contact";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function ContactPage() {
  return (
    <>
      <Header background={false} fixed={false} />
      <Contact />
      <Footer />
    </>
  );
}
