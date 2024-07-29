import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Dayjs } from "dayjs";
import { Location, RentFormData } from "@/lib/types";
import { SearchIcon } from "@/assets/svgs";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "./datePicker";
import TextField from "@mui/material/TextField";

interface LocationFormProps {
  formData: RentFormData;
  showReturnLocation: boolean;
  rentLocations: Location[];
  returnLocations: Location[];
  handleInputChange: (
    field: keyof RentFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleRentSelect: () => void;
  toggleReturnSelect: () => void;
  handleLocationSelect: (location: Location, type: "rent" | "return") => void;
  handleDateChange: (
    field: "pickupDate" | "dropOffDate",
    date: Dayjs | null
  ) => void;
  errorMessage: string | null;
  handleCheckboxClick: () => void;
  fetchLocationsOnFocus: (field: "rent" | "return") => void;
  id?: string;
}

export default function LocationForm({
  formData,
  showReturnLocation,
  rentLocations,
  returnLocations,
  handleInputChange,
  toggleRentSelect,
  toggleReturnSelect,
  handleLocationSelect,
  handleDateChange,
  errorMessage,
  handleCheckboxClick,
  fetchLocationsOnFocus,
  id = "diffLocation",
}: LocationFormProps) {
  const t = useTranslations("RentForm");

  const handleFocus = useCallback(
    (field: "rent" | "return") => {
      if (field === "rent") {
        toggleRentSelect();
      } else {
        toggleReturnSelect();
      }
      fetchLocationsOnFocus(field);
    },
    [fetchLocationsOnFocus, toggleRentSelect, toggleReturnSelect]
  );
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col">
        <Autocomplete
          openOnFocus
          id="rent-location-select"
          options={rentLocations}
          getOptionLabel={(option) => option.attributes.name}
          sx={{
            ".MuiInput-input": {
              padding: "8px !important",
            },
            ".MuiInputBase-root": {
              marginTop: "16px !important",
            },
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              handleLocationSelect(newValue, "rent");
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("rentLocation.placeholder")}
              value={formData.rentLocation}
              onChange={handleInputChange("rentLocation")}
              onFocus={() => handleFocus("rent")}
              variant="standard"
            />
          )}
        />
        <Autocomplete
          openOnFocus
          id="return-location-select"
          className={`w-full ${showReturnLocation ? "block" : "hidden"}`}
          options={returnLocations}
          getOptionLabel={(option) => option.attributes.name}
          sx={{
            ".MuiInput-input": {
              padding: "8px !important",
            },
            ".MuiInputBase-root": {
              marginTop: "16px !important",
            },
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              handleLocationSelect(newValue, "return");
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("returnLocation.placeholder")}
              value={formData.returnLocation}
              onChange={handleInputChange("returnLocation")}
              onFocus={() => handleFocus("return")}
              variant="standard"
            />
          )}
        />
        <DatePicker
          pickupDate={formData.pickupDate}
          dropOffDate={formData.dropOffDate}
          handleDateChange={handleDateChange}
        />
      </div>
      <p
        className={`mt-2 text-base font-medium transition-opacity text-primary ${
          errorMessage ? "opacity-100" : "opacity-0"
        }`}
      >
        {errorMessage}
      </p>
      <button
        type="submit"
        className="w-24 flex items-center justify-center bg-primary hover:bg-secondary text-white px-4 pt-2.5 pb-2 transition"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
      <div className="flex items-center space-x-2 pt-4">
        <Checkbox
          id={id}
          checked={showReturnLocation}
          onCheckedChange={handleCheckboxClick}
        />
        <Label
          htmlFor={id}
          className="text-sm font-medium leading-none cursor-pointer text-grayFont"
        >
          {t("deliverAtDifferentPoint")}
        </Label>
      </div>
    </div>
  );
}
