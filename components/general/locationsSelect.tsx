import { X } from "lucide-react";

interface Location {
  attributes: {
    name: string;
  };
}

interface Props {
  showSelect: boolean;
  toggleSelect: () => void;
  locations: Location[];
  handleLocationSelect: (location: Location) => void;
}

const LocationsSelect = ({ showSelect, toggleSelect, locations, handleLocationSelect }: Props) => {
  return (
    <div className={`absolute z-50 max-w-lg bg-white shadow-xl border-borderGray border w-3/4 top-12 p-8 rounded-xl ${showSelect ? "block" : "hidden"}`}>
      <div className="w-full text-lg text-center">Select Location</div>
      <div className="absolute top-4 right-4 rounded-full p-2 flex hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer">
        <X onClick={toggleSelect} />
      </div>
      <div className="scrollbar w-full flex flex-col overflow-auto max-h-80">
        {locations.map((location: Location, index: number) => (
          <div key={index} className="p-2 text-sm cursor-pointer hover:bg-gray-200" onClick={() => handleLocationSelect(location)}>
            {location.attributes.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsSelect;
