import { useTranslations } from "next-intl";
import Image from "next/image";
import RentForm from "./rentForm";
import CarAdvertisement from "./carAdvertisement";

export default function Homepage() {
  const t = useTranslations("Homepage");

  return (
    <>
      <div className="absolute -z-10 w-full tablet:w-1/2 h-screen">
        <Image
          src="/homeBackground.png"
          alt="Home background image"
          fill
          sizes="width:100%"
          className="object-cover !h-[101%]"
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
        <RentForm modal={false}/>
        <CarAdvertisement />
      </div>
    </>
  );
}
