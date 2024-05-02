import { FuelIcon, TransmissionIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ADVERTISEMENT_DATA = {
  car: "Volvo XC90 Excellence",
  price: 64,
  priceDecimal: 99,
  fuelType: "Gas",
  transmissionType: "Manual",
  imageSrc: "/sampleCar.png",
};

export default function CarAdvertisement() {
  const t = useTranslations("Homepage");

  let fuelTypeText;

  switch (ADVERTISEMENT_DATA.fuelType) {
    case "Gas" || "Benzin" :
      fuelTypeText = t("carDetails.fuelType.gasFuel");
      break;
    case "Diesel":
      fuelTypeText = t("carDetails.fuelType.dieselFuel");
      break;
    case "Electric" || "Elektrisch":
      fuelTypeText = t("carDetails.fuelType.electricFuel");
      break;
    default:
      fuelTypeText = ""; 
  }

  return (
    <div className="hidden laptop:block bg-secondary w-1/2 h-1/6 fixed bottom-0 right-0 ">
      <div className="bg-primary w-[30%] h-full absolute bottom-0 -translate-x-full flex flex-col justify-center items-center">
        <p className="text-white text-base font-bold">{t("rentNow")}</p>
        <p className="text-white text-xs">{ADVERTISEMENT_DATA.car}</p>
      </div>
      <div className="flex max-w-[720px] h-full relative justify-between px-8 py-4 text-white">
        <div className="flex flex-col justify-center">
          <p className="text-xs leading-none">{t("carDetails.startFrom")}</p>
          <div className="text-3xl">
            <sup className="text-xs font-bold -top-4">$</sup>
            <span className="text-4xl font-bold">{ADVERTISEMENT_DATA.price}</span>
            <span className="inline-block text-lg">
              <sup className="relative block leading-none font-bold -top-[3px]">
                ,{ADVERTISEMENT_DATA.priceDecimal}
              </sup>
              <sub className="relative block leading-none font-bold top-0">
                {t("carDetails.daily")}
              </sub>
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3">
          <p className="text-white text-base font-bold leading-none">
            {ADVERTISEMENT_DATA.car}
          </p>
          <div className="flex gap-4 text-[10px]">
            <span className="flex gap-1 items-center">
              <FuelIcon />
              {fuelTypeText}
            </span>
            <span className="flex gap-1 items-center">
              <TransmissionIcon />
              {ADVERTISEMENT_DATA.transmissionType === ("Automatic" || "Automatik") 
                ? t("carDetails.transmissionType.automaticTransmission")
                : t("carDetails.transmissionType.manualTransmission")}
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
  );
}
