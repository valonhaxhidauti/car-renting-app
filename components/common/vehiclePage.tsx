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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

export default function VehiclePage() {
  return (
    <div className="bg-bgSecondary w-full h-full px-4 mobile:px-8 py-8 ">
      <div className="flex gap-4 ">
        <div className="flex flex-col gap-4 w-3/4 ">
          <div className=" bg-white flex flex-col gap-4">
            <div className="p-2 flex gap-8 w-full">
              <Image
                src="/sampleCar.png"
                alt="vehicle"
                width="300"
                height="150"
                className="py-12"
                priority
              />
              <div className="flex justify-between gap-2">
                <div className="flex flex-col">
                  <div className="flex justify-between pt-2">
                    <div className="flex flex-col">
                      <p className="text-grayFont font-medium text-2xl">
                        Volvo XC90 Excellence
                      </p>
                      <p className="text-graySecondary font-medium text-xs">
                        SUV
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex w-full">
                      <div className="flex py-2 gap-4">
                        <div className="text-grayFont flex gap-2 items-center">
                          <FuelIcon />
                          <p className="text-sm ">Diesel</p>
                        </div>
                        <div className="text-grayFont flex gap-2 items-center">
                          <TransmissionIcon />
                          <p className="text-sm ">Automatic</p>
                        </div>
                        <div className="text-grayFont flex gap-2 items-center">
                          <ConsumptionIcon />
                          <p className="text-sm ">6,5 lt</p>
                        </div>
                        <div className="text-grayFont flex gap-2 items-center">
                          <LuggageIcon />
                          <p className="text-sm ">615 lt</p>
                        </div>
                        <div className="text-grayFont flex gap-2 items-center">
                          <SeatIcon />
                          <p className="text-sm ">5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tabs defaultValue="options" className="p-2 bg-white">
            <TabsList className="gap-6 ">
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
              <div className="flex border-borderGray border-y w-full">
                <div className="flex w-1/4 gap-2 items-center border-r">
                  <div className="w-fit">
                    <ChildSeatIcon />
                  </div>

                  <div className="p-2 flex justify-between gap-8 items-center w-full">
                    <div className="flex flex-col text-grayFont">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        CHILD SEAT <InfoIcon className="text-primary" />
                      </p>
                      <p className="text-sm text-gray-400">$24.00/Daily</p>
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
                <div className="flex w-1/4 gap-2 items-center pl-4 border-r">
                  <div className="w-fit">
                    <NavigationIcon />
                  </div>

                  <div className="p-2 flex justify-between gap-8 items-center w-full">
                    <div className="flex flex-col text-grayFont">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        NAVIGATION <InfoIcon className="text-primary" />
                      </p>
                      <p className="text-sm text-gray-400">$15.50/Daily</p>
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
                <div className="flex w-1/4 gap-2 items-center pl-4 border-r">
                  <div className="w-fit">
                    <DriverIcon />
                  </div>

                  <div className="p-2 flex justify-between gap-8 items-center w-full">
                    <div className="flex flex-col text-grayFont">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        ADITIONAL DRIVER <InfoIcon className="text-primary" />
                      </p>
                      <p className="text-sm text-gray-400">$40.00/Daily</p>
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
                <div className="flex w-1/4 gap-2 items-center pl-4">
                  <div className="w-fit">
                    <InsuranceIcon />
                  </div>

                  <div className="p-2 flex justify-between gap-8 items-center w-full">
                    <div className="flex flex-col text-grayFont">
                      <p className="flex items-center text-[10px] font-bold gap-1">
                        DAMAGE INSURANCE <InfoIcon className="text-primary" />
                      </p>
                      <p className="text-sm text-gray-400">$16.60/Daily</p>
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
              Excepteur sint occaecat cupidatat non proident.
            </TabsContent>
            <TabsContent value="gallery">
              Excepteur sint occaecat cupidatat non proident.
            </TabsContent>
          </Tabs>
        </div>
        <div className="sticky top-32 right-8 flex flex-col gap-4 w-1/4 h-full p-4 bg-white">
          <div className="">Price:345$</div>
          <div>Additional options:</div>
        </div>
      </div>
    </div>
  );
}
