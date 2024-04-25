"use client";

import {
  ChildSeatIcon,
  ConsumptionIcon,
  DriverIcon,
  EngineIcon,
  FuelIcon,
  HorsepowerIcon,
  InfoIcon,
  InsuranceIcon,
  KeyIcon,
  LuggageIcon,
  NavigationIcon,
  SeatIcon,
  TransmissionIcon,
  VehicleIcon,
} from "@/assets/svgs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useCounter } from "../hooks/useCounter";
import VehicleGallery from "../other/vehicleGallery";
import { useTranslations } from "next-intl";
import VehicleSpecs from "../other/vehicleSpecs";

type VehiclePrices = {
  vehicle: number;
  childSeat: number;
  navigation: number;
  driver: number;
  insurance: number;
};

const prices: VehiclePrices = {
  vehicle: 120.0,
  childSeat: 24.0,
  navigation: 15.5,
  driver: 40.0,
  insurance: 16.6,
};

export default function VehiclePage() {
  const t = useTranslations("VehiclePage");

  const [childSeat, incChildSeat, decChildSeat] = useCounter(0);
  const [navigation, incNavigation, decNavigation] = useCounter(0);
  const [driver, incDriver, decDriver] = useCounter(0);
  const [insurance, incInsurance, decInsurance] = useCounter(0);

  const optionalItems = [
    { name: t("childSeat"), quantity: childSeat, price: prices.childSeat },
    { name: t("navigation"), quantity: navigation, price: prices.navigation },
    { name: t("additionalDriver"), quantity: driver, price: prices.driver },
    {
      name: t("damageInsurance"),
      quantity: insurance,
      price: prices.insurance,
    },
  ];

  const optionalItemsTotal = optionalItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const totalPrice = prices.vehicle + optionalItemsTotal;
  return (
    <div className="bg-bgSecondary w-full h-full px-4 mobile:px-8 py-8 ">
      <div className="flex flex-col tablet:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full tablet:w-3/4">
          <div className=" bg-white flex flex-col gap-4">
            <div className="p-2 flex flex-col mobile:flex-row mobile:gap-8 w-full">
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
                      Volvo XC90 Excellence
                    </p>
                    <p className="text-graySecondary font-medium text-xs">
                      SUV
                    </p>
                  </div>
                  <div>
                    <div className="flex w-full">
                      <div className="flex flex-wrap items-center py-2 gap-4">
                        <div className="flex gap-2 justify-between w-fit mobile:w-3/4 self-center items-center">
                          <FuelIcon className="text-graySecondary" />
                          <p className="text-xs text-grayFont mobile:text-sm">
                            Diesel
                          </p>
                        </div>
                        <div className="flex gap-2 justify-between w-fit mobile:w-3/4 self-center items-center">
                          <TransmissionIcon className="text-graySecondary" />
                          <p className="text-xs text-grayFont mobile:text-sm">
                            Automatic
                          </p>
                        </div>
                        <div className="flex gap-2 justify-between w-fit mobile:w-3/4 self-center items-center">
                          <ConsumptionIcon className="text-graySecondary" />
                          <p className="text-xs text-grayFont mobile:text-sm">
                            6,5 lt
                          </p>
                        </div>
                        <div className="flex gap-2 justify-between w-fit mobile:w-3/4 self-center items-center">
                          <LuggageIcon className="text-graySecondary" />
                          <p className="text-xs text-grayFont mobile:text-sm">
                            615 lt
                          </p>
                        </div>
                        <div className="flex gap-2 justify-between w-fit mobile:w-3/4 self-center items-center">
                          <SeatIcon className="text-graySecondary" />
                          <p className="text-xs text-grayFont mobile:text-sm">
                            5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tabs defaultValue="options" className="p-2 bg-white">
            <TabsList className="gap-6 overflow-auto">
              <TabsTrigger value="options">{t("extraOptionsTab")}</TabsTrigger>
              <TabsTrigger value="terms">{t("rentalTermsTab")}</TabsTrigger>
              <TabsTrigger value="specs">
                {t("allSpecificationsTab")}
              </TabsTrigger>
              <TabsTrigger value="gallery">{t("imageGalleryTab")}</TabsTrigger>
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
                        className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer text-center"
                      >
                        +
                      </div>
                      <p className="font-bold">{childSeat}</p>
                      <div
                        onClick={decChildSeat}
                        className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer relative"
                      >
                        &nbsp;
                        <span className="absolute -top-1.5 left-1.5">_</span>
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
                        className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer text-center"
                      >
                        +
                      </div>
                      <p className="font-bold">{navigation}</p>
                      <div
                        onClick={decNavigation}
                        className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer relative"
                      >
                        &nbsp;
                        <span className="absolute -top-1.5 left-1.5">_</span>
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
                        className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer text-center"
                      >
                        +
                      </div>
                      <p className="font-bold">{driver}</p>
                      <div
                        onClick={decDriver}
                        className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer relative"
                      >
                        &nbsp;
                        <span className="absolute -top-1.5 left-1.5">_</span>
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
                        className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer text-center"
                      >
                        +
                      </div>
                      <p className="font-bold">{insurance}</p>
                      <div
                        onClick={decInsurance}
                        className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer relative"
                      >
                        &nbsp;
                        <span className="absolute -top-1.5 left-1.5">_</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="terms" className="text-grayFont">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p className="text-sm mt-2">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
              <p className="text-sm mt-2">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </p>
              <p className="text-sm mt-2">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
            </TabsContent>
            <TabsContent value="specs">
              <VehicleSpecs />
            </TabsContent>
            <TabsContent value="gallery">
              <VehicleGallery />
            </TabsContent>
          </Tabs>
        </div>
        <div className="text-grayFont sticky top-32 right-8 flex flex-col w-full tablet:w-1/4 h-full p-4 bg-white">
          <div className="flex flex-col border-b border-borderGray pb-3">
            <p className="text-xl font-bold">{t("pageTitle")}</p>
            <p className="font-medium">Volvo XC90 Excellence</p>
          </div>
          <div className="flex justify-between text-sm border-b border-borderGray py-3">
            <p className="font-bold">{t("vehicleValue")}</p>
            <p className="font-bold text-primary">
              ${prices.vehicle.toFixed(2)}
            </p>
          </div>
          {optionalItemsTotal > 0 && (
            <div className="flex flex-col border-b border-borderGray py-3">
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
                      <p className="font-light text-sm">{item.name}</p>
                      <p className="font-light text-sm text-primary">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  )
              )}
            </div>
          )}
          <div className="py-3">
            <div className="flex justify-between items-center pb-2">
              <p className="font-light text-sm">{t("pricePer")}</p>
              <p className="text-xs text-white px-2 py-0.5 bg-primary rounded-sm">
                4 {t("days").toUpperCase()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">{t("totalValue")}</p>
              <p className="font-bold text-primary">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <button className="px-8 py-3 text-white hover:bg-secondary bg-primary transition-all">
            {t("continueButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
