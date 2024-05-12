import ResetPasswordForm from "@/components/general/resetPasswordForm";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  return (
    <>
      <Header fixed={false} background={false} />
      <ResetPasswordForm params={params} />
      <Footer />
    </>
  );
}
