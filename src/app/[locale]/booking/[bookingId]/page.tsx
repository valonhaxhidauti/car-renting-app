import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import BookingConfirmation from "@/components/other/bookingConfirmation";

export default function Booking({ params }: { params: { bookingId: string } }) {
  return (
    <>
      <Header background={false} fixed={false} />
      <div className="pb-16 bg-bgSecondary">
        <div className="pb-16 bg-white">
          <BookingConfirmation params={params} />
        </div>
      </div>
      <Footer />
    </>
  );
}
