import { Filters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function VehicleFilters({ filtersId }: { filtersId: string }) {
  const vf = useTranslations("VehicleFilters.vehicleClass");
  const vt = useTranslations("VehicleFilters.vehicleType");
  const gt = useTranslations("VehicleFilters.gearType");
  const ft = useTranslations("VehicleFilters.fuelType");

  const [filters, setFilters] = useState<Filters>({
    gearType: [],
    fuelType: [],
    carClass: [],
    carType: [],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const url = new URL("https://rent-api.rubik.dev/api/car-filters");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setFilters(data.data.attributes);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <>
      <div className="flex flex-col items-start gap-2 pb-4 border-borderGray border-b">
        <div className="flex space-between w-full">
          <p className="pb-2 text-sm font-bold w-full">{vf("title")}</p>
        </div>
        {filters.carClass.map((filter: any) => (
          <div key={filter.label} className="flex gap-4">
            <input
              id={`vehicleClass_${filter.label}_${filtersId}`}
              type="checkbox"
              className="cursor-pointer"
            />
            <label
              htmlFor={`vehicleClass_${filter.label}_${filtersId}`}
              className="text-grayFont text-xs cursor-pointer"
            >
              {vf(filter.label)}
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">{vt("title")}</p>
        {filters.carType.map((filter: any) => (
          <div key={filter.label} className="flex gap-4">
            <input
              id={`vehicleClass_${filter.label}_${filtersId}`}
              type="checkbox"
              className="cursor-pointer"
            />
            <label
              htmlFor={`vehicleClass_${filter.label}_${filtersId}`}
              className="text-grayFont text-xs cursor-pointer"
            >
              {vt(filter.label)}
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">{gt("title")}</p>
        {filters.gearType.map((filter: any) => (
          <div key={filter.label} className="flex gap-4">
            <input
              id={`vehicleClass_${filter.label}_${filtersId}`}
              type="checkbox"
              className="cursor-pointer"
            />
            <label
              htmlFor={`vehicleClass_${filter.label}_${filtersId}`}
              className="text-grayFont text-xs cursor-pointer"
            >
              {gt(filter.label)}
            </label>
          </div>
        ))}
      </div>
      <div
        className={`flex flex-col items-start gap-2 mt-4 ${
          filtersId === "1" ? "pb-4" : ""
        }`}
      >
        <p className="pb-2 text-sm font-bold">{ft("title")}</p>
        {filters.fuelType.map((filter: any) => (
          <div key={filter.label} className="flex gap-4">
            <input
              id={`vehicleClass_${filter.label}_${filtersId}`}
              type="checkbox"
              className="cursor-pointer"
            />
            <label
              htmlFor={`vehicleClass_${filter.label}_${filtersId}`}
              className="text-grayFont text-xs cursor-pointer"
            >
              {ft(filter.label)}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
