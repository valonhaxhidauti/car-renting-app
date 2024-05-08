"use client";

import {
  ChildSeatIcon,
  ConsumptionIcon,
  DriverIcon,
  FuelIcon,
  InfoIcon,
  InsuranceIcon,
  LuggageIcon,
  NavigationIcon,
  SeatIcon,
  TransmissionIcon,
} from "@/assets/svgs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCounter } from "../hooks/useCounter";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { VehiclePrices } from "@/lib/types";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useFetchedVehicle } from "../hooks/useFetchedVehicle";
import Image from "next/image";
import VehicleGallery from "./vehicleGallery";
import VehicleSpecs from "./vehicleSpecs";
import BookingInfo from "../common/bookingInfo";
import BookingMobile from "../common/bookingMobile";
import VehicleTerms from "./vehicleTerms";
import dayjs from "dayjs";

export default function VehicleDetails() {
  const t = useTranslations("VehicleDetails");

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
      name: t("childSeat"),
      quantity: childSeat,
      price: prices.childSeat,
      icon: <ChildSeatIcon />,
    },
    {
      name: t("navigation"),
      quantity: navigation,
      price: prices.navigation,
      icon: <NavigationIcon />,
    },
    {
      name: t("additionalDriver"),
      quantity: driver,
      price: prices.driver,
      icon: <DriverIcon />,
    },
    {
      name: t("damageInsurance"),
      quantity: insurance,
      price: prices.insurance,
      icon: <InsuranceIcon />,
    },
  ];

  const optionalItemsTotal = optionalItems.reduce(
    (total, item) => total + item.quantity * item.price * daysDifference,
    0
  );

  const totalPrice = prices.vehicle * daysDifference + optionalItemsTotal;
  return (
    <div className="bg-bgSecondary w-full h-full mb-8">
      <div className="w-full bg-white ">
        <div className="max-w-[1440px] m-auto flex justify-between px-4 mobile:px-8 bigDesktop:px-0 py-8">
          <div className="text-primary font-bold text-4xl w-full items-center flex cursor-default">
            {t("pageTitle")}
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] pb-16 m-auto w-full">
        <Breadcrumb className="w-full px-4 mobile:px-8 bigDesktop:px-0 py-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t("homepage")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/explore?rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}`}
                >
                  {t("explore")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("vehicleDetails")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="bg-white flex mb-4 mx-0 mobile:mx-8 p-4 laptop:hidden">
          <BookingMobile />
        </div>
        <div className="mx-0 mobile:mx-8 bigDesktop:mx-0 flex flex-col laptop:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full laptop:w-3/4 desktop:w-4/5">
            {vehicle && vehicle.attributes ? (
              <>
                <div className=" bg-white flex flex-col gap-4">
                  <div className="p-4 flex flex-col mobile:flex-row mobile:gap-8 w-full">
                    <Image
                      src="/sampleCar.png"
                      alt="vehicle"
                      width="300"
                      height="150"
                      className="py-12 self-center mobile:self-start"
                      priority
                    />
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-between pt-2 mb-2">
                          <p className="text-grayFont font-medium text-lg ">
                            {vehicle.attributes.name.split(" (")[0]}
                          </p>
                          <p className="text-graySecondary font-medium text-xs">
                            {vehicle.relationships.carType.attributes.name}
                          </p>
                        </div>
                        <div className="flex w-full">
                          <div className="flex flex-wrap items-center py-2 gap-4">
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <FuelIcon className="text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                {vehicle.relationships.fuelType.attributes.name}
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <TransmissionIcon className="text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                {vehicle.relationships.gearType.attributes.name}
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <ConsumptionIcon className="text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                6,5 lt
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <LuggageIcon className="text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                615 lt
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <SeatIcon className="text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                {vehicle.attributes.seat_capacity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Tabs defaultValue="options" className="p-4 bg-white">
                  <TabsList className="gap-6 overflow-auto">
                    <TabsTrigger value="options">
                      {t("extraOptionsTab").toUpperCase()}
                    </TabsTrigger>
                    <TabsTrigger value="terms">
                      {t("rentalTermsTab").toUpperCase()}
                    </TabsTrigger>
                    <TabsTrigger value="specs">
                      {t("allSpecificationsTab").toUpperCase()}
                    </TabsTrigger>
                    <TabsTrigger value="gallery">
                      {t("imageGalleryTab").toUpperCase()}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="options">
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
                              ${prices.childSeat.toFixed(2)}/{t("daily")}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <div
                              onClick={incChildSeat}
                              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center 
                          ${
                            childSeat === 3
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer hover:bg-slate-200"
                          }`}
                            >
                              +
                            </div>
                            <p className="font-bold text-grayFont">
                              {childSeat}
                            </p>
                            <div
                              onClick={decChildSeat}
                              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 relative 
                          ${
                            childSeat === 0
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer hover:bg-slate-200"
                          }`}
                            >
                              &nbsp;
                              <span className="absolute -top-1.5 left-1.5">
                                _
                              </span>
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
                              ${prices.navigation.toFixed(2)}/{t("daily")}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <div
                              onClick={incNavigation}
                              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center 
                          ${
                            navigation === 1
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer hover:bg-slate-200"
                          }`}
                            >
                              +
                            </div>
                            <p className="font-bold text-grayFont">
                              {navigation}
                            </p>
                            <div
                              onClick={decNavigation}
                              className={`text-grayFont border-gray-400 bg-white border rounded-md text-sm px-1 w-5 relative ${
                                navigation === 0
                                  ? "cursor-not-allowed text-gray-400"
                                  : "cursor-pointer hover:bg-slate-200"
                              } `}
                            >
                              &nbsp;
                              <span className="absolute -top-1.5 left-1.5">
                                _
                              </span>
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
                              ${prices.driver.toFixed(2)}/{t("daily")}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <div
                              onClick={incDriver}
                              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center
                          ${
                            driver === 1
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer hover:bg-slate-200"
                          }`}
                            >
                              +
                            </div>
                            <p className="font-bold text-grayFont">{driver}</p>
                            <div
                              onClick={decDriver}
                              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 relative *:${
                                driver === 0
                                  ? "cursor-not-allowed text-gray-400"
                                  : "cursor-pointer hover:bg-slate-200"
                              }`}
                            >
                              &nbsp;
                              <span className="absolute -top-1.5 left-1.5">
                                _
                              </span>
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
                              ${prices.insurance.toFixed(2)}/{t("daily")}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <div
                              onClick={incInsurance}
                              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 text-center 
                          ${
                            insurance === 1
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer hover:bg-slate-200"
                          }`}
                            >
                              +
                            </div>
                            <p className="font-bold text-grayFont">
                              {insurance}
                            </p>
                            <div
                              onClick={decInsurance}
                              className={`text-grayFont border-gray-400 border rounded-md text-sm px-1 w-5 relative 
                          ${
                            insurance === 0
                              ? "cursor-not-allowed text-gray-400"
                              : "cursor-pointer hover:bg-slate-200"
                          }`}
                            >
                              &nbsp;
                              <span className="absolute -top-1.5 left-1.5">
                                _
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="terms"
                    className="text-grayFont px-8 pb-8"
                  >
                    <VehicleTerms />
                  </TabsContent>
                  <TabsContent value="specs" className="px-8 pb-8">
                    <VehicleSpecs
                      translations={t}
                      allSpecifications={vehicle}
                    />
                  </TabsContent>
                  <TabsContent value="gallery">
                    <VehicleGallery />
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div>loading</div>
            )}
          </div>
          <div className="flex flex-col gap-4 laptop:w-1/4 desktop:w-1/5">
            <div className="hidden laptop:block">
              <BookingInfo border={true} />
            </div>
            <div className="text-grayFont sticky top-32 right-8 flex flex-col w-full p-4 bg-white">
              <div className="flex flex-col border-b border-borderGray pb-3">
                <p className="text-xl font-bold">{t("pageTitle")}</p>
                <p className="font-medium">Volvo XC90 Excellence</p>
              </div>
              <div className="flex justify-between text-sm border-b border-borderGray py-3">
                <p className="font-bold">{t("vehicleValue")}</p>
                <p className="font-bold text-primary">
                  ${(prices.vehicle * daysDifference).toFixed(2)}
                </p>
              </div>
              {optionalItemsTotal > 0 && (
                <div className="flex flex-col border-b border-borderGray py-3 gap-2">
                  <div className="flex justify-between text-sm">
                    <p className="font-bold">{t("optionalItems")}</p>
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
              <div className="py-3">
                <div className="flex justify-between items-center pb-2">
                  <p className="font-light text-sm">{t("pricePer")}</p>
                  <p className="text-xs text-white px-2 py-0.5 bg-primary rounded-sm">
                    {daysDifference} &nbsp;
                    {daysDifference === 1
                      ? t("day").toUpperCase()
                      : t("days").toUpperCase()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">{t("totalValue")}</p>
                  <p className="font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <Link
                href={`/explore/vehicle/payment?vehicleId=${params.vehicleId}&rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}`}
                className="px-8 py-3 text-white hover:bg-secondary bg-primary transition-all text-center"
              >
                {t("continueButton")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
