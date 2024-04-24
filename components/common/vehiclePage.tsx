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
import React from "react";
import VehicleGallery from "../other/vehicleGallery";

export default function VehiclePage() {
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
              <TabsTrigger className="" value="options">
                Extra options
              </TabsTrigger>
              <TabsTrigger className="" value="terms">
                Rental Terms
              </TabsTrigger>
              <TabsTrigger className="" value="specs">
                All specifications
              </TabsTrigger>
              <TabsTrigger className="" value="gallery">
                Image Gallery
              </TabsTrigger>
            </TabsList>
            <TabsContent value="options">
              <div className="grid laptop:grid-cols-2 desktop:grid-cols-4 border-borderGray border-y border-x w-full">
                <div className="flex gap-2 items-center pl-4 border-b desktop:border-b-0 laptop:border-r">
                  <div className="w-10 laptop:w-fit">
                    <ChildSeatIcon />
                  </div>
                  <div className="p-2 flex justify-between gap-8 items-center w-full">
                    <div className="flex flex-col text-grayFont">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        CHILD SEAT <InfoIcon className="text-primary" />
                      </p>
                      <p className="text-sm text-graySecondary">$24.00/Daily</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer text-center">
                        +
                      </div>
                      <p className="font-bold">1</p>
                      <div className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer relative">
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
                  <div className="p-2 flex justify-between gap-8 items-center w-full">
                    <div className="flex flex-col text-grayFont">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        NAVIGATION <InfoIcon className="text-primary" />
                      </p>
                      <p className="text-sm text-graySecondary">$15.50/Daily</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer text-center">
                        +
                      </div>
                      <p className="font-bold">1</p>
                      <div className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer relative">
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
                  <div className="p-2 flex justify-between gap-8 items-center w-full">
                    <div className="flex flex-col text-grayFont">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        ADITIONAL DRIVER <InfoIcon className="text-primary" />
                      </p>
                      <p className="text-sm text-graySecondary">$40.00/Daily</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer text-center">
                        +
                      </div>
                      <p className="font-bold">1</p>
                      <div className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer relative">
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
                  <div className="p-2 flex justify-between gap-8 items-center w-full">
                    <div className="flex flex-col text-grayFont">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        DAMAGE INSURANCE <InfoIcon className="text-primary" />
                      </p>
                      <p className="text-sm text-graySecondary">$16.60/Daily</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer text-center">
                        +
                      </div>
                      <p className="font-bold">1</p>
                      <div className="border-gray-400 border rounded-md text-sm px-1 w-5 cursor-pointer relative">
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
              <div className="grid mobile:grid-cols-2 desktop:grid-cols-3 gap-4">
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <FuelIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">FUEL TYPE</span>
                    <p className="font-medium text-sm">Gasoline</p>
                  </div>
                </div>
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <TransmissionIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">GEAR TYPE</span>
                    <p className="font-medium text-sm">Automatic</p>
                  </div>
                </div>
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <SeatIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">PASSENGER CAPACITY</span>
                    <p className="font-medium text-sm">5 Person</p>
                  </div>
                </div>
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <KeyIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">MODEL YEAR</span>
                    <p className="font-medium text-sm">2018</p>
                  </div>
                </div>
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <EngineIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">ENGINE TYPE</span>
                    <p className="font-medium text-sm">3.0 L V6 TFSI</p>
                  </div>
                </div>
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <ConsumptionIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">FUEL CONSUMPTION</span>
                    <p className="font-medium text-sm">4,5 lt / 100 km</p>
                  </div>
                </div>
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <VehicleIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">VEHICLE TYPE</span>
                    <p className="font-medium text-sm">Sportback</p>
                  </div>
                </div>
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <LuggageIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">LUGGAGE CAPACITY</span>
                    <p className="font-medium text-sm">345 lt</p>
                  </div>
                </div>
                <div className="flex gap-4 border-y border-borderGray py-6">
                  <div className="w-9">
                    <HorsepowerIcon className="text-graySecondary" />
                  </div>
                  <div className="flex justify-between text-grayFont w-full items-center">
                    <span className="text-[9px] font-bold">HP (HORSE POWER)</span>
                    <p className="font-medium text-sm">245 hp</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="gallery">
              <VehicleGallery/>
            </TabsContent>
          </Tabs>
        </div>
        <div className="sticky top-32 right-8 flex flex-col gap-4 w-full tablet:w-1/4 h-full p-4 bg-white">
          <div className="">Price:345$</div>
          <div>Additional options:</div>
        </div>
      </div>
    </div>
  );
}