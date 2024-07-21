import { useTranslations } from "next-intl";
import { Dayjs } from "dayjs";
import { Location, RentFormData } from "@/lib/types";
import { SearchIcon } from "@/assets/svgs";
import LocationsSelect from "../general/locationsSelect";
import DatePicker from "./datePicker";

interface LocationFormProps {
  formData: RentFormData;
  showRentSelect: boolean;
  showReturnSelect: boolean;
  showReturnLocation: boolean;
  rentLocations: Location[];
  returnLocations: Location[];
  handleInputChange: (
    field: keyof RentFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleRentSelect: () => void;
  toggleReturnSelect: () => void;
  handleLocationSelect: (location: Location) => void;
  handleDateChange: (
    field: "pickupDate" | "dropOffDate",
    date: Dayjs | null
  ) => void;
  errorMessage: string | null;
  handleCheckboxClick: () => void;
  id?: string;
}

export default function LocationForm({
  formData,
  showRentSelect,
  showReturnSelect,
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
  id = "diffLocation",
}: LocationFormProps) {
  const t = useTranslations("RentForm");

  return (
    <div className="flex flex-col w-full gap-2">
      <div
        className={`flex flex-col ${showReturnLocation ? "gap-2" : "gap-0"}`}
      >
        <div className="w-full relative border-b font-normal text-base">
          <input
            type="text"
            autoComplete="off"
            placeholder={t("rentLocation.placeholder")}
            className="w-full p-2"
            value={formData.rentLocation}
            onChange={handleInputChange("rentLocation")}
            onFocus={handleInputChange("rentLocation")}
          />
          <LocationsSelect
            showSelect={showRentSelect}
            toggleSelect={toggleRentSelect}
            locations={rentLocations}
            handleLocationSelect={handleLocationSelect}
          />
        </div>
        <div
          className={`w-full relative font-normal text-base ${
            showReturnLocation
              ? "h-full duration-300 w-full border-b "
              : "w-0 h-0 duration-100"
          }`}
        >
          <input
            type="text"
            autoComplete="off"
            placeholder={t("returnLocation.placeholder")}
            className={` ${
              showReturnLocation
                ? "h-full duration-300 w-full p-2"
                : "w-0 h-0 duration-100"
            } `}
            value={formData.returnLocation}
            onChange={handleInputChange("returnLocation")}
            onFocus={handleInputChange("returnLocation")}
          />
          <LocationsSelect
            showSelect={showReturnSelect}
            toggleSelect={toggleReturnSelect}
            locations={returnLocations}
            handleLocationSelect={handleLocationSelect}
          />
        </div>
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
        <input
          id={id}
          type="checkbox"
          checked={showReturnLocation}
          className="w-4 h-4 cursor-pointer"
          onChange={handleCheckboxClick}
        />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none cursor-pointer text-grayFont"
        >
          {t("deliverAtDifferentPoint")}
        </label>
      </div>
    </div>
  );
}
