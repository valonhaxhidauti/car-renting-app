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

  return params;
}
