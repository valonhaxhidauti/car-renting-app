"use client";
import { BookingConfirmed } from "@/assets/svgs";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";

interface Booking {
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
    <div className="flex flex-col items-center w-full mt-16 mb-4 m-auto max-w-6xl">
      <div className="flex flex-col items-center gap-4 w-full border-b border-borderGray pb-12">
        <BookingConfirmed />
        <p className="text-grayFont text-2xl">Your booking was successful!</p>
        <p className="text-grayFont text-sm">
          Reservation Code: <b>RNTON987654</b>
        </p>
        <Link
          href="/account/personal-info"
          className="bg-primary text-center hover:bg-secondary transition text-white py-3 w-full mobile:w-40"
        >
          Go to My Account
        </Link>
      </div>
      <div className="flex flex-col w-full items-center">
        <h1 className="text-grayFont font-medium my-4">Booking Information</h1>
        <div className="border border-borderGray w-full p-4">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  {booking.relationships.car.attributes.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
