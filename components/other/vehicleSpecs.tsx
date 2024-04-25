"use client";

import {
  ConsumptionIcon,
  EngineIcon,
  FuelIcon,
  HorsepowerIcon,
  KeyIcon,
  LuggageIcon,
  SeatIcon,
  TransmissionIcon,
  VehicleIcon,
} from "@/assets/svgs";
import { useTranslations } from "next-intl";

export default function VehicleSpecs() {
  const t = useTranslations("VehiclePage");

  return (
    <div className="grid mobile:grid-cols-2 desktop:grid-cols-3 gap-4">
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <FuelIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("fuelType").toUpperCase()}
          </span>
          <p className="font-medium text-sm">Gasoline</p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <TransmissionIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("gearType").toUpperCase()}
          </span>
          <p className="font-medium text-sm">Automatic</p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <SeatIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("passengerCapacity").toUpperCase()}
          </span>
          <p className="font-medium text-sm">5 {t("person")}</p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <KeyIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("modelYear").toUpperCase()}
          </span>
          <p className="font-medium text-sm">2018</p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <EngineIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("engineType").toUpperCase()}
          </span>
          <p className="font-medium text-sm">3.0 L V6 TFSI</p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <ConsumptionIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("fuelConsumption").toUpperCase()}
          </span>
          <p className="font-medium text-sm">4,5 lt / 100 km</p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <VehicleIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("vehicleType").toUpperCase()}
          </span>
          <p className="font-medium text-sm">Sportback</p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <LuggageIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("luggageCapacity").toUpperCase()}
          </span>
          <p className="font-medium text-sm">345 lt</p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6">
        <div className="w-9">
          <HorsepowerIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {t("horsepower").toUpperCase()}
          </span>
          <p className="font-medium text-sm">245 hp</p>
        </div>
      </div>
    </div>
  );
}