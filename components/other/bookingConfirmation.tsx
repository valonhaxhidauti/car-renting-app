"use client";
import {
  BookingConfirmed,
  FuelIcon,
  RentLocIcon,
  ReturnLocIcon,
  TransmissionIcon,
} from "@/assets/svgs";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Booking {
  attributes: any;
  id: string;
  details: string;
  relationships?: any;
}

export default function BookingConfirmation() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const url = new URL("https://rent-api.rubik.dev/api/bookings");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
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
        console.log(data.data[1]);
        setBookings(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: </div>;
    // {error.message}
  }

  return (
    <div className="flex flex-col items-center w-full mt-16 mb-4 m-auto max-w-6xl px-4 mobile:px-8">
      <div className="flex flex-col items-center gap-4 w-full border-b border-borderGray pb-12">
        <BookingConfirmed />
        <p className="text-grayFont text-2xl">Your booking was successful!</p>
        <p className="text-grayFont text-sm">
          Reservation Code: <b>RNTON987654</b>
        </p>
        <Link
          href="/account/personal-info"
          className="bg-primary text-center hover:bg-secondary transition text-white py-3 mt-6 w-full mobile:w-40"
        >
          Go to My Account
        </Link>
      </div>
      <div className="flex flex-col w-full items-center">
        <h1 className="text-grayFont text-lg font-medium my-4">Booking Information</h1>
        <div className="border border-borderGray w-full p-4">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div>
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-4 gap-8 mobile:gap-2 justify-items-center"
                >
                  <Image
                    src={
                      booking.relationships.car.relationships.media[0]
                        .attributes.public_url
                    }
                    width={330}
                    height={285}
                    alt="booked car"
                  />
                  <div className="flex flex-col gap-4 justify-center">
                    <p className="text-grayFont text-xl font-medium">
                      {booking.relationships.car.attributes.name.split("(")[0]}
                    </p>
                    <div className="flex gap-3 text-grayFont">
                      <div className="flex gap-1 items-center">
                        <FuelIcon className="w-6 h-6" />
                        <p className="font-bold text-sm">GASOLINE</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <TransmissionIcon className="w-6 h-6" />
                        <p className="font-bold text-sm">MANUAL</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-center">
                    <div className="flex gap-2 items-center">
                      <RentLocIcon className="w-12" />
                      <div className="text-grayFont">
                        <p className="text-sm leading-none">19/06/2024 10:00</p>
                        <p className="text-xs leading-none">Location 74</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <ReturnLocIcon className="w-12" />
                      <div className="text-grayFont">
                        <p className="text-sm leading-none">19/06/2024 10:00</p>
                        <p className="text-xs leading-none">Location 74</p>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
