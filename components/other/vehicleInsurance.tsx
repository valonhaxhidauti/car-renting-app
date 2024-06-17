import { useEffect, useState } from "react";
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

interface InsuranceType {
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

export default function VehicleInsurance() {
  const locale = useTranslations()("Locale");

  const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);
  const toggleShown = useOverflowControl(false);

  function onSelectClicked() {
    toggleShown();
  }

  useEffect(() => {
    const url = new URL("https://rent-api.rubik.dev/api/insurance-types");

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
        setInsuranceTypes(data.data);
      })
      .catch((error) => {
        console.error("Error fetching insurance types:", error);
      });
  }, []);

  return (
    <div className="my-4">
      <Select onOpenChange={onSelectClicked}>
        <SelectTrigger className="w-full border-borderGray border flex gap-2">
          <SelectValue placeholder="Select Insurance Type" />
          <ChevronDown size={20} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Insurance Types</SelectLabel>
            {insuranceTypes.map((type) => (
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
