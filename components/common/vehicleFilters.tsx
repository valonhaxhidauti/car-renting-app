import React from "react";

export default function VehicleFilters({ filtersId }: { filtersId: string }) {
  return (
    <>
      <div className="flex flex-col items-start gap-2 pb-4 border-borderGray border-b">
        <div className="flex space-between w-full">
          <p className="pb-2 text-sm font-bold w-full">Vehicle Class</p>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass1_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass1_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Economic
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass2_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass2_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Middle Class
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass3_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass3_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Top Grade
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass4_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass4_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Luxury
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass5_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass5_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            7+ Persons
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleClass6_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleClass6_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            SUV
          </label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">Vehicle Type</p>
        <div className="flex gap-4">
          <input
            id={`vehicleType1_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType1_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Sedan
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleType2_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType2_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Hatchback
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleType3_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType3_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Stationwagon
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleType4_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType4_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            SUV
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`vehicleType5_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`vehicleType5_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            VAN
          </label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">Gear Type</p>
        <div className="flex gap-4">
          <input
            id={`gearType1_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`gearType1_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Autoamatic
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`gearType2_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`gearType2_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Manual
          </label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 mt-4">
        <p className="pb-2 text-sm font-bold">Fuel Type</p>
        <div className="flex gap-4">
          <input
            id={`fuelType1_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType1_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Diesel
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`fuelType2_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType2_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Autogas
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`fuelType3_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType3_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Hybrid
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`fuelType4_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType4_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Gasoline
          </label>
        </div>
        <div className="flex gap-4">
          <input
            id={`fuelType5_${filtersId}`}
            type="checkbox"
            className="cursor-pointer"
          />
          <label
            htmlFor={`fuelType5_${filtersId}`}
            className="text-grayFont text-xs cursor-pointer"
          >
            Electrical
          </label>
        </div>
      </div>
    </>
  );
}
