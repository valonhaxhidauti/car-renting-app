import { useSearchParams } from "next/navigation";

export const getSearchParams = () => {
  const searchParams = useSearchParams();

  const params: { [key: string]: string } = {
    rentLocation: searchParams.get("rentLocation") || "",
    returnLocation: searchParams.get("returnLocation") || "",
    pickupDate: searchParams.get("pickupDate") || "",
    dropOffDate: searchParams.get("dropOffDate") || "",
  };

  Object.keys(params).forEach(key => {
    if (params[key] === null) {
      params[key] = "";
    }
  });

  return params;
};