import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Location } from "@/lib/types";

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
      <div className="absolute top-2 right-2 rounded-full p-2 flex hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer">
        <X size={22} onClick={toggleSelect} />
      </div>
      <div className="scrollbar w-full mt-2 flex flex-col overflow-auto max-h-80">
        {locations.length === 0 ? (
          <div className="p-2 text-sm text-gray-500">
            {t("noLocationsFound")}
          </div>
        ) : (
          locations.map((location: Location) => (
            <div
              key={location.id}
              className="p-2 text-sm cursor-pointer hover:bg-gray-200"
              onClick={() => handleLocationSelect(location)}
            >
              {location.attributes.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocationsSelect;
