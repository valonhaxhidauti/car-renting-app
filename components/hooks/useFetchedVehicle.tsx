import { useEffect, useState } from "react";

export function useFetchedVehicle(vehicleId: string) {
  const [vehicle, setVehicle] = useState<any>({});

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const url = new URL(`https://rent-api.rubik.dev/api/cars/${vehicleId}`);
        const response = await fetch(url, {
          method: "GET",
          headers: {
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
