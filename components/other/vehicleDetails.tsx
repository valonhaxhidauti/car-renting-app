"use client";

import {
  ChildSeatIcon,
  ConsumptionIcon,
  DriverIcon,
  FuelIcon,
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
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useFetchedVehicle } from "../hooks/useFetchedVehicle";
import { useTranslations } from "next-intl";
import { clearAppliedFilters } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { VehiclePrices } from "@/lib/types";
import Image from "next/image";
import VehicleGallery from "./vehicleGallery";
import VehicleSpecs from "./vehicleSpecs";
import BookingMobile from "../common/bookingMobile";
import dayjs from "dayjs";
import VehicleOptions from "./vehicleOptions";
import BookingPrice from "../common/bookingPrice";
import VehicleTerms from "./vehicleTerms";
import VehicleDetailsSkeleton from "../loader/vehicleDetailsSkeleton";

export default function VehicleDetails() {
  const t = useTranslations("VehicleDetails");

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
                  onClick={clearAppliedFilters}
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
                      alt={vehicle.attributes.name.split(" (")[0]}
                      width="300"
                      height="150"
                      className="py-12 self-center mobile:self-start"
                      priority
                    />
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-between pt-2 mb-2">
                          <p className="text-grayFont font-medium text-lg">
                            {vehicle.attributes.name.split(" (")[0]}
                          </p>
                          <p className="text-graySecondary font-medium text-xs">
                            {vehicle.relationships.carType.attributes.name}
                          </p>
                        </div>
                        <div className="flex w-full">
                          <div className="flex flex-wrap items-center py-2 gap-4">
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <FuelIcon className="w-10 text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                {vehicle.relationships.fuelType.attributes.name}
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <TransmissionIcon className="w-10 text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                {vehicle.relationships.gearType.attributes.name}
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <ConsumptionIcon className="w-10 text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                6,5 lt
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <LuggageIcon className="w-10 text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                615 lt
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <SeatIcon className="w-10 text-graySecondary" />
                              <p className="text-xs text-grayFont mobile:text-sm">
                                {vehicle.attributes.seat_capacity}
                              </p>
                            </div>
                            <div className="flex gap-2 justify-between w-fit mobile:w-4/5 self-center items-center">
                              <p className="text-sm font-medium text-grayFont mobile:text-base">
                                {t("vehiclePrice")}
                              </p>
                              <p className="text-sm font-bold text-primary mobile:text-base">
                                CHF {vehicle.attributes.base_price_in_cents},00
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
                    <VehicleOptions
                      {...{
                        prices,
                        childSeat,
                        incChildSeat,
                        decChildSeat,
                        navigation,
                        incNavigation,
                        decNavigation,
                        driver,
                        incDriver,
                        decDriver,
                        insurance,
                        incInsurance,
                        decInsurance,
                      }}
                    />
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
              <VehicleDetailsSkeleton />
            )}
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
