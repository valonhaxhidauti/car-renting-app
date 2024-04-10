import Image from "next/image";
import React from "react";

export default function VehicleCard() {
  return (
    <div className="bg-white w-full p-2 flex gap-8">
      <Image
        src="/sampleCar.png"
        alt="vehicle"
        width="240"
        height="120"
        className="py-12 px-4"
      />
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-graySecondary border-graySecondary border rounded-full font-medium text-[10px] px-12 py-1">
            SUV
          </p>
          <p className="text-grayFont font-medium text-2xl">Volvo XC90</p>
        </div>
        <div className="flex flex-col justify-between items-center p-8 bg-primary-background text-secondary">
          <div>
            <sup className="text-xl font-bold top-0">$</sup>
            <span className="text-4xl font-bold">64</span>
            <span className="inline-block text-lg">
              <sup className="relative block leading-none font-bold -top-4">
                ,99
              </sup>
            </span>
          </div>
          <button className="px-8 py-3 text-white text-xs bg-secondary hover:bg-primary">
            Rent Now!
          </button>
        </div>
      </div>
    </div>
  );
}
