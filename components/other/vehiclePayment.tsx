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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChildSeatIcon,
  DriverIcon,
  InsuranceIcon,
  NavigationIcon,
} from "@/assets/svgs";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { VehiclePrices } from "@/lib/types";
import { useCounter } from "../hooks/useCounter";
import { useFetchedVehicle } from "../hooks/useFetchedVehicle";
import dayjs from "dayjs";
import BirthdaySelector from "../account/birthdaySelector";
import BookingMobile from "../common/bookingMobile";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";
import BookingPrice from "../common/bookingPrice";
import { ChevronDown } from "lucide-react";

export default function VehiclePayment() {
  const t = useTranslations("Account");
  const u = useTranslations("VehicleDetails");

  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) {
      document.body.style.setProperty("overflow-y", "auto", "important");
    } else {
      document.body.style.removeProperty("overflow-y");
    }
  }, [shown]);

  function onSelectClicked() {
    setShown(!shown);
  }

  const keys = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ] as const;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, index) => currentYear + index);

  const params = useCustomSearchParams();
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
              <div className="flex gap-8 my-8">
                <div className="flex gap-2">
                  <input type="radio" id="card" name="radio" />
                  <label className="text-grayFont text-sm" htmlFor="card">
                    Credit Card
                  </label>
                </div>
                <div className="flex gap-2">
                  <input type="radio" id="bankTransfer" name="radio" />
                  <label
                    className="text-grayFont text-sm"
                    htmlFor="bankTransfer"
                  >
                    Direct Bank Transfer
                  </label>
                </div>
                <div className="flex gap-2">
                  <input type="radio" id="paypal" name="radio" />
                  <label className="text-grayFont text-sm" htmlFor="paypal">
                    Paypal
                  </label>
                </div>
              </div>
              <h1 className="text-grayFont font-bold">
                Credit Card Information
              </h1>
              <form>
                <div className="flex justify-between">
                  <div>
                    <label
                      className="text-grayFont text-sm"
                      htmlFor="cardOwner"
                    >
                      Card Owner
                    </label>
                    <input
                      type="text"
                      id="cardOwner"
                      name="cardOwner"
                      className="w-full text-grayFont rounded-sm px-3 py-2 focus-visible:outline-primary pr-8 border-gray border"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="text-grayFont text-sm"
                      htmlFor="cardNumber"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      maxLength={16}
                      id="cardNumber"
                      name="cardNumber"
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/\D/, "");
                      }}
                      className="w-full text-grayFont rounded-sm px-3 py-2 focus-visible:outline-primary pr-8 border-gray border"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <label className="text-grayFont text-sm">
                        Expiry Date
                      </label>
                      <div className="flex gap-2">
                        <Select onOpenChange={onSelectClicked}>
                          <SelectTrigger className="w-16 text-grayFont h-[42px] gap-3 rounded-sm px-3 py-2 focus-visible:outline-primary border-gray border">
                            <SelectValue className="px-2" />
                            <ChevronDown size={12} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Month</SelectLabel>
                              {keys.map((month) => (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Select onOpenChange={onSelectClicked}>
                          <SelectTrigger className="w-20 text-grayFont h-[42px] gap-3 rounded-sm px-3 py-2 focus-visible:outline-primary border-gray border">
                            <SelectValue className="px-2" />
                            <ChevronDown size={12} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Year</SelectLabel>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-grayFont text-sm" htmlFor="cvv">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        id="cvv"
                        name="cvv"
                        className="w-24 text-grayFont rounded-sm px-3 py-2 focus-visible:outline-primary pr-8 border-gray border"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between mt-12">
                  <div className="flex items-center mt-4">
                    <input type="checkbox" id="terms" name="terms" className="cursor-pointer" required />
                    <label
                      htmlFor="terms"
                      className="text-sm text-grayFont ml-2 cursor-pointer"
                    >
                      I have read and agree to the Terms and Conditions
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-secondary transition text-white py-3 px-16 w-fit"
                  >
                    Pay
                  </button>
                </div>
              </form>
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
  );
}
