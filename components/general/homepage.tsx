import Image from "next/image";
import RentForm from "./rentForm";
import { GearIcon, FuelIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";

export default function Homepage() {
  const t = useTranslations("Homepage");

  return (
    <>
      <div>
        <div className="absolute -z-10 w-full tablet:w-1/2 h-screen">
          <Image
            src="/homeBackground.png"
            alt="homeBg"
            fill
            sizes="width:100%"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex max-w-[1440px] m-auto">
          <div className="hidden tablet:flex w-1/2 h-screen gap-4 items-start p-8 flex-col justify-center">
            <h1 className="text-4xl leading-tight laptop:text-5xl text-white font-bold">
              {t.rich("enjoyJourney.title", { br: () => <br /> })}
            </h1>
            <p className="text-base laptop:text-lg text-white">
              {t("enjoyJourney.subtitle")}
            </p>
          </div>
          <RentForm />
          <div className="hidden laptop:block bg-secondary w-1/2 h-1/6 fixed bottom-0 right-0 ">
            <div className="bg-primary w-1/4 h-full absolute bottom-0 -translate-x-full flex flex-col justify-center items-center">
              <p className="text-white text-base font-bold">{t("rentNow")}</p>
              <p className="text-white text-[9px]">Volvo XC90 Excellence</p>
            </div>
            <div className="flex max-w-[720px] h-full relative justify-between px-8 py-4 text-white">
              <div className="flex flex-col justify-center">
                <p className="text-[9px] leading-none">
                  {t("carDetails.startFrom")}
                </p>
                <div className="text-3xl">
                  <sup className="text-xs font-bold -top-4">$</sup>
                  <span className="text-4xl font-bold">64</span>
                  <span className="inline-block text-lg">
                    <sup className="relative block leading-none font-bold -top-[3px]">
                      ,99
                    </sup>
                    <sub className="relative block leading-none font-bold top-0">
                      {t("carDetails.daily")}
                    </sub>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <p className="text-white text-base font-bold leading-none">
                  Volvo XC90 Excellence
                </p>
                <div className="flex gap-4 text-[10px]">
                  <span className="flex gap-1 items-center">
                    <FuelIcon />
                    {t("carDetails.fuelType")}
                  </span>
                  <span className="flex gap-1 items-center">
                    <GearIcon /> {t("carDetails.transmission")}
                  </span>
                </div>
              </div>
              <Image
                src="/sampleCar.png"
                alt="Volvo"
                fill
                sizes="100%"
                className="!-top-8 desktop:!h-[120%] !w-[auto] !relative"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
