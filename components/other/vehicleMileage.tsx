import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import useOverflowControl from "../hooks/useOverflowControl";
import { useTranslations } from "next-intl";

interface MileageType {
  id: number;
  attributes: {
    name: string;
    base_price_in_cents: number;
    base_currency: string;
    description: string;
    updated_at: string;
    created_at: string;
  };
}

export default function VehicleMileage() {
  const locale = useTranslations()("Locale");

  const [vehicleMileage, setVehicleMileage] = useState<MileageType[]>([]);
  const toggleShown = useOverflowControl(false);

  function onSelectClicked() {
    toggleShown();
  }

  useEffect(() => {
    const url = new URL("https://rent-api.rubik.dev/api/mileage-types");

    const headers = {
      "Accept-Language": locale,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setVehicleMileage(data.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle mileage types:", error);
      });
  }, []);

  return (
    <div className="my-4">
      <Select onOpenChange={onSelectClicked}>
        <SelectTrigger className="w-full border-borderGray border flex gap-2">
          <SelectValue placeholder="Select Mileage Type" />
          <ChevronDown size={20} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mileage Types</SelectLabel>
            {vehicleMileage.map((type) => (
              <SelectItem key={type.id} value={type.attributes.name}>
                {type.attributes.name} - {type.attributes.base_currency}{" "}
                {type.attributes.base_price_in_cents}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
