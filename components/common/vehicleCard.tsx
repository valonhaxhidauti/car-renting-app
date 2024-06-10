import {
  VehicleIcon,
  FuelIcon,
  SearchIcon,
  SeatIcon,
  TransmissionIcon,
  WarningIcon,
} from "@/assets/svgs";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function VehicleCard({
  viewMode,
  vehicle,
}: {
  viewMode: string;
  vehicle: any;
}) {
  const t = useTranslations("VehicleCard");
  const { params } = useCustomSearchParams();
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCard(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`bg-white ${
        showCard ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {viewMode === "list" ? (
        <div className="bg-white flex flex-col gap-4">
          <div className="w-full p-2 flex gap-8">
            {vehicle.relationships.media ? (
              <Image
                src={`${vehicle.relationships.media[0].attributes.public_url}`}
                alt={vehicle.attributes.name.split(" (")[0]}
                width="240"
                height="120"
                className="pointer-events-none py-12 w-auto h-auto"
                priority
              />
            ) : (
              <Image
                src="/sampleCar.png"
                alt={vehicle.attributes.name.split(" (")[0]}
                width="240"
                height="120"
                className="pointer-events-none py-12"
                priority
              />
            )}
            <div className="flex justify-between w-full gap-2">
              <div className="w-full flex flex-col justify-between">
                <div className="flex w-full justify-between mobile:pt-2">
                  <div className="flex flex-col gap-4">
                    <p className="text-graySecondary text-center w-32 border-graySecondary border rounded-full font-medium text-[10px] px-4 py-1">
                      {vehicle.relationships.carType.attributes.name}
                    </p>
                    <p className="text-grayFont font-medium text-2xl">
                      {vehicle.attributes.name.split(" (")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex w-full">
                    <div className="w-1/2 py-2 pr-2 border border-l-0 text-grayFont hover:text-primary flex gap-1 items-center cursor-pointer">
                      <SearchIcon className="w-4 h-4" />
                      <p className="text-[11px] font-medium">
                        {t("filterVehicles")}
                      </p>
                    </div>
                    <div className="w-1/2 p-2 border border-x-0 text-grayFont flex gap-1 items-center">
                      <WarningIcon className="w-4 h-4" />
                      <p className="text-[11px] font-medium">
                        {t("vehicleOptions")}
                      </p>
                    </div>
                  </div>
                  <div className="border-borderGray border-b flex w-full">
                    <div className="flex w-full">
                      <div className="text-grayFont p-4 w-1/4 flex flex-col gap-2 items-center border-r">
                        <div className="w-6 h-6">
                          <FuelIcon className="w-full h-full text-graySecondary" />
                        </div>
                        <p className="text-sm leading-none font-bold text-center">
                          {vehicle.relationships.fuelType.attributes.name}
                        </p>
                      </div>
                      <div className="text-grayFont p-4 w-1/4 flex flex-col gap-2 items-center border-r">
                        <div className="w-6 h-6">
                          <TransmissionIcon className="w-full h-full text-graySecondary" />
                        </div>
                        <p className="text-sm leading-none font-bold text-center">
                          {vehicle.relationships.gearType.attributes.name}
                        </p>
                      </div>
                      <div className="text-grayFont p-4 w-1/4 flex flex-col gap-2 items-center border-r">
                        <div className="w-6 h-6">
                          <SeatIcon className="w-full h-full text-graySecondary" />
                        </div>
                        <p className="text-sm leading-none font-bold text-center">
                          {vehicle.attributes.seat_capacity} {t("persons")}
                        </p>
                      </div>
                      <div className="text-grayFont p-4 w-1/4 flex flex-col gap-2 items-center">
                        <div className="w-[33px]">
                          <VehicleIcon className="w-full h-full text-graySecondary" />
                        </div>
                        <p className="text-sm leading-none font-bold text-center">
                          {
                            vehicle.attributes
                              .engine_displacement_in_metric_cubic
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center p-4 bg-primary-background text-secondary">
                <div className="h-full content-center">
                  <sup className="text-xs font-bold top-0">CHF</sup>
                  <span className="text-4xl font-bold">
                    {vehicle.attributes.base_price_in_cents}
                  </span>
                  <span className="inline-block ">
                    <sup className="relative block text-xl leading-none font-bold -top-3">
                      ,00
                    </sup>
                  </span>
                  <p className="text-xs font-medium text-center">
                    {t("dailyFee")}
                  </p>
                </div>
                <Link
                  href={`/explore/vehicle/?vehicleId=${vehicle.id}&rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}`}
                  className="px-8 py-3 text-white text-xs hover:bg-secondary bg-primary text-nowrap transition-all"
                >
                  {t("rentNow")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white h-full">
          <div className="w-full h-full justify-between p-4 flex flex-col gap-8">
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-4 justify-between">
                <div className="flex flex-col gap-4">
                  <p className="text-graySecondary text-center w-32 border-graySecondary border rounded-full font-medium text-[10px] px-4 py-1">
                    {vehicle.relationships.carType.attributes.name}
                  </p>
                  <p className="text-grayFont font-medium text-2xl">
                    {vehicle.attributes.name.split(" (")[0]}
                  </p>
                </div>
              </div>
              {vehicle.relationships.media ? (
                <Image
                  src={`${vehicle.relationships.media[0].attributes.public_url}`}
                  alt={vehicle.attributes.name.split(" (")[0]}
                  width="240"
                  height="120"
                  className="pointer-events-none py-12 w-auto h-auto"
                  priority
                />
              ) : (
                <Image
                  src="/sampleCar.png"
                  alt={vehicle.attributes.name.split(" (")[0]}
                  width="240"
                  height="120"
                  className="pointer-events-none py-12"
                  priority
                />
              )}
            </div>
            <div className="flex justify-between w-full gap-2">
              <div className="w-full flex flex-col justify-between">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col">
                    <div className="py-2 pr-2 border-y text-grayFont hover:text-primary flex gap-1 items-center cursor-pointer">
                      <SearchIcon className="w-4 h-4" />
                      <p className="text-[11px] font-medium cursor-pointer">
                        {t("filterVehicles")}
                      </p>
                    </div>
                    <div className="py-2 pr-2 border-b text-grayFont flex gap-1 items-center">
                      <WarningIcon className="w-4 h-4" />
                      <p className="text-[11px] font-medium">
                        {t("vehicleOptions")}
                      </p>
                    </div>
                  </div>
                  <div className="border-borderGray border-b grid grid-cols-2 w-full">
                    <div className="text-grayFont p-4 w-full flex flex-col gap-2 justify-between items-center border-r">
                      <div className="w-6 h-6">
                        <FuelIcon className="w-full h-full text-graySecondary" />
                      </div>
                      <p className="text-sm leading-none font-bold text-center">
                        {vehicle.relationships.fuelType.attributes.name}
                      </p>
                    </div>
                    <div className="text-grayFont p-4 w-full flex flex-col gap-2 justify-between items-center">
                      <div className="w-6 h-6">
                        <TransmissionIcon className="w-full h-full text-graySecondary" />
                      </div>
                      <p className="text-sm leading-none font-bold text-center">
                        {vehicle.relationships.gearType.attributes.name}
                      </p>
                    </div>
                  </div>
                  <div className="border-borderGray border-b grid grid-cols-2 w-full">
                    <div className="text-grayFont p-4 w-full flex flex-col gap-2 justify-between items-center border-r">
                      <div className="w-6 h-6">
                        <SeatIcon className="w-full h-full text-graySecondary" />
                      </div>
                      <p className="text-sm leading-none font-bold text-center">
                        {vehicle.attributes.seat_capacity} {t("persons")}
                      </p>
                    </div>
                    <div className="text-grayFont p-4 w-full flex flex-col gap-2 justify-between items-center">
                      <div className="w-[33px] h-6">
                        <VehicleIcon className="w-full h-full text-graySecondary" />
                      </div>
                      <p className="text-sm leading-none font-bold text-center">
                        {vehicle.attributes.year}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center p-4 bg-primary-background text-secondary">
                <div className="h-full content-center">
                  <sup className="text-xs font-bold top-0">CHF</sup>
                  <span className="text-4xl font-bold">
                    {vehicle.attributes.base_price_in_cents}
                  </span>
                  <span className="inline-block ">
                    <sup className="relative block text-xl leading-none font-bold -top-3">
                      ,00
                    </sup>
                  </span>
                  <p className="text-xs font-medium text-center">
                    {t("dailyFee")}
                  </p>
                </div>
                <Link
                  href={`/explore/vehicle/?vehicleId=${vehicle.id}&rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}`}
                  className="px-8 py-3 text-white text-xs hover:bg-secondary bg-primary text-nowrap transition-all"
                >
                  {t("rentNow")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
