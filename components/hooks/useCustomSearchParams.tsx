import { useSearchParams } from "next/navigation";

export function useCustomSearchParams() {
  const searchParams = useSearchParams();

  const params: { [key: string]: string } = {
    vehicleId: searchParams.get("vehicleId") || "",
    rentLocation: searchParams.get("rentLocation") || "",
    returnLocation: searchParams.get("returnLocation") || "",
    pickupDate: searchParams.get("pickupDate") || "",
    dropOffDate: searchParams.get("dropOffDate") || "",
  };

  Object.keys(params).forEach((key) => {
    if (params[key] === null) {
      params[key] = "";
    }
  });

  const filters: { [key: string]: string } = {
    sort: searchParams.get("sort") || "",
    carClass: searchParams.get("filter[carClass]") || "",
    carType: searchParams.get("filter[carType]") || "",
    gearType: searchParams.get("filter[gearType]") || "",
    fuelType: searchParams.get("filter[fuelType]") || "",
  };

  Object.keys(filters).forEach((key) => {
    if (filters[key] === null) {
      filters[key] = "";
    }
  });

  return { params, filters };
}
