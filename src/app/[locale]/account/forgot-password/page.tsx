import ForgotPassword from "@/components/general/forgotPassword";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function PasswordForgot() {
  return (
    <>
      <Header background={false} fixed={false} />
      <div className="bg-bgSecondary w-full pb-16 pt-8">
        <div className="max-w-[1440px] m-auto px-4 mobile:px-8 flex flex-col desktop:flex-row">
          <ForgotPassword />
        </div>
      </div>
      <Footer />
    </>
  );
}
