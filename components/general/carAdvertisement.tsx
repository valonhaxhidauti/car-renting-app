"use client";

import { FuelIcon, TransmissionIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { CarAdData } from "@/lib/types";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function CarAdvertisement() {
  const t = useTranslations("Homepage");
  const locale = useTranslations()("Locale");

  const [carData, setCarData] = useState<CarAdData>({
    id: "",
    attributes: {
      name: "",
      base_price_in_cents: "",
    },
    relationships: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const url = new URL("https://rent-api.rubik.dev/api/cars/featured");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept-Language": locale,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setCarData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filters:", error);
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  if (loading) {
    return (
      <div className="hidden laptop:block bg-secondary w-1/2 h-1/6 fixed bottom-0 right-0">
        <div className="bg-primary w-[30%] h-full absolute bottom-0 -translate-x-full flex flex-col justify-center items-center">
          <Skeleton className="rounded-sm h-4 w-16 mb-2" />
          <Skeleton className="rounded-sm h-4 w-32" />
        </div>
        <div className="flex max-w-[720px] h-full relative gap-16 px-8 bigDesktop:pr-0 py-4 text-white">
          <div className="flex flex-col justify-center">
            <Skeleton className="rounded-sm h-3 w-16 mb-2" />
            <Skeleton className="rounded-sm h-12 w-24" />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <Skeleton className="rounded-sm h-4 w-40 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="rounded-sm h-4 w-16" />
              <Skeleton className="rounded-sm h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!carData) {
    return null;
  }

  return (
    <div className="hidden laptop:block bg-secondary w-1/2 h-1/6 fixed bottom-0 right-0">
      <div className="bg-primary w-[30%] h-full flex absolute bottom-0 -translate-x-full">
        <Link
          href={`explore/vehicle?vehicleId=${carData.id}`}
          className="group flex flex-col m-auto items-center"
        >
          <p className="text-white text-base font-bold group-hover:text-slate-300 transition-colors">
            {t("rentNow")}
          </p>
          <p className="text-white text-xs group-hover:text-slate-300 transition-colors">
            {carData.attributes.name.split(" (")[0]}
          </p>
        </Link>
      </div>
      <div className="flex max-w-[720px] h-full relative justify-between px-8 bigDesktop:pr-0 py-4 text-white">
        <div className="flex flex-col justify-center">
          <p className="text-[10px] leading-none">
            {t("carDetails.startFrom")}
          </p>
          <div>
            <span className="text-3xl font-bold">
              {carData.attributes.base_price_in_cents}
            </span>
            <span className="inline-block">
              <sup className="relative block text-xs leading-none font-bold -top-[2px]">
                ,00
              </sup>
              <sub className="relative text-xs block leading-none font-bold top-0">
                {t("carDetails.daily")}
              </sub>
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="text-white text-base font-bold leading-none">
            {carData.attributes.name.split(" (")[0]}
          </p>
          <div className="flex gap-2 text-[10px]">
            <span className="flex items-center text-center">
              <FuelIcon className="h-6 w-8" />
              {carData.relationships.fuelType.attributes.name}
            </span>
            <span className="flex items-center text-center">
              <TransmissionIcon className="h-6 w-8" />
              {carData.relationships.gearType.attributes.name}
            </span>
          </div>
        </div>
        {carData.relationships.media ? (
          <Image
            src={`${carData.relationships.media[1].attributes.public_url}`}
            alt={carData.attributes.name}
            fill
            sizes="100%"
            className="!-top-8 desktop:!h-[120%] !w-[auto] !relative pointer-events-none"
          />
        ) : (
          <Image
            src="/sampleCar.png"
            alt={carData.attributes.name.split(" (")[0]}
            width="240"
            height="120"
            className="-top-8 desktop:h-[120%] w-[auto] relative pointer-events-none"
            priority
          />
        )}
      </div>
    </div>
  );
}
