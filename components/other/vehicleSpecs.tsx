import {
  ConsumptionIcon,
  EngineIcon,
  FuelIcon,
  HorsepowerIcon,
  KeyIcon,
  LuggageIcon,
  SeatIcon,
  TransmissionIcon,
  VehicleIcon,
} from "@/assets/svgs";

export default function VehicleSpecs({
  translations,
  allSpecifications,
}: {
  translations: any;
  allSpecifications: any;
}) {
  return (
    <div className="grid mobile:grid-cols-2 desktop:grid-cols-3 gap-4">
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <FuelIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("fuelType").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.relationships.fuelType.attributes.name}
          </p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <TransmissionIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("gearType").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.relationships.gearType.attributes.name}
          </p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <SeatIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("passengerCapacity").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.attributes.seat_capacity}{" "}
            {translations("persons")}
          </p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <KeyIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("modelYear").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.attributes.year}
          </p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <EngineIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("engineType").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.attributes.engine_displacement_in_metric_cubic}{" "}
            {translations("cubic")}
          </p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <ConsumptionIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("fuelConsumption").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.attributes.fuel_tank_capacity_in_liters} lt
          </p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <VehicleIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("vehicleType").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.relationships.carType.attributes.name}
          </p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <LuggageIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("luggageCapacity").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.attributes.car_power_in_hp} lt
          </p>
        </div>
      </div>
      <div className="flex gap-4 border-y border-borderGray py-6 items-center">
        <div className="w-9">
          <HorsepowerIcon className="text-graySecondary" />
        </div>
        <div className="flex justify-between text-grayFont w-full items-center">
          <span className="text-[9px] font-bold">
            {translations("horsepower").toUpperCase()}
          </span>
          <p className="font-medium text-sm">
            {allSpecifications.attributes.car_power_in_hp} hp
          </p>
        </div>
      </div>
    </div>
  );
}
