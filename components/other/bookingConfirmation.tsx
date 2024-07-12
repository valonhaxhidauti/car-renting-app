"use client";

import {
  BookingConfirmed,
  FuelIcon,
  RentLocIcon,
  ReturnLocIcon,
  TransmissionIcon,
} from "@/assets/svgs";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import Image from "next/image";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

interface Booking {
  attributes: any;
  id: string;
  details: string;
  relationships?: any;
}

dayjs.extend(utc);
dayjs.extend(timezone);

export default function BookingConfirmation({
  params,
}: {
  params: { bookingId: string };
}) {
  const locale = useTranslations()("Locale");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const url = new URL(
      `https://rent-api.rubik.dev/api/bookings/${params.bookingId}`
    );
    const token = localStorage.getItem("token");

    const headers = {
      "Accept-Language": locale,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBooking(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [locale, params.bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!booking) {
    return <div>No booking found.</div>;
  }

  const formatDate = (dateString: string) => {
    return dayjs(dateString).utc().format("DD.MM.YYYY hh:mm A");
  };

  return (
    <div className="flex flex-col items-center w-full mt-16 mb-4 m-auto max-w-6xl px-4 mobile:px-8">
      <div className="flex flex-col items-center gap-4 w-full border-b border-borderGray pb-12">
        <BookingConfirmed />
        <p className="text-grayFont text-2xl">Your booking was successful!</p>
        <p className="text-grayFont text-sm">
          Reservation Code: <b>{booking.attributes.booking_id}</b>
        </p>
        <Link
          href="/account/personal-info"
          className="bg-primary text-center hover:bg-secondary transition text-white py-3 mt-6 w-full mobile:w-40"
        >
          Go to My Account
        </Link>
      </div>
      <div className="flex flex-col w-full items-center">
        <h1 className="text-grayFont text-lg font-medium my-4">
          Booking Information
        </h1>
        <div className="border border-borderGray w-full p-4">
          <div className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-4 gap-8 mobile:gap-2 justify-items-center">
            {booking.relationships.car.relationships.media &&
            booking.relationships.car.relationships.media.length > 0 ? (
              <Image
                src={
                  booking.relationships.car.relationships.media[0].attributes
                    .public_url
                }
                width={330}
                height={285}
                alt="booked car"
                className="pointer-events-none"
              />
            ) : (
              <Image
                src="/sampleCar.png"
                width={330}
                height={285}
                alt="booked car"
                className="pointer-events-none"
              />
            )}
            <div className="flex flex-col gap-4 justify-center">
              <p className="text-grayFont text-xl font-medium">
                {booking.relationships.car.attributes.name.split("(")[0]}
              </p>
              <div className="flex gap-3 text-grayFont">
                <div className="flex gap-1 items-center w-fit">
                  <FuelIcon className="w-8 h-8" />
                  <p className="font-bold text-sm">{booking.relationships.car.relationships.fuelType.attributes.name}</p>
                </div>
                <div className="flex gap-1 items-center w-fit">
                  <TransmissionIcon className="w-8 h-8" />
                  <p className="font-bold text-sm">{booking.relationships.car.relationships.gearType.attributes.name}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-grayFont justify-center">
              <div className="flex gap-2 items-center">
                <RentLocIcon className="w-12" />
                <div className="text-grayFont">
                  <p className="text-sm leading-none">
                    {formatDate(booking.attributes.start_date_time)}
                  </p>
                  <p className="text-xs leading-none">{booking.relationships.pickUpLocation.attributes.name}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <ReturnLocIcon className="w-12" />
                <div className="text-grayFont">
                  <p className="text-sm leading-none">
                    {formatDate(booking.attributes.end_date_time)}
                  </p>
                  <p className="text-xs leading-none">{booking.relationships.dropOffLocation.attributes.name}</p>
                </div>
              </div>
            </div>
            <h1 className="text-primary">
              <div className="h-full content-center">
                <sup className="font-bold text-lg top-0">CHF</sup>
                <span className="text-6xl font-bold">
                  {booking.attributes.total_price_in_cents}
                </span>
                <span className="inline-block ">
                  <sup className="relative block text-3xl leading-none font-bold -top-5">
                    ,00
                  </sup>
                </span>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
