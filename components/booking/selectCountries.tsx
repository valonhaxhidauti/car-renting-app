import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useEffect } from "react";
import { useOverflowControl } from "../hooks/useOverflowControl";
import { useTranslations } from "next-intl";

interface CountryAttributes {
  name: string;
  flag: string;
}

interface CountryData {
  type: string;
  id: string;
  attributes: CountryAttributes;
  relationships: any[];
}

interface CountryResponse {
  data: CountryData[];
}

interface SelectCountriesProps {
  onChange: (value: string) => void;
  selectedCountryId?: string;
  error?: boolean;
  readOnly: boolean;
}

export const SelectCountries: React.FC<SelectCountriesProps> = ({
  onChange,
  selectedCountryId,
  error,
  readOnly,
}) => {
  const locale = useTranslations()("Locale");
  const t = useTranslations("vehiclePayment");

  const [countries, setCountries] = useState<CountryData[]>([]);
  const toggleShown = useOverflowControl(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    selectedCountryId
  );

  useEffect(() => {
    async function fetchCountries() {
      try {
        const url = new URL(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/countries");
        const headers = {
          "Accept-Language": locale,
          "Content-Type": "application/json",
          Accept: "application/json",
        };
        const response = await fetch(url, { method: "GET", headers });
        const result: CountryResponse = await response.json();
        setCountries(result.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }

    fetchCountries();
  }, [locale]);

  function onSelectClicked() {
    toggleShown();
  }

  useEffect(() => {
    if (selectedCountryId) {
      setSelectedValue(selectedCountryId);
    }
  }, [selectedCountryId]);

  return (
    <Select
      onValueChange={(value) => {
        setSelectedValue(value);
        onChange(value);
      }}
      onOpenChange={onSelectClicked}
      value={selectedValue}
      disabled={readOnly}
    >
      <SelectTrigger
        className={`w-full rounded-sm focus-visible:outline-primary disabled:opacity-100 disabled:cursor-default focus:ring-0 py-[27px] mt-2 ${
          error
            ? "outline outline-2 outline-red-500 focus:outline-offset-0"
            : "border-borderForm border focus:outline-offset-0"
        }
        ${readOnly ? "bg-gray-100" : "bg-white"}`}
      >
        <SelectValue placeholder={t("selectCountry")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("countries")}</SelectLabel>
          {countries.map((country) => (
            <SelectItem key={country.attributes.name} value={country.attributes.name}>
              {country.attributes.flag} {country.attributes.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
