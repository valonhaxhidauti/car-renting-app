"use client";

import { useForm } from "react-hook-form";
import { SearchIcon } from "@/assets/svgs";

interface IFormInputs {
  rentLocation: string;
  showReturnLocation: boolean;
  returnLocation: string;
  pickupDate: string;
  dropOffDate: string;
}

export default function RentForm() {
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
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow-search w-full rounded-[8px] desktop:rounded-none p-2 desktop:p-0 bg-white">
        <div className="flex flex-col desktop:flex-row relative w-full">
          <div className="desktop:py-1 w-full flex flex-col desktop:flex-row bg-white">
            <input
              type="text"
              {...register("rentLocation", { required: true })}
              placeholder={errors.rentLocation ? "Required" : "Rent Location"}
              className={`${
                watchShowReturnLocation ? "desktop:w-1/4" : "desktop:w-1/2"
              } w-full p-2 ${
                errors.rentLocation ? "placeholder:text-red-500" : ""
              }`}
            />
            {watchShowReturnLocation && (
              <input
                type="text"
                {...register("returnLocation")}
                placeholder="Return Location"
                className="w-full desktop:w-1/4 border-t desktop:border-t-0 desktop:border-l border-gray-300 p-2"
              />
            )}
            <input
              type="date"
              {...register("pickupDate")}
              className="w-full desktop:w-1/4 border-t desktop:border-t-0 desktop:border-l border-gray-300 p-2"
            />
            <input
              type="date"
              {...register("dropOffDate")}
              className="w-full desktop:w-1/4 border-t desktop:border-t-0 desktop:border-l border-gray-300 p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full desktop:w-24 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-[6px] desktop:rounded-none px-4 py-2 transition duration-300"
          >
            <SearchIcon />
          </button>
          <h1
            className={`hidden tablet:block absolute ${
              watchShowReturnLocation
                ? "bottom-[180px] laptop:bottom-[150px]"
                : "bottom-[140px] laptop:bottom-[110px]"
            }  laptop:bottom-0 desktop:-bottom-3 -right-2 laptop:-right-9 desktop:-right-10 font-bold text-[72px] laptop:text-[110px] desktop:text-[144px] text-[#f6f6f6] -z-10`}
          >
            Find Now
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
          className="text-sm font-medium text-white tablet:text-[#5a5a5a] leading-none cursor-pointer"
        >
          Deliver at different point
        </label>
      </div>
    </form>
  );
}
