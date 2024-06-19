import { CarRackIcon, ChildSeatIcon, NavigationIcon } from "@/assets/svgs";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTranslations } from "next-intl";

export default function VehicleOptions({
  extraOptions,
  childSeat,
  incChildSeat,
  decChildSeat,
  maxChildSeat,
  rack,
  incRack,
  decRack,
  maxRack,
  navi,
  incNavi,
  decNavi,
  maxNavi
}:any) {
  const t = useTranslations("VehicleDetails");

  const childSeatPrice =
    extraOptions?.[0]?.attributes?.base_price_in_cents.toFixed(2) || 0;
  const rackPrice =
    extraOptions?.[1]?.attributes?.base_price_in_cents.toFixed(2) || 0;
  const naviPrice =
    extraOptions?.[2]?.attributes?.base_price_in_cents.toFixed(2) || 0;

  return (
    <div className="grid laptop:grid-cols-3 border-borderGray border-y border-x w-full mb-8">
      <div className="flex gap-2 items-center pl-4 border-b laptop:border-b-0 laptop:border-r">
        <div className="w-10 laptop:w-fit">
          <ChildSeatIcon />
        </div>
        <div className="p-2 flex justify-between items-center w-full">
          <div className="flex flex-col text-grayFont">
            <p className="flex items-center text-[10px] font-bold gap-1">
              {t("childSeat").toUpperCase()}
            </p>
            <p className="text-sm text-graySecondary">CHF {childSeatPrice}</p>
          </div>
          <div className="flex flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={incChildSeat}
                    className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center 
                    ${
                      childSeat === maxChildSeat
                        ? "cursor-not-allowed text-gray-400"
                        : "cursor-pointer hover:bg-slate-200"
                    }`}
                  >
                    +
                  </div>
                </TooltipTrigger>
                {childSeat === maxChildSeat && (
                  <TooltipContent className="bg-secondary border-none">
                    <p className="text-white">{t("noChildSeatsAvailable")}</p>
                    <TooltipArrow className="fill-secondary" />
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <p className="font-bold text-grayFont">{childSeat}</p>
            <div
              onClick={decChildSeat}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 relative 
              ${
                childSeat === 0
                  ? "cursor-not-allowed text-gray-400"
                  : "cursor-pointer hover:bg-slate-200"
              }`}
            >
              &nbsp;
              <span className="absolute -top-1.5 left-1.5">_</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center pl-4 border-b laptop:border-b-0 laptop:border-r">
        <div className="w-10 laptop:w-fit">
          <CarRackIcon />
        </div>
        <div className="p-2 flex justify-between items-center w-full">
          <div className="flex flex-col text-grayFont">
            <p className="flex items-center text-[10px] font-bold gap-1">
              {t("additionalRack").toUpperCase()}
            </p>
            <p className="text-sm text-graySecondary">CHF {rackPrice}</p>
          </div>
          <div className="flex flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={incRack}
                    className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center
                    ${
                      rack === maxRack
                        ? "cursor-not-allowed text-gray-400"
                        : "cursor-pointer hover:bg-slate-200"
                    }`}
                  >
                    +
                  </div>
                </TooltipTrigger>
                {rack === maxRack && (
                  <TooltipContent className="bg-secondary border-none">
                    <p className="text-white">{t("noRacksAvailable")}</p>
                    <TooltipArrow className="fill-secondary" />
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <p className="font-bold text-grayFont">{rack}</p>
            <div
              onClick={decRack}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 relative ${
                rack === 0
                  ? "cursor-not-allowed text-gray-400"
                  : "cursor-pointer hover:bg-slate-200"
              }`}
            >
              &nbsp;
              <span className="absolute -top-1.5 left-1.5">_</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center pl-4 ">
        <div className="w-10 laptop:w-fit">
          <NavigationIcon />
        </div>
        <div className="p-2 flex justify-between items-center w-full">
          <div className="flex flex-col text-grayFont">
            <p className="flex items-center text-[10px] font-bold gap-1">
              {t("navigation").toUpperCase()}
            </p>
            <p className="text-sm text-graySecondary">CHF {naviPrice}</p>
          </div>
          <div className="flex flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={incNavi}
                    className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center 
                    ${
                      navi === maxNavi
                        ? "cursor-not-allowed text-gray-400"
                        : "cursor-pointer hover:bg-slate-200"
                    }`}
                  >
                    +
                  </div>
                </TooltipTrigger>
                {navi === maxNavi && (
                  <TooltipContent className="bg-secondary border-none">
                    <p className="text-white">{t("noNavigationAvailable")}</p>
                    <TooltipArrow className="fill-secondary" />
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <p className="font-bold text-grayFont">{navi}</p>
            <div
              onClick={decNavi}
              className={`text-grayFont border-gray-400 bg-white border rounded-md text-sm px-1 w-5 relative ${
                navi === 0
                  ? "cursor-not-allowed text-gray-400"
                  : "cursor-pointer hover:bg-slate-200"
              } `}
            >
              &nbsp;
              <span className="absolute -top-1.5 left-1.5">_</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
