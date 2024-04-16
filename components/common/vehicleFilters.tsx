import React from "react";

export default function VehicleFilters() {
  return (
    <>
      <div className="flex flex-col items-start gap-2 pb-4 border-borderGray border-b">
        <div className="flex space-between w-full">
          <p className="pb-2 text-sm font-bold w-full">Vehicle Class</p>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" id="economic" className="cursor-pointer" />
          <label
            htmlFor="economic"
            className="text-grayFont text-xs cursor-pointer"
          >
            Economic
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            Middle Class
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            Top Grade
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">Luxury</label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            7+ Persons
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">SUV</label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">Vehicle Type</p>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">Sedan</label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            Hatchback
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            Stationwagon
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">SUV</label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">VAN</label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
        <p className="pb-2 text-sm font-bold">Gear Type</p>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            Autoamatic
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">Manual</label>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 mt-4">
        <p className="pb-2 text-sm font-bold">Fuel Type</p>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">Diesel</label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            Autogas
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">Hybrid</label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            Gasoline
          </label>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" className="cursor-pointer" />
          <label className="text-grayFont text-xs cursor-pointer">
            Electrical
          </label>
        </div>
      </div>
    </>
  );
}
