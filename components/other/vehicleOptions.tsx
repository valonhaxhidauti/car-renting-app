import {
  ChildSeatIcon,
  DriverIcon,
  InfoIcon,
  InsuranceIcon,
  NavigationIcon,
} from "@/assets/svgs";
import { useTranslations } from "next-intl";

export default function VehicleOptions(props: any) {
  const t = useTranslations("VehicleDetails");

  return (
    <div className="grid laptop:grid-cols-2 desktop:grid-cols-4 border-borderGray border-y border-x w-full">
      <div className="flex gap-2 items-center pl-4 border-b desktop:border-b-0 laptop:border-r">
        <div className="w-10 laptop:w-fit">
          <ChildSeatIcon />
        </div>
        <div className="p-2 flex justify-between items-center w-full">
          <div className="flex flex-col text-grayFont">
            <p className="flex items-center text-[10px] font-bold gap-1">
              {t("childSeat").toUpperCase()}
              <InfoIcon className="text-primary" />
            </p>
            <p className="text-sm text-graySecondary">
              CHF {props.prices.childSeat.toFixed(2)}/{t("daily")}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              onClick={props.incChildSeat}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center 
        ${
          props.childSeat === 3
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer hover:bg-slate-200"
        }`}
            >
              +
            </div>
            <p className="font-bold text-grayFont">{props.childSeat}</p>
            <div
              onClick={props.decChildSeat}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 relative 
        ${
          props.childSeat === 0
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
      <div className="flex gap-2 items-center pl-4 border-b desktop:border-b-0 desktop:border-r">
        <div className="w-10 laptop:w-fit">
          <NavigationIcon />
        </div>
        <div className="p-2 flex justify-between items-center w-full">
          <div className="flex flex-col text-grayFont">
            <p className="flex items-center text-[10px] font-bold gap-1">
              {t("navigation").toUpperCase()}
              <InfoIcon className="text-primary" />
            </p>
            <p className="text-sm text-graySecondary">
              CHF {props.prices.navigation.toFixed(2)}/{t("daily")}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              onClick={props.incNavigation}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center 
        ${
          props.navigation === 1
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer hover:bg-slate-200"
        }`}
            >
              +
            </div>
            <p className="font-bold text-grayFont">{props.navigation}</p>
            <div
              onClick={props.decNavigation}
              className={`text-grayFont border-gray-400 bg-white border rounded-md text-sm px-1 w-5 relative ${
                props.navigation === 0
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
      <div className="flex gap-2 items-center pl-4 border-b laptop:border-b-0 laptop:border-r">
        <div className="w-10 laptop:w-fit">
          <DriverIcon />
        </div>
        <div className="p-2 flex justify-between items-center w-full">
          <div className="flex flex-col text-grayFont">
            <p className="flex items-center text-[10px] font-bold gap-1">
              {t("additionalDriver").toUpperCase()}
              <InfoIcon className="text-primary" />
            </p>
            <p className="text-sm text-graySecondary">
              CHF {props.prices.driver.toFixed(2)}/{t("daily")}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              onClick={props.incDriver}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center
        ${
          props.driver === 1
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer hover:bg-slate-200"
        }`}
            >
              +
            </div>
            <p className="font-bold text-grayFont">{props.driver}</p>
            <div
              onClick={props.decDriver}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 relative *:${
                props.driver === 0
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
      <div className="flex gap-2 items-center pl-4">
        <div className="w-10 laptop:w-fit">
          <InsuranceIcon className="" />
        </div>
        <div className="p-2 flex justify-between items-center w-full">
          <div className="flex flex-col text-grayFont">
            <p className="flex items-center text-[10px] font-bold gap-1">
              {t("damageInsurance").toUpperCase()}
              <InfoIcon className="text-primary" />
            </p>
            <p className="text-sm text-graySecondary">
              CHF {props.prices.insurance.toFixed(2)}/{t("daily")}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              onClick={props.incInsurance}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center 
        ${
          props.insurance === 1
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer hover:bg-slate-200"
        }`}
            >
              +
            </div>
            <p className="font-bold text-grayFont">{props.insurance}</p>
            <div
              onClick={props.decInsurance}
              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 relative 
        ${
          props.insurance === 0
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
    </div>
  );
}
