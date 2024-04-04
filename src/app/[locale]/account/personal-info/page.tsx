import PersonalInfoUpdate from "@/components/account/personalInfoUpdate";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function PersonalInfo() {
  return (
    <>
      <Header background={false} fixed={false} />
      <PersonalInfoUpdate />
      <Footer />
    </>
  );
}
