"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { EditBookingIcon, SearchIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useState } from "react";

interface IFormInputs {
  rentLocation: string;
  showReturnLocation: boolean;
  returnLocation: string;
  pickupDate: string;
  dropOffDate: string;
}

export default function RentForm({ modal }: { modal: boolean }) {
  const t = useTranslations("RentForm");
  const router = useRouter();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const watchShowReturnLocation = watch("showReturnLocation", false);
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [dropOffDate, setDropOffDate] = useState<Dayjs | null>(null);

  const handlePickupDateChange = (date: Dayjs | null) => {
    if (date) {
      setPickupDate(dayjs(date));
    }
  };

  const handleDropOffDateChange = (date: Dayjs | null) => {
    if (date) {
      setDropOffDate(dayjs(date));
    }
  };

  const onSubmit = (data: IFormInputs) => {
    const { rentLocation, showReturnLocation, returnLocation } = data;
    if (pickupDate && dropOffDate) {
      const timeDifferenceHours = dropOffDate.diff(pickupDate, "hours");

      if (timeDifferenceHours < 1) {
        <div>test</div>;
        return;
      }
    }
    const queryParams = new URLSearchParams({
      rentLocation,
      returnLocation: showReturnLocation ? returnLocation : rentLocation,
      pickupDate: pickupDate ? pickupDate.format("DD/MM/YYYY") : "",
      dropOffDate: dropOffDate ? dropOffDate.format("DD/MM/YYYY") : "",
    }).toString();

    router.push(`/explore?${queryParams}`);
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return modal ? (
    <>
      <div
        className={`fixed top-0 right-0 left-0 bottom-0  z-10 w-full fill-mode-forwards	${
          showModal ? "animate-show-overlay" : "hidden"
        }`}
        onClick={toggleModal}
      ></div>
      <Dialog modal={false}>
        <DialogTrigger>
          <EditBookingIcon className="cursor-pointer" onClick={toggleModal} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("search")}</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full desktop:rounded-none">
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        {...register("rentLocation", { required: true })}
                        placeholder={
                          errors.rentLocation
                            ? t("rentLocation.requiredError")
                            : t("rentLocation.placeholder")
                        }
                        className={`w-full p-2 border-b ${
                          errors.rentLocation ? "placeholder:text-red-500" : ""
                        }`}
                      />
                      <input
                        type="text"
                        {...register(
                          "returnLocation",
                          watchShowReturnLocation
                            ? { required: true }
                            : { required: false }
                        )}
                        placeholder={
                          errors.returnLocation
                            ? t("returnLocation.requiredError")
                            : t("returnLocation.placeholder")
                        }
                        className={`${
                          watchShowReturnLocation
                            ? "h-full transition-all duration-300 w-full border-b p-2"
                            : "w-0 h-0 transition-all duration-100"
                        } ${
                          errors.returnLocation
                            ? "placeholder:text-red-500"
                            : ""
                        }`}
                      />
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={t("locale")}
                      >
                        <div className="w-full border-b">
                          <MobileDateTimePicker
                            className="w-full"
                            disablePast
                            value={pickupDate}
                            onChange={handlePickupDateChange}
                            slotProps={{
                              textField: { placeholder: "Pickup Date" },
                            }}
                            sx={{
                              ".MuiInputBase-root input": {
                                padding: "8px 9px",
                                cursor: "pointer",
                              },
                              ".MuiInputBase-root input::placeholder": {
                                color: "hsl( 0 0% 15%) !important",
                              },
                              ".MuiInputBase-root fieldset": {
                                border: "none !important",
                              },
                            }}
                          />
                        </div>
                        <div className="w-full border-b">
                          <MobileDateTimePicker
                            className="w-full"
                            value={dropOffDate}
                            disablePast
                            onChange={handleDropOffDateChange}
                            slotProps={{
                              textField: { placeholder: "Dropoff Date" },
                            }}
                            sx={{
                              ".MuiInputBase-root input": {
                                padding: "8px 9px",
                                cursor: "pointer",
                              },
                              ".MuiInputBase-root input::placeholder": {
                                color: "hsl( 0 0% 15%) !important",
                              },
                              ".MuiInputBase-root fieldset": {
                                border: "none !important",
                              },
                            }}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                    <DialogClose asChild>
                      <button
                        type="submit"
                        onClick={toggleModal}
                        className="w-24 flex items-center justify-center bg-primary hover:bg-secondary text-white px-4 py-2 transition"
                      >
                        <SearchIcon className="w-5 h-5" />
                      </button>
                    </DialogClose>
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
                    className="text-sm font-medium text-grayFont leading-none cursor-pointer"
                  >
                    {t("deliverAtDifferentPoint")}
                  </label>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <div className="w-full tablet:w-1/2 h-screen relative p-4 mobile:p-8 flex flex-col justify-center">
      <p className="pb-4 font-bold leading-4 text-white tablet:text-grayFont text-lg">
        {t("findYourCar")}
      </p>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow-grayPrimary w-full p-4 pt-2 rounded-md bg-white">
          <div className="flex flex-col relative w-full">
            <div className="w-full flex flex-col bg-white items-start">
              <input
                type="text"
                {...register("rentLocation", { required: true })}
                placeholder={
                  errors.rentLocation
                    ? t("rentLocation.requiredError")
                    : t("rentLocation.placeholder")
                }
                className={`w-full p-2 border-b ${
                  errors.rentLocation ? "placeholder:text-red-500" : ""
                }`}
              />
              <input
                type="text"
                {...register("returnLocation", { required: true })}
                {...register(
                  "returnLocation",
                  watchShowReturnLocation
                    ? { required: true }
                    : { required: false }
                )}
                className={`${
                  watchShowReturnLocation
                    ? "h-full transition-all duration-300 w-full border-b p-2"
                    : "w-0 h-0 transition-all duration-100"
                } ${errors.returnLocation ? "placeholder:text-red-500" : ""}`}
              />
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={t("locale")}
              >
                <div className="w-full border-b">
                  <MobileDateTimePicker
                    className="w-full"
                    disablePast
                    value={pickupDate}
                    onChange={handlePickupDateChange}
                    slotProps={{ textField: { placeholder: "Pickup Date" } }}
                    sx={{
                      ".MuiInputBase-root input": {
                        padding: "8px 9px",
                        cursor: "pointer",
                      },
                      ".MuiInputBase-root input::placeholder": {
                        color: "hsl( 0 0% 15%) !important",
                      },
                      ".MuiInputBase-root fieldset": {
                        border: "none !important",
                      },
                    }}
                  />
                </div>
                <div className="w-full border-b">
                  <MobileDateTimePicker
                    className="w-full"
                    value={dropOffDate}
                    disablePast
                    onChange={handleDropOffDateChange}
                    slotProps={{ textField: { placeholder: "Dropoff Date" } }}
                    sx={{
                      ".MuiInputBase-root input": {
                        padding: "8px 9px",
                        cursor: "pointer",
                      },
                      ".MuiInputBase-root input::placeholder": {
                        color: "hsl( 0 0% 15%) !important",
                      },
                      ".MuiInputBase-root fieldset": {
                        border: "none !important",
                      },
                    }}
                  />
                </div>
              </LocalizationProvider>
            </div>
            <button
              type="submit"
              className="w-fit mt-4 flex items-center justify-center bg-primary hover:bg-secondary text-white px-10 py-2 transition"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            <h1
              className={`hidden tablet:block absolute ${
                watchShowReturnLocation
                  ? "bottom-[175px] laptop:bottom-[150px]"
                  : "bottom-[140px] laptop:bottom-[110px]"
              }  laptop:bottom-0 -right-2 laptop:-right-9 font-bold text-[72px] laptop:text-[110px] text-gray-100 -z-10`}
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
