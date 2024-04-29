"use client";

import React from "react";
import { RentLocIcon, ReturnLocIcon, EditBookingIcon } from "@/assets/svgs";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import RentForm from "../general/rentForm";

export default function BookingInfo({ border }: { border: boolean }) {
  const t = useTranslations("ExploreVehicles");

  const searchParams = useSearchParams();
  const rentLocation = searchParams.get("rentLocation");
  const returnLocation = searchParams.get("returnLocation");
  const pickupDate = searchParams.get("pickupDate");
  const dropOffDate = searchParams.get("dropOffDate");

  return (
    <div
      className={`bg-white p-4 flex flex-col gap-4 
    ${border ? "border-borderBooking border-2" : ""}`}
    >
      <div className="flex justify-between text-lg text-grayFont font-bold">
        {t("bookingInformation")} <RentForm modal={true}/>
      </div>
      {rentLocation && (
        <div className="flex gap-2 items-center">
          <RentLocIcon className="w-12" />
          <div className="text-grayFont">
            <p className="text-sm leading-none">{pickupDate}</p>
            <p className="text-xs leading-none">{rentLocation}</p>
          </div>
        </div>
      )}
      {returnLocation && (
        <div className="flex gap-2 items-center">
          <ReturnLocIcon className="w-12" />
          <div className="text-grayFont">
            <p className="text-sm leading-none">{dropOffDate}</p>
            <p className="text-xs leading-none">{returnLocation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
