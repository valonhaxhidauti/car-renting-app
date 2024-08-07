import { useTranslations } from "next-intl";
import { Location } from "@/lib/types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface Props {
  showSelect: boolean;
  toggleSelect: () => void;
  locations: Location[];
  handleLocationSelect: (location: Location) => void;
}

const LocationsSelect = ({
  showSelect,
  toggleSelect,
  locations,
  handleLocationSelect,
}: Props) => {
  const t = useTranslations("RentForm.locationSelect");

  return (
    <div
      className={`absolute z-50 max-w-lg bg-white shadow-xl border-borderGray border w-full top-12 p-4 rounded-xl ${
        showSelect ? "block" : "hidden"
      }`}
    >
      <div className="w-full text-lg text-center">{t("selectLocation")}</div>

      <Autocomplete
        disablePortal
        className="p-4"
        id="location-select"
        options={locations}
        getOptionLabel={(option) => option.attributes.name}
        sx={{
          width: "100%",
          marginTop: "2rem",
          ".css-18fodn4-MuiAutocomplete-root .MuiInput-root .MuiInput-input": {
            padding: "15px !important",
            fontWeight: "300",
            cursor: "pointer",
          },
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            handleLocationSelect(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label={t("selectLocation")} />
        )}
      />
      <div className="scrollbar w-full mt-2 flex flex-col overflow-auto max-h-80">
        {locations.length === 0 && (
          <div className="p-2 text-sm text-gray-500">
            {t("noLocationsFound")}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsSelect;
