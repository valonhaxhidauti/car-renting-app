import ConfirmEmail from "@/components/general/confirmEmail";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function VerifyEmail({
  params,
}: {
  params: { id: number; hash: string };
}) {
  return (
    <>
      <Header background={false} fixed={false} />
      <ConfirmEmail params={params} />
      <Footer />
    </>
  );
}
