import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import BookingConfirmation from "@/components/other/bookingConfirmation";

export default function page() {
  return (
    <>
      <Header background={false} fixed={false} />
      <BookingConfirmation />
      <Footer />
    </>
  );
}
