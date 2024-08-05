import { Checkbox } from "../ui/checkbox";
import { Filters } from "@/lib/types";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import debounce from "lodash.debounce";

export default function VehicleFilters({ filtersId }: { filtersId: string }) {
  const t = useTranslations("VehicleFilters");
  const locale = useTranslations()("Locale");

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
            "Accept-Language": locale,
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

    const savedFilters = localStorage.getItem("appliedFilters");
    if (savedFilters) {
      setAppliedFilters(JSON.parse(savedFilters));
    }
  }, [locale]);

  const handleFilterClick = (filterType: string, filterId: string) => {
    const updatedFilters = { ...appliedFilters };
    const index = updatedFilters[filterType].indexOf(filterId);
    if (index === -1) {
      updatedFilters[filterType].push(filterId);
    } else {
      updatedFilters[filterType].splice(index, 1);
    }
    setAppliedFilters(updatedFilters);

    localStorage.setItem("appliedFilters", JSON.stringify(updatedFilters));

    if (updatedFilters[filterType].length === 0) {
      removeQueryParam(filterType);
    } else {
      debouncedQueryParams();
    }
  };

  const removeQueryParam = (filterType: string) => {
    const existingParams = new URLSearchParams(window.location.search);
    existingParams.delete(`filter[${filterType}]`);
    const queryParams = existingParams.toString();
    router.push(`?${queryParams}`);
  };

  const generateQueryParams = () => {
    const existingParams = new URLSearchParams(window.location.search);
    const updatedParams = new URLSearchParams(existingParams.toString());

    for (const filterType in appliedFilters) {
      if (appliedFilters[filterType].length > 0) {
        const joinedValues = appliedFilters[filterType].join(",");
        updatedParams.set(`filter[${filterType}]`, joinedValues);
      }
    }

    const queryParams = updatedParams.toString();
    router.push(`?${queryParams}`);
  };

  const debouncedQueryParams = debounce(generateQueryParams, 300);

  return (
    <>
      <div className="flex flex-col items-start gap-2 pb-4 border-borderGray border-b">
        <div className="flex space-between w-full">
          <p className="pb-2 text-sm font-bold w-full">{t("vehicleClass")}</p>
        </div>
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : filters.carClass.map((filter: any) => (
              <div key={filter.label} className="flex gap-2 items-center">
                <Checkbox
                  id={`vehicleClass_${filter.label}_${filtersId}`}
                  checked={appliedFilters.carClass.includes(filter.value)}
                  onCheckedChange={() =>
                    handleFilterClick("carClass", filter.value)
                  }
                />
                <Label
                  htmlFor={`vehicleClass_${filter.label}_${filtersId}`}
                  className="text-grayFont text-xs cursor-pointer"
                >
                  {filter.label}
                </Label>
              </div>
            ))}
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">{t("vehicleType")}</p>
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : filters.carType.map((filter: any) => (
              <div key={filter.label} className="flex gap-2 items-center">
                <Checkbox
                  id={`vehicleType_${filter.label}_${filtersId}`}
                  checked={appliedFilters.carType.includes(filter.value)}
                  onCheckedChange={() =>
                    handleFilterClick("carType", filter.value)
                  }
                />
                <Label
                  htmlFor={`vehicleType_${filter.label}_${filtersId}`}
                  className="text-grayFont text-xs cursor-pointer"
                >
                  {filter.label}
                </Label>
              </div>
            ))}
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">{t("gearType")}</p>
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : filters.gearType.map((filter: any) => (
              <div key={filter.label} className="flex gap-2 items-center">
                <Checkbox
                  id={`gearType_${filter.label}_${filtersId}`}
                  checked={appliedFilters.gearType.includes(filter.value)}
                  onCheckedChange={() =>
                    handleFilterClick("gearType", filter.value)
                  }
                />
                <Label
                  htmlFor={`gearType_${filter.label}_${filtersId}`}
                  className="text-grayFont text-xs cursor-pointer"
                >
                  {filter.label}
                </Label>
              </div>
            ))}
      </div>
      <div
        className={`flex flex-col items-start gap-2 mt-4 ${
          filtersId === "1" ? "pb-4" : ""
        }`}
      >
        <p className="pb-2 text-sm font-bold">{t("fuelType")}</p>
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : filters.fuelType.map((filter: any) => (
              <div key={filter.label} className="flex gap-2 items-center">
                <Checkbox
                  id={`fuelType_${filter.label}_${filtersId}`}
                  checked={appliedFilters.fuelType.includes(filter.value)}
                  onCheckedChange={() =>
                    handleFilterClick("fuelType", filter.value)
                  }
                />
                <Label
                  htmlFor={`fuelType_${filter.label}_${filtersId}`}
                  className="text-grayFont text-xs cursor-pointer"
                >
                  {filter.label}
                </Label>
              </div>
            ))}
      </div>
    </>
  );
}
