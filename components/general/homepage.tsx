"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";

export default function Homepage() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");

  const handleSearch = () => {
    // Handle search functionality here
    console.log("Searching with:", pickupLocation, pickupDate, dropOffDate);
  };

  return (
    <>
      <div className="flex max-w-[1440px] w-full">
        <div className="hidden desktop:block w-1/2 h-screen ">
          <Image
            alt="homepage"
            src="/homeBackground.png"
            width={953}
            height={969}
            priority
            className="w-full h-full"
          />
        </div>
        <div className="w-full h-screen items-start desktop:w-1/2 p-8 flex flex-col gap-4 justify-center">
          <p className="font-bold leading-4 text-[#5a5a5a] text-lg">
            Find your car
          </p>
          <div className="flex text-center shadow-xl">
            <div className="flex relative">
              <div className="py-2 bg-white flex ">
                <input
                  type="text"
                  placeholder="Rent Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="rounded-lg px-4 py-2"
                />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="border-l border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="date"
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  className="border-l border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
              >
                Search
              </button>

              <h1 className="absolute -bottom-5 -right-11 font-bold text-[148px] text-[#f6f6f6] -z-10">
                Find Now
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="diffLocation" />
            <label
              htmlFor="diffLocation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Deliver at different point
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
