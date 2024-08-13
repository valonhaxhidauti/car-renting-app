import FrequentlyAskedQuestions from "@/components/general/frequentlyAskedQuestions";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Faq() {
  return (
    <>
      <Header background={false} fixed={false} />
      <FrequentlyAskedQuestions />
      <Footer />
    </>
  );
}
