"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { SearchIcon } from "@/assets/svgs";

interface IFormInputs {
  rentLocation: string;
  showReturnLocation: boolean;
  returnLocation: string;
  pickupDate: string;
  dropOffDate: string;
}

export default function Homepage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const watchshowReturnLocation = watch("showReturnLocation", false);

  const onSubmit = (data: IFormInputs) => {
    console.log("TEST", data);
    alert(JSON.stringify(data));
  };

  return (
    <>
      <div>
        <div className="absolute -z-10 w-1/2 h-screen">
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
          <div className="w-0 laptop:w-1/2"></div>
          <div className="w-full h-screen items-end laptop:items-start laptop:w-1/2 p-8 flex flex-col justify-center">
            <p className="pb-4 font-bold leading-4 text-[#5a5a5a] text-lg w-full text-right laptop:text-left">
              Find your car
            </p>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow-search w-full">
                <div className="flex relative w-full">
                  <div className="py-2 bg-white flex w-full">
                    <input
                      type="text"
                      {...register("rentLocation", { required: true })}
                      placeholder={
                        errors.rentLocation ? "Required" : "Rent Location"
                      }
                      className={`${
                        watchshowReturnLocation ? "w-1/4" : "w-1/2"
                      } rounded-lg p-2 ${
                        errors.rentLocation ? "placeholder:text-red-500" : ""
                      }`}
                    />
                    {watchshowReturnLocation && (
                      <input
                        type="text"
                        {...register("returnLocation")}
                        placeholder="Return Location"
                        className="w-1/4 border-l rounded-lg p-2"
                      />
                    )}
                    <input
                      type="date"
                      {...register("pickupDate")}
                      className="w-1/4 border-l border-gray-300 rounded-lg p-2"
                    />
                    <input
                      type="date"
                      {...register("dropOffDate")}
                      className="w-1/4 border-l border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-24 flex items-center justify-center bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
                  >
                    <SearchIcon />
                  </button>
                  <h1 className="absolute -bottom-4 desktop:-bottom-5 -right-9 desktop:-right-10 font-bold text-[132px] desktop:text-[148px] text-[#f6f6f6] -z-10">
                    Find Now
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <input
                  id="diffLocation"
                  type="checkbox"
                  className="w-4 h-4"
                  {...register("showReturnLocation")}
                />
                <label
                  htmlFor="diffLocation"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Deliver at different point
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
