"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import { useTranslations } from "next-intl";
import BookingInfo from "../common/bookingInfo";
import {
  ChildSeatIcon,
  DriverIcon,
  InsuranceIcon,
  NavigationIcon,
} from "@/assets/svgs";
import BirthdaySelector from "../account/birthdaySelector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";
import { Link } from "next-view-transitions";
import BookingMobile from "../common/bookingMobile";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { VehiclePrices } from "@/lib/types";
import dayjs from "dayjs";
import { useCounter } from "../hooks/useCounter";
import Image from "next/image";

const prices: VehiclePrices = {
  vehicle: 120.0,
  childSeat: 24.0,
  navigation: 15.5,
  driver: 40.0,
  insurance: 16.6,
};

export default function VehiclePayment() {
  const t = useTranslations("Account");
  const u = useTranslations("VehicleDetails");

  const params = useCustomSearchParams();
  const pickupDate = dayjs(params.pickupDate, "DD/MM/YYYY");
  const dropOffDate = dayjs(params.dropOffDate, "DD/MM/YYYY");
  const daysDifference =
    dropOffDate.isValid() && pickupDate.isValid()
      ? dropOffDate.diff(pickupDate, "day") + 1
      : 1;

  const [childSeat, incChildSeat, decChildSeat] = useCounter(0, 3);
  const [navigation, incNavigation, decNavigation] = useCounter(0, 1);
  const [driver, incDriver, decDriver] = useCounter(0, 1);
  const [insurance, incInsurance, decInsurance] = useCounter(0, 1);

  const optionalItems = [
    {
      name: u("childSeat"),
      quantity: childSeat,
      price: prices.childSeat,
      icon: <ChildSeatIcon />,
    },
    {
      name: u("navigation"),
      quantity: navigation,
      price: prices.navigation,
      icon: <NavigationIcon />,
    },
    {
      name: u("additionalDriver"),
      quantity: driver,
      price: prices.driver,
      icon: <DriverIcon />,
    },
    {
      name: u("damageInsurance"),
      quantity: insurance,
      price: prices.insurance,
      icon: <InsuranceIcon />,
    },
  ];

  const optionalItemsTotal = optionalItems.reduce(
    (total, item) => total + item.quantity * item.price * daysDifference,
    0
  );

  function getDecimalPart(number: number) {
    var decimalPart = (number % 1).toFixed(2);
    return decimalPart.substring(2);
  }

  const totalPrice = prices.vehicle * daysDifference + optionalItemsTotal;

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
      <div className="w-full bg-white ">
        <div className="max-w-[1440px] m-auto flex justify-between px-4 mobile:px-8 bigDesktop:px-0 py-8">
          <div className="text-primary font-bold text-4xl w-full items-center flex cursor-default">
            {u("pageTitle")}
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] pb-16 m-auto w-full">
        <Breadcrumb className="w-full px-4 mobile:px-8 bigDesktop:px-0 py-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{u("homepage")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/explore/1/?rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}`}
                >
                  {u("vehicleDetails")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{u("payment")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="bg-white flex mb-4 mx-0 mobile:mx-8 p-4 laptop:hidden">
          <BookingMobile />
        </div>
        <div className="mx-0 mobile:mx-8 bigDesktop:mx-0 flex flex-col laptop:flex-row gap-4">
          <div className="flex flex-col w-full laptop:w-3/4 desktop:w-4/5 gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-4 bg-white p-4">
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
            <div className="flex flex-col gap-4 w-full bg-white p-4">
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
            <div className="flex flex-col gap-4 w-full bg-white p-4">
              <h1 className="text-3xl text-grayFont font-bold">
                Payment methods
              </h1>
              <h1 className="text-xl text-grayFont font-bold">
                Credit Card Information
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 laptop:w-1/4 desktop:w-1/5">
            <div className="hidden laptop:block">
              <BookingInfo border={true} />
            </div>
            <div className="text-grayFont sticky top-32 right-8 flex flex-col w-full p-4 bg-white">
              <Image
                src="/sampleCar.png"
                alt="vehicle"
                width="300"
                height="150"
                className="py-12 self-center"
                priority
              />
              <div className="flex flex-col border-b border-borderGray pb-3">
                <p className="text-xl font-bold">{u("pageTitle")}</p>
                <p className="font-medium">Volvo XC90 Excellence</p>
              </div>
              <div className="flex justify-between text-sm border-b border-borderGray py-3">
                <p className="font-bold">{u("vehicleValue")}</p>
                <p className="font-bold text-primary">
                  ${(prices.vehicle * daysDifference).toFixed(2)}
                </p>
              </div>
              {optionalItemsTotal > 0 && (
                <div className="flex flex-col border-b border-borderGray py-3 gap-2">
                  <div className="flex justify-between text-sm">
                    <p className="font-bold">{u("optionalItems")}</p>
                    <p className="font-bold text-primary">
                      ${optionalItemsTotal.toFixed(2)}
                    </p>
                  </div>
                  {optionalItems.map(
                    (item) =>
                      item.quantity > 0 && (
                        <div
                          key={item.name}
                          className="flex justify-between text-xs"
                        >
                          <div className="w-14 flex justify-center">
                            {item.icon}
                          </div>
                          <div className="flex justify-between w-full">
                            <p className="font-light text-sm">{item.name}</p>
                            <p className="font-light text-sm text-primary">
                              $
                              {(
                                item.quantity *
                                item.price *
                                daysDifference
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
              <div className="py-3 border-b border-borderGray">
                <div className="flex justify-between items-center pb-2">
                  <p className="font-light text-sm">{u("pricePer")}</p>
                  <p className="text-xs text-white px-2 py-0.5 bg-primary rounded-sm">
                    {daysDifference} &nbsp;
                    {daysDifference === 1
                      ? u("day").toUpperCase()
                      : u("days").toUpperCase()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">{u("totalValue")}</p>
                  <p className="font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-2 border-primary border">
                <div className="py-10 flex flex-col items-center">
                  <p className="text-primary font-medium">Total Price</p>
                  <div className="text-3xl text-primary">
                    <sup className="text-xl font-bold -top-0.5">$</sup>
                    <span className="text-5xl font-bold">
                      {Math.floor(totalPrice)}
                    </span>
                    <span className="inline-block text-2xl">
                      <sub className="relative block leading-none font-bold bottom-5">
                        ,{getDecimalPart(totalPrice)}
                      </sub>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
