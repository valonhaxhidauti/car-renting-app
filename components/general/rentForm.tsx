"use client";

import { useForm } from "react-hook-form";
import { SearchIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";

interface IFormInputs {
  rentLocation: string;
  showReturnLocation: boolean;
  returnLocation: string;
  pickupDate: string;
  dropOffDate: string;
}

export default function RentForm() {
  const t = useTranslations("RentForm");
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const watchShowReturnLocation = watch("showReturnLocation", false);

  const onSubmit = (data: IFormInputs) => {
    console.log("TEST", data);
    alert(JSON.stringify(data));
  };

  return (
    <div className="w-full tablet:w-1/2 h-screen relative p-4 mobile:p-8 flex flex-col justify-center">
      <p className="pb-4 font-bold leading-4 text-white tablet:text-grayFont text-lg">
        {t("findYourCar")}
      </p>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow-grayPrimary w-full rounded-[8px] desktop:rounded-none p-2 desktop:p-0 bg-white">
          <div className="flex flex-col desktop:flex-row relative w-full">
            <div className="desktop:py-1 w-full flex flex-col desktop:flex-row bg-white ">
              <input
                type="text"
                {...register("rentLocation", { required: true })}
                placeholder={
                  errors.rentLocation
                    ? t("rentLocation.requiredError")
                    : t("rentLocation.placeholder")
                }
                className={`${
                  watchShowReturnLocation ? "desktop:w-1/4" : "desktop:w-1/2"
                } w-full p-2 ${
                  errors.rentLocation ? "placeholder:text-red-500" : ""
                }`}
              />
              <input
                type="text"
                {...register("returnLocation")}
                placeholder={t("returnLocation.placeholder")}
                className={`${
                  watchShowReturnLocation
                    ? "h-full transition-all duration-300 desktop:transition-none w-full desktop:w-1/4 border-t desktop:border-t-0 desktop:border-l border-borderGray-300 p-2"
                    : "w-0 h-0 transition-all duration-100 desktop:transition-none"
                } `}
              />
              <input
                type="date"
                {...register("pickupDate")}
                className="w-full desktop:w-1/4 border-t desktop:border-t-0 desktop:border-l border-borderGray-300 p-2"
              />
              <input
                type="date"
                {...register("dropOffDate")}
                className="w-full desktop:w-1/4 border-t desktop:border-t-0 desktop:border-l border-borderGray-300 p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full desktop:w-24 flex items-center justify-center bg-primary hover:bg-secondary text-white rounded-[6px] desktop:rounded-none px-4 py-2 transition"
            >
              <SearchIcon />
            </button>
            <h1
              className={`hidden tablet:block absolute ${
                watchShowReturnLocation
                  ? "bottom-[175px] laptop:bottom-[150px]"
                  : "bottom-[140px] laptop:bottom-[110px]"
              }  laptop:bottom-0 desktop:-bottom-3 -right-2 laptop:-right-9 desktop:-right-7 font-bold text-[72px] laptop:text-[110px] desktop:text-[144px] text-gray-100 -z-10`}
            >
              {t("findNow")}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <input
            id="diffLocation"
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            {...register("showReturnLocation")}
          />
          <label
            htmlFor="diffLocation"
            className="text-sm font-medium text-white tablet:text-grayFont leading-none cursor-pointer"
          >
            {t("deliverAtDifferentPoint")}
          </label>
        </div>
      </form>
    </div>
  );
}
