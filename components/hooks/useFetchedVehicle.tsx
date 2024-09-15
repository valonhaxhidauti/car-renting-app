import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function useFetchedVehicle(vehicleId: string) {
  const [vehicle, setVehicle] = useState<any>({});
  const locale = useTranslations()("Locale");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cars/${vehicleId}`);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept-Language": locale,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setVehicle(data.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  return vehicle;
}
