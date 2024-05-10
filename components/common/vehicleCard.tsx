import {
  EngineIcon,
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

export default function VehicleCard({
  viewMode,
  vehicle,
}: {
  viewMode: string;
  vehicle: any;
}) {
  const t = useTranslations("VehicleCard");
  const params = useCustomSearchParams();

  return viewMode === "list" ? (
    <div className="bg-white flex flex-col gap-4">
      <div className="w-full p-2 flex gap-8">
        <Image
          src="/sampleCar.png"
          alt="vehicle"
          width="240"
          height="120"
          className="py-12"
          priority
        />
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
              <div>
                <p className="border-2 border-red-500 text-red-500 font-bold p-1 text-sm rounded-lg">
                  25% {t("off")}
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
                    <FuelIcon className="text-graySecondary" />
                    <p className="text-sm leading-none font-bold text-center">
                      {vehicle.relationships.fuelType.attributes.name}
                    </p>
                  </div>
                  <div className="text-grayFont p-4 w-1/4 flex flex-col gap-2 items-center border-r">
                    <TransmissionIcon className="text-graySecondary" />
                    <p className="text-sm leading-none font-bold text-center">
                      {vehicle.relationships.gearType.attributes.name}
                    </p>
                  </div>
                  <div className="text-grayFont p-4 w-1/4 flex flex-col gap-2 items-center border-r">
                    <SeatIcon className="text-graySecondary" />
                    <p className="text-sm leading-none font-bold text-center">
                      {vehicle.attributes.seat_capacity} {t("persons")}
                    </p>
                  </div>
                  <div className="text-grayFont p-4 w-1/4 flex flex-col gap-2 items-center">
                    <EngineIcon className="text-graySecondary" />
                    <p className="text-sm leading-none font-bold text-center">
                      {vehicle.attributes.engine_displacement_in_metric_cubic}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center p-4 bg-primary-background text-secondary">
            <div className="h-full content-center">
              <sup className="text-xl font-bold top-0">$</sup>
              <span className="text-4xl font-bold">
                {vehicle.attributes.base_price_in_cents}
              </span>
              <span className="inline-block ">
                <sup className="relative block text-xl leading-none font-bold -top-3">
                  ,00
                </sup>
              </span>
              <p className="text-xs font-medium text-center">{t("dailyFee")}</p>
            </div>
            <Link
              href={`/explore/1?rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}`}
              className="px-8 py-3 text-white text-xs hover:bg-secondary bg-primary text-nowrap transition-all"
            >
              {t("rentNow")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white">
      <div className="w-full p-4 flex flex-col gap-8">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-4 justify-between">
            <p className="w-fit border-2 border-red-500 text-red-500 font-bold p-1 text-sm rounded-lg">
              25% {t("off")}
            </p>
            <div className="flex flex-col gap-4">
              <p className="text-graySecondary text-center w-32 border-graySecondary border rounded-full font-medium text-[10px] px-4 py-1">
                {vehicle.relationships.carType.attributes.name}
              </p>
              <p className="text-grayFont font-medium text-2xl">
                {vehicle.attributes.name.split(" (")[0]}
              </p>
            </div>
          </div>
          <Image
            src="/sampleCar.png"
            alt="vehicle"
            width="200"
            height="100"
            className="py-12"
            priority
          />
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
                  <FuelIcon className="text-graySecondary" />
                  <p className="text-sm leading-none font-bold text-center">
                    {vehicle.relationships.fuelType.attributes.name}
                  </p>
                </div>
                <div className="text-grayFont p-4 w-full flex flex-col gap-2 justify-between items-center">
                  <TransmissionIcon className="text-graySecondary" />
                  <p className="text-sm leading-none font-bold text-center">
                    {vehicle.relationships.gearType.attributes.name}
                  </p>
                </div>
              </div>
              <div className="border-borderGray border-b grid grid-cols-2 w-full">
                <div className="text-grayFont p-4 w-full flex flex-col gap-2 justify-between items-center border-r">
                  <SeatIcon className="text-graySecondary" />
                  <p className="text-sm leading-none font-bold text-center">
                    {vehicle.attributes.seat_capacity} {t("persons")}
                  </p>
                </div>
                <div className="text-grayFont p-4 w-full flex flex-col gap-2 justify-between items-center">
                  <EngineIcon className="text-graySecondary" />
                  <p className="text-sm leading-none font-bold text-center">
                    {vehicle.attributes.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center p-4 bg-primary-background text-secondary">
            <div className="h-full content-center">
              <sup className="text-xl font-bold top-0">$</sup>
              <span className="text-4xl font-bold">
                {vehicle.attributes.base_price_in_cents}
              </span>
              <span className="inline-block ">
                <sup className="relative block text-xl leading-none font-bold -top-3">
                  ,00
                </sup>
              </span>
              <p className="text-xs font-medium text-center">{t("dailyFee")}</p>
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
  );
}
