"use client";

import { useTranslations } from "next-intl";

export default function VehicleFilters({ filtersId }: { filtersId: string }) {
  const t = useTranslations("VehicleFilters");

  return (
    <>
      <div className="flex flex-col items-start gap-2 pb-4 border-borderGray border-b">
        <div className="flex space-between w-full">
          <p className="pb-2 text-sm font-bold w-full">
            {t("vehicleClass.title")}
          </p>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass1_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass1_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleClass.economic")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass2_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass2_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleClass.middleClass")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass3_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass3_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleClass.middleClass")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass4_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass4_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleClass.luxury")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass5_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass5_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleClass.persons7Plus")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass6_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass6_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleClass.suv")}
          </label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">{t("vehicleType.title")}</p>
        <div className="flex gap-4">
          <input
            id={`vehicleType1_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType1_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleType.sedan")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleType2_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType2_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleType.hatchback")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleType3_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType3_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleType.stationwagon")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleType4_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType4_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleType.suv")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleType5_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType5_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("vehicleType.van")}
          </label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">{t("gearType.title")}</p>
        <div className="flex gap-4">
          <input
            id={`gearType1_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`gearType1_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("gearType.automatic")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`gearType2_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`gearType2_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("gearType.manual")}
          </label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 mt-4">
        <p className="pb-2 text-sm font-bold">{t("fuelType.title")}</p>
        <div className="flex gap-4">
          <input
            id={`fuelType1_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType1_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("fuelType.diesel")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`fuelType2_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType2_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("fuelType.autogas")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`fuelType3_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType3_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("fuelType.hybrid")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`fuelType4_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType4_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("fuelType.gasoline")}
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`fuelType5_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType5_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            {t("fuelType.electrical")}
          </label>
        </div>
      </div>
    </>
  );
}
