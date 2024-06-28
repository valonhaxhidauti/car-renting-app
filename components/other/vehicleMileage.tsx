import * as RadioGroup from "@radix-ui/react-radio-group";
import { Label } from "../ui/label";
import { Circle, CircleDot } from "lucide-react";
import { useEffect, useState } from "react";
import { useOverflowControl } from "../hooks/useOverflowControl";
import { useTranslations } from "next-intl";
import { ItemType } from "@/lib/types";
import { useBooking } from "../context/BookingContext";

export default function VehicleMileage() {
  const t = useTranslations("VehicleDetails");
  const locale = useTranslations()("Locale");
  const { setMileage, setMileageId, setMileagePrice } = useBooking();

  const [vehicleMileage, setVehicleMileage] = useState<ItemType[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const toggleShown = useOverflowControl(false);

  function onRadioChange(value: string) {
    setSelectedValue(value);
    toggleShown();

    const selectedMileage = vehicleMileage.find(
      (type) => type.attributes.name === value
    );
    if (selectedMileage) {
      setMileage(selectedMileage.attributes.name);
      setMileageId(selectedMileage.id);
      setMileagePrice(selectedMileage.attributes.base_price_in_cents);
    }
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
        if (data.data.length > 0) {
          const initialMileage = data.data[0];
          setSelectedValue(initialMileage.attributes.name);
          setMileage(initialMileage.attributes.name);
          setMileageId(initialMileage.id);
          setMileagePrice(initialMileage.attributes.base_price_in_cents);
        }
      })
      .catch((error) => {
        console.error("Error fetching vehicle mileage types:", error);
      });
  }, []);

  return (
    <div className="my-4">
      <Label htmlFor="terms" className="text-grayFont text-lg font-medium">
        {t("mileageType")}
      </Label>
      <RadioGroup.Root
        className="flex flex-col gap-4 mt-2"
        onValueChange={onRadioChange}
        value={selectedValue}
      >
        {vehicleMileage.map((type) => (
          <RadioGroup.Item
            id="mileage"
            key={type.id}
            value={type.attributes.name}
            className={`p-4 flex flex-col gap-2 text-grayFont transition-[outline] ${
              selectedValue === type.attributes.name
                ? "outline-primary outline outline-2"
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
