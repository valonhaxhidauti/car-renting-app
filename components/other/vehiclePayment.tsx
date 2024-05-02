"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import BookingInfo from "../common/bookingInfo";
import { NavigationIcon } from "@/assets/svgs";
import BirthdaySelector from "../account/birthdaySelector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

export default function VehiclePayment() {
  const t = useTranslations("Account");
  const u = useTranslations("VehicleDetails");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="bg-bgSecondary w-full h-full mb-8">
      <div className="max-w-[1440px] pt-8 pb-16 m-auto w-full">
        <div className="mx-4 mobile:mx-8 flex flex-col laptop:flex-row gap-4">
          <div className="flex flex-col w-full laptop:w-3/4 gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-4 bg-white p-6">
                <h1 className="text-3xl text-grayFont font-bold">
                  Personal Information
                </h1>
                <form className="w-full grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-12 items-end">
                  <div className="relative">
                    <label className="block text-sm font-medium leading-6 text-grayFont">
                      {t("register.nameLabel")}
                    </label>
                    <input
                      type="text"
                      className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-grayFont">
                      {t("register.surnameLabel")}
                    </label>
                    <input
                      type="text"
                      className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-grayFont">
                      {t("register.emailAddressLabel")}
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        className="block w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-grayFont">
                      {t("register.phoneNumberLabel")}
                    </label>
                    <div className="mt-2">
                      <PhoneInput
                        country={"de"}
                        buttonStyle={{
                          border: "none",
                          background: "white",
                          margin: "2px",
                        }}
                        dropdownStyle={{
                          border: "none",
                          marginTop: "4px",
                          maxWidth: "272px",
                        }}
                        inputProps={{
                          required: true,
                          className:
                            "block w-full border-borderForm border rounded-sm pr-8 pl-12 py-4 text-grayFont focus-visible:outline-primary",
                        }}
                      />
                    </div>
                  </div>
                  <BirthdaySelector />
                  <div className="relative">
                    <label className="block text-sm font-medium leading-6 text-grayFont">
                      {t("register.passwordLabel")}
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      onChange={handlePasswordChange}
                      className="block w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-28"
                    />
                    {password && (
                      <div className="flex gap-2 items-center absolute right-4 bottom-[20px]">
                        <p
                          className="text-primary text-sm cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {t("viewPassword")}
                        </p>
                        {/* <CheckIcon /> */}
                      </div>
                    )}
                  </div>
                  <div className="hidden laptop:block"></div>
                  <div className="hidden laptop:block"></div>
                  <div className="laptop:justify-self-end">
                    <button
                      type="submit"
                      className="flex w-full mobile:w-44 justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary transition focus-visible:outline-primary"
                    >
                      {t("update")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full bg-white p-6">
              <h1 className="text-3xl text-grayFont font-bold">
                Discount Code
              </h1>
              <p className="text-grayFont text-sm">
                Pay less by entering a discount code!
              </p>
                <form className="flex flex-col mobile:flex-row justify-between gap-4">
                  <input
                    type="text"
                    placeholder="Please enter the discount code"
                    className="border border-zinc-300 p-3 w-full mobile:w-2/3 rounded-sm leading-none"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-secondary transition text-white py-3 w-full mobile:w-44"
                  >
                    Check Code
                  </button>
                </form>
            </div>
          </div>
          <div className="flex flex-col gap-2 laptop:w-1/4 ">
            <BookingInfo border={true} />
            <div className="text-grayFont sticky top-32 right-8 flex flex-col w-full p-4 bg-white">
              <div className="flex flex-col border-b border-borderGray pb-3">
                <p className="text-xl font-bold">{u("pageTitle")}</p>
                <p className="font-medium">Volvo XC90 Excellence</p>
              </div>
              <div className="flex justify-between text-sm border-b border-borderGray py-3">
                <p className="font-bold">{u("vehicleValue")}</p>
                <p className="font-bold text-primary">${(2 * 2).toFixed(2)}</p>
              </div>
              {3 > 0 && (
                <div className="flex flex-col border-b border-borderGray py-3 gap-2">
                  <div className="flex justify-between text-sm">
                    <p className="font-bold">{u("optionalItems")}</p>
                    <p className="font-bold text-primary">${3}</p>
                  </div>

                  <div key={2} className="flex justify-between text-xs">
                    <div className="w-14 flex justify-center">
                      <NavigationIcon />
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="font-light text-sm">Navigation</p>
                      <p className="font-light text-sm text-primary">$24.00</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="py-3">
                <div className="flex justify-between items-center pb-2">
                  <p className="font-light text-sm">{u("pricePer")}</p>
                  <p className="text-xs text-white px-2 py-0.5 bg-primary rounded-sm">
                    1 {u("day").toUpperCase()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">{u("totalValue")}</p>
                  <p className="font-bold text-primary">$123.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
