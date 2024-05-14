import { useRouter } from "next/navigation";
import { Filters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function VehicleFilters({ filtersId }: { filtersId: string }) {
  const vf = useTranslations("VehicleFilters.vehicleClass");
  const vt = useTranslations("VehicleFilters.vehicleType");
  const gt = useTranslations("VehicleFilters.gearType");
  const ft = useTranslations("VehicleFilters.fuelType");

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string[];
  }>({
    carClass: [],
    carType: [],
    gearType: [],
    fuelType: [],
  });

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filters:", error);
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterClick = (filterType: string, filterId: string) => {
    const updatedFilters = { ...appliedFilters };
    const index = updatedFilters[filterType].indexOf(filterId);
    if (index === -1) {
      updatedFilters[filterType].push(filterId);
    } else {
      updatedFilters[filterType].splice(index, 1);
    }
    setAppliedFilters(updatedFilters);

    generateQueryParams()
  };

  const generateQueryParams = () => {
    const queryStrings: string[] = [];
  
    for (const filterType in appliedFilters) {
      if (appliedFilters[filterType].length > 0) {
        const joinedValues = appliedFilters[filterType].join(",");
        queryStrings.push(`filter[${filterType}]=${joinedValues}`);
      }
    }
  
    const queryParams = queryStrings.join("&");
    console.log(queryParams);
  
    router.push(`?${queryParams}`);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2 pb-4 border-borderGray border-b">
        <div className="flex space-between w-full">
          <p className="pb-2 text-sm font-bold w-full">{vf("title")}</p>
        </div>
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : filters.carClass.map((filter: any) => (
              <div key={filter.label} className="flex gap-4">
                <input
                  id={`vehicleClass_${filter.label}_${filtersId}`}
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => handleFilterClick("carClass", filter.value)}
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
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : filters.carType.map((filter: any) => (
              <div key={filter.label} className="flex gap-4">
                <input
                  id={`vehicleClass_${filter.label}_${filtersId}`}
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => handleFilterClick("carType", filter.value)}
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

        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : filters.gearType.map((filter: any) => (
              <div key={filter.label} className="flex gap-4">
                <input
                  id={`vehicleClass_${filter.label}_${filtersId}`}
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => handleFilterClick("gearType", filter.value)}
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
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : filters.fuelType.map((filter: any) => (
              <div key={filter.label} className="flex gap-4">
                <input
                  id={`vehicleClass_${filter.label}_${filtersId}`}
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => handleFilterClick("fuelType", filter.value)}
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
