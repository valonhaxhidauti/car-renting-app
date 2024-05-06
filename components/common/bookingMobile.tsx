import { EditBookingIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BookingInfo from "./bookingInfo";

export default function BookingMobile() {
  const t = useTranslations("VehicleDetails");

  const [showBooking, setShowBooking] = useState(false);
  const [showBookingAnimation, setShowBookingAnimation] = useState(false);

  const toggleBooking = () => {
    setShowBooking(!showBooking);
    setShowBookingAnimation(true);
  };

  return (
    <div className="flex gap-4 mobile:gap-6">
      <div
        className="flex gap-2 p-2 h-8 text-xs text-grayFont cursor-pointer items-center border-borderGray border-2 rounded-full self-center"
        onClick={toggleBooking}
      >
        <EditBookingIcon />
        {t("booking")}
      </div>
      <div
        className={`fixed top-0 right-0 left-0 bottom-0 z-10 w-full fill-mode-forwards	${
          showBooking ? "animate-show-overlay" : "hidden"
        }`}
        onClick={toggleBooking}
      ></div>
      <div
        className={`fill-mode-forwards bg-white fixed w-full overflow-y-scroll right-0 z-10 ${
          showBooking
            ? "animate-show-booking"
            : showBookingAnimation
            ? "animate-hide-booking"
            : "hidden"
        }`}
      >
        <BookingInfo border={false} label="diffLocation2" />
      </div>
    </div>
  );
}
