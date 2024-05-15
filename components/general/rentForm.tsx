"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { EditBookingIcon, SearchIcon } from "@/assets/svgs";
import { usePathname, useRouter } from "next/navigation";
import { FormControl, FormHelperText } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/en-gb";

interface IFormInputs {
  rentLocation: string;
  showReturnLocation: boolean;
  returnLocation: string;
  pickupDate: string;
  dropOffDate: string;
}

export default function RentForm({
  modal,
  id,
}: {
  modal: boolean;
  id?: string;
}) {
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

  const isHomePage = usePathname() === ("/en" || "/de");

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
        // replace alert
        alert("Drop off date should be at least 1 hour after pickup date.");
        return;
      }
    }

    if (!pickupDate || !dropOffDate) {
      alert("Please fill in the dates.");
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);

    queryParams.set("rentLocation", rentLocation);
    queryParams.set("pickupDate", pickupDate.format("DD/MM/YYYY HH:mm"));
    queryParams.set("dropOffDate", dropOffDate.format("DD/MM/YYYY HH:mm"));

    if (showReturnLocation) {
      queryParams.set("returnLocation", returnLocation);
    } else {
      queryParams.set("returnLocation",rentLocation);
    }

    const queryString = queryParams.toString();

    if (isHomePage) {
      router.push(`/explore?${queryString}`);
    } else {
      router.push(`?${queryString}`);
    }

    if (showModal && Object.keys(errors).length === 0) {
      setShowModal(false);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return modal ? (
    <>
      <EditBookingIcon
        className="w-6 h-6 cursor-pointer"
        onClick={toggleModal}
      />
      <div
        className={`fixed top-0 right-0 left-0 bottom-0  z-10 w-full fill-mode-forwards rounded	${
          showModal ? "animate-show-overlay" : "hidden"
        }`}
        onClick={toggleModal}
      ></div>
      <div
        className={`fixed z-50 max-w-lg bg-white w-[90vw] top-1/2 right-1/2 p-8 translate-x-1/2 -translate-y-1/2 rounded-xl ${
          showModal ? "block" : "hidden"
        }`}
      >
        <div className="w-full text-xl text-center">{t("search")}</div>
        <div className="absolute top-4 right-4 rounded-full p-2 flex hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer">
          <X onClick={toggleModal} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full desktop:rounded-none">
            <div className="flex flex-col w-full gap-2">
              <div
                className={`flex flex-col ${
                  watchShowReturnLocation ? "gap-2" : "gap-0"
                }`}
              >
                <input
                  type="text"
                  {...register("rentLocation", { required: true })}
                  placeholder={
                    errors.rentLocation
                      ? t("rentLocation.requiredError")
                      : t("rentLocation.placeholder")
                  }
                  className={`w-full text-base p-2 border-b font-light ${
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
                      ? "h-full w-full p-2 text-base border-b font-light"
                      : "w-0 h-0"
                  } ${errors.returnLocation ? "placeholder:text-red-500" : ""}`}
                />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={t("locale")}
                >
                  <div className="w-full border-b">
                    <FormControl fullWidth error={!errors.pickupDate}>
                      <MobileDateTimePicker
                        className="w-full"
                        disablePast
                        value={pickupDate}
                        onChange={handlePickupDateChange}
                        slotProps={{
                          textField: { placeholder: t("pickupDate") },
                        }}
                        sx={{
                          ".MuiInputBase-root input": {
                            padding: "8px",
                            fontWeight: "300",
                            cursor: "pointer",
                          },
                          ".MuiInputBase-root fieldset": {
                            border: "none !important",
                          },
                        }}
                      />
                      {errors.pickupDate && (
                        <FormHelperText>error</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="w-full border-b">
                    <MobileDateTimePicker
                      className="w-full"
                      value={dropOffDate}
                      disablePast
                      onChange={handleDropOffDateChange}
                      slotProps={{
                        textField: { placeholder: t("dropOffDate") },
                      }}
                      sx={{
                        ".MuiInputBase-root input": {
                          padding: "8px",
                          fontWeight: "300",
                          cursor: "pointer",
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
                className="w-24 flex items-center justify-center bg-primary hover:bg-secondary text-white px-4 py-2 transition"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-4">
            <input
              id={id}
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              {...register("showReturnLocation")}
            />
            <label
              htmlFor={id}
              className="text-sm font-medium text-grayFont leading-none cursor-pointer"
            >
              {t("deliverAtDifferentPoint")}
            </label>
          </div>
        </form>
      </div>
    </>
  ) : (
    <div className="w-full tablet:w-1/2 h-screen relative p-4 mobile:p-8 bigDesktop:pr-0 flex flex-col justify-center">
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
                    slotProps={{ textField: { placeholder: t("pickupDate") } }}
                    sx={{
                      ".MuiInputBase-root input": {
                        padding: "8px",
                        fontWeight: "300",
                        cursor: "pointer",
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
                    slotProps={{ textField: { placeholder: t("dropOffDate") } }}
                    sx={{
                      ".MuiInputBase-root input": {
                        padding: "8px",
                        fontWeight: "300",
                        cursor: "pointer",
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
              aria-label="Search"
              className="w-fit mt-4 flex items-center justify-center bg-primary hover:bg-secondary text-white px-10 py-2 transition"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            <h1 className="hidden tablet:block absolute -top-16 laptop:-top-24 -right-2 laptop:-right-9 font-bold text-[54px] laptop:text-[84px] text-gray-100 -z-10">
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
