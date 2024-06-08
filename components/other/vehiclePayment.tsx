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
import {
  ChildSeatIcon,
  DriverIcon,
  InsuranceIcon,
  NavigationIcon,
} from "@/assets/svgs";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { VehiclePrices } from "@/lib/types";
import { useCounter } from "../hooks/useCounter";
import { useFetchedVehicle } from "../hooks/useFetchedVehicle";
import { HeadingTitle } from "../common/headingParts";
import dayjs from "dayjs";
import BirthdaySelector from "../account/birthdaySelector";
import BookingMobile from "../common/bookingMobile";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";
import BookingPrice from "../common/bookingPrice";
import CreditCarrdPayment from "./creditCardPayment";
import CashPayment from "./cashPayment";
import DiscountPayment from "./discountPayment";

export default function VehiclePayment() {
  const t = useTranslations("Account");
  const u = useTranslations("VehicleDetails");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { params } = useCustomSearchParams();
  const vehicleId = params.vehicleId;
  const pickupDate = dayjs(params.pickupDate, "DD/MM/YYYY");
  const dropOffDate = dayjs(params.dropOffDate, "DD/MM/YYYY");
  const daysDifference =
    dropOffDate.isValid() && pickupDate.isValid()
      ? dropOffDate.diff(pickupDate, "day") + 1
      : 1;

  const vehicle = useFetchedVehicle(vehicleId);
  const prices: VehiclePrices = {
    vehicle: vehicle.attributes?.base_price_in_cents || 0.0,
    childSeat: 24.0,
    navigation: 15.5,
    driver: 40.0,
    insurance: 16.6,
  };

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

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <>
      <HeadingTitle title={u("pageTitle")} />
      <div className="bg-bgSecondary w-full h-full mb-8">
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
                    href={`/explore/vehicle?vehicleId=${params.vehicleId}&rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}`}
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
                        className="flex w-full mobile:w-40 justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary transition focus-visible:outline-primary"
                      >
                        {t("update")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <DiscountPayment />
              <div className="flex flex-col gap-4 w-full bg-white p-4">
                <h1 className="text-3xl text-grayFont font-bold">
                  Payment methods
                </h1>
                <div className="flex gap-8 my-8">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      onChange={handlePaymentMethodChange}
                      checked={paymentMethod === "cash"}
                    />
                    <label className="text-grayFont text-sm" htmlFor="cash">
                      Pay in Cash
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      onChange={handlePaymentMethodChange}
                      checked={paymentMethod === "card"}
                    />
                    <label className="text-grayFont text-sm" htmlFor="card">
                      Credit Card
                    </label>
                  </div>
                </div>
                {paymentMethod === "card" && <CreditCarrdPayment />}
                {paymentMethod === "cash" && <CashPayment />}
              </div>
            </div>
            <BookingPrice
              {...{
                prices,
                vehicle,
                daysDifference,
                optionalItems,
                optionalItemsTotal,
                totalPrice,
                params,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
