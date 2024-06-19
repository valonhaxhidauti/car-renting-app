import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  FuelIcon,
  TransmissionIcon,
  ConsumptionIcon,
  EngineIcon,
  SeatIcon,
} from "@/assets/svgs";

export default function VehicleDetailsInfo({ vehicle }: { vehicle: any }) {
  const t = useTranslations("VehicleDetails");

  return (
    <div className="bg-white flex flex-col gap-4">
      <div className="p-4 flex flex-col tablet:flex-row mobile:gap-8 w-full">
        {vehicle.relationships.media ? (
          <Image
            src={`${vehicle.relationships.media[0].attributes.public_url}`}
            alt={vehicle.attributes.name.split(" (")[0]}
            width="300"
            height="150"
            className="py-4 tablet:py-0 pointer-events-none self-center tablet:self-start"
            priority
          />
        ) : (
          <Image
            src="/sampleCar.png"
            alt={vehicle.attributes.name.split(" (")[0]}
            width="300"
            height="150"
            className="pointer-events-none py-12 self-center mobile:self-start"
            priority
          />
        )}
        <div className="flex justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex flex-col justify-between pt-2 mb-2">
              <p className="text-grayFont font-medium text-lg">
                {vehicle.attributes.name.split(" (")[0]}
              </p>
              <p className="text-graySecondary font-medium text-xs">
                {vehicle.relationships.carType.attributes.name}
              </p>
            </div>
            <div className="flex w-full">
              <div className="flex flex-wrap items-center py-2 gap-4">
                <div className="flex gap-2 justify-between w-fit tablet:w-4/5 self-center items-center">
                  <FuelIcon className="w-10 h-6 text-graySecondary" />
                  <p className="text-xs text-grayFont tablet:text-sm">
                    {vehicle.relationships.fuelType.attributes.name}
                  </p>
                </div>
                <div className="flex gap-2 justify-between w-fit tablet:w-4/5 self-center items-center">
                  <TransmissionIcon className="w-10 h-6 text-graySecondary" />
                  <p className="text-xs text-grayFont tablet:text-sm">
                    {vehicle.relationships.gearType.attributes.name}
                  </p>
                </div>
                <div className="flex gap-2 justify-between w-fit tablet:w-4/5 self-center items-center">
                  <ConsumptionIcon className="w-10 text-graySecondary" />
                  <p className="text-xs text-grayFont tablet:text-sm">
                    {vehicle.attributes.fuel_tank_capacity_in_liters}
                  </p>
                </div>
                <div className="flex gap-2 justify-between w-fit tablet:w-4/5 self-center items-center">
                  <EngineIcon className="w-10 text-graySecondary" />
                  <p className="text-xs text-grayFont tablet:text-sm">
                    {vehicle.attributes.engine_displacement_in_metric_cubic}
                  </p>
                </div>
                <div className="flex gap-2 justify-between w-fit tablet:w-4/5 self-center items-center">
                  <SeatIcon className="w-10 text-graySecondary" />
                  <p className="text-xs text-grayFont tablet:text-sm">
                    {vehicle.attributes.seat_capacity}
                  </p>
                </div>
                <div className="flex gap-2 justify-between w-fit tablet:w-4/5 self-center items-center">
                  <p className="text-sm font-medium text-grayFont tablet:text-base">
                    {t("vehiclePrice")}
                  </p>
                  <p className="text-sm font-bold text-primary tablet:text-base">
                    CHF {vehicle.attributes.base_price_in_cents},00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
