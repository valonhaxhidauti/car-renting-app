import * as RadioGroup from "@radix-ui/react-radio-group";
import { Label } from "../ui/label";
import { Circle, CircleDot } from "lucide-react";
import { useBooking } from "../context/bookingContext";
import { useEffect, useState } from "react";
import { useOverflowControl } from "../hooks/useOverflowControl";
import { useTranslations } from "next-intl";
import { ItemType } from "@/lib/types";

export default function VehicleInsurance() {
  const t = useTranslations("VehicleDetails");
  const locale = useTranslations()("Locale");
  const { setInsurance, setInsuranceId, setInsurancePrice } = useBooking();

  const [insuranceTypes, setInsuranceTypes] = useState<ItemType[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const toggleShown = useOverflowControl(false);

  function onRadioChange(value: string) {
    setSelectedValue(value);
    toggleShown();

    const selectedInsurance = insuranceTypes.find(
      (type) => type.attributes.name === value
    );
    if (selectedInsurance) {
      setInsurance(selectedInsurance.attributes.name);
      setInsuranceId(selectedInsurance.id);
      setInsurancePrice(selectedInsurance.attributes.base_price_in_cents);
    }
  }

  useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insurance-types`);

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
        if (data.data.length > 0) {
          const initialInsurance = data.data[0];
          setSelectedValue(initialInsurance.attributes.name);
          setInsurance(initialInsurance.attributes.name);
          setInsuranceId(initialInsurance.id);
          setInsurancePrice(initialInsurance.attributes.base_price_in_cents);
        }
      })
      .catch((error) => {
        console.error("Error fetching insurance types:", error);
      });
  }, []);

  return (
    <div className="mb-8">
      <Label htmlFor="terms" className="text-grayFont text-lg font-medium">
        {t("insuranceType")}
      </Label>
      <RadioGroup.Root
        className="flex flex-col gap-4 mt-2"
        onValueChange={onRadioChange}
        value={selectedValue}
      >
        {insuranceTypes.map((type) => (
          <RadioGroup.Item
            id="insurance"
            key={type.id}
            value={type.attributes.name}
            className={`p-4 flex flex-col gap-2 text-grayFont transition-[outline] ${
              selectedValue === type.attributes.name
                ? "outline-primary outline outline-2 "
                : "outline-borderGray outline outline-1"
            }`}
          >
            <div className="flex items-center w-full justify-between">
              <p className="font-medium">{type.attributes.name}</p>
              <div className="mr-2">
                {selectedValue === type.attributes.name ? (
                  <CircleDot className="w-6 h-6 text-primary" />
                ) : (
                  <Circle className="w-6 h-6 text-grayFont" />
                )}
              </div>
            </div>
            <p>
              {type.attributes.base_currency.toUpperCase()}{" "}
              {type.attributes.base_price_in_cents}
            </p>
            <p
              className="text-sm text-left"
              dangerouslySetInnerHTML={{ __html: type.attributes.description }}
            ></p>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
