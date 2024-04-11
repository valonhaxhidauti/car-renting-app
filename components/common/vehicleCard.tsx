import { FuelIcon, SearchIcon, WarningIcon } from "@/assets/svgs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function VehicleCard() {
  return (
    <div className="bg-white flex flex-col gap-4 pl-4 mobile:pl-8">
      <div className="w-full p-2 flex gap-8">
        <Image
          src="/sampleCar.png"
          alt="vehicle"
          width="240"
          height="120"
          className="py-12"
        />
        <div className="flex justify-between w-full gap-2">
          <div className="w-full flex flex-col justify-between">
            <div className="flex w-full justify-between pt-2">
              <div className="flex flex-col gap-4">
                <p className="text-graySecondary w-fit border-graySecondary border rounded-full font-medium text-[10px] px-12 py-1">
                  SUV
                </p>
                <p className="text-grayFont font-medium text-2xl">
                  Volvo XC90 Excellence
                </p>
              </div>
              <div>
                <p className="border-2 border-red-500 text-red-500 font-bold p-1 text-sm rounded-lg">
                  25% OFF
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full">
              <div className="py-2 pr-2 border border-l-0 text-grayFont hover:text-primary flex gap-1 items-center">
                <SearchIcon className="w-3 h-3" />
                <p className="text-[11px] font-medium">
                  Filter vehicles of the same specifications
                </p>
              </div>
              <div className="p-2 border border-x-0 text-grayFont flex gap-1 items-center">
                <WarningIcon className="w-4 h-4" />
                <p className="text-[11px] font-medium">
                  The options of the vehicle to be delivered may vary
                </p>
              </div>
              <div className="border-borderGray border-b flex w-full">
                <div className="text-grayFont p-4 w-full flex flex-col justify-between items-center border-r">
                  <FuelIcon />
                  <p className="text-sm leading-none font-bold">DIESEL</p>
                </div>
                <div className="text-grayFont p-4 w-full flex flex-col justify-between items-center border-r">
                  <FuelIcon />
                  <p className="text-sm leading-none font-bold">DIESEL</p>
                </div>
                <div className="text-grayFont p-4 w-full flex flex-col justify-between items-center border-r">
                  <FuelIcon />
                  <p className="text-sm leading-none font-bold">DIESEL</p>
                </div>
              </div>
              <div className="border-borderGray border-b flex w-full">
                <div className="text-grayFont p-4 w-full flex flex-col justify-between items-center border-r">
                  <FuelIcon />
                  <p className="text-sm leading-none font-bold">DIESEL</p>
                </div>
                <div className="text-grayFont p-4 w-full flex flex-col justify-between items-center border-r">
                  <FuelIcon />
                  <p className="text-sm leading-none font-bold">DIESEL</p>
                </div>
                <div className="text-primary p-4 w-full flex flex-col justify-between items-center gap-2">
                  <ChevronRight size={14} />
                  <p className="text-sm leading-none text-center">
                    View All Specifications
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center p-4 bg-primary-background text-secondary">
            <div className="h-full content-center">
              <sup className="text-4xl font-bold top-0">$</sup>
              <span className="text-6xl font-bold">64</span>
              <span className="inline-block ">
                <sup className="relative block text-xl leading-none font-bold -top-7">
                  ,99
                </sup>
              </span>
              <p className="text-xs font-medium text-center">
                Daily Rental Fee
              </p>
            </div>
            <button className="px-8 py-3 text-white text-xs bg-secondary hover:bg-primary text-nowrap">
              Rent Now!
            </button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="test1" className="p-2">
        <TabsList className="gap-6">
          <TabsTrigger className="" value="test1">
            test1
          </TabsTrigger>
          <TabsTrigger className="" value="test2">
            test2
          </TabsTrigger>
          <TabsTrigger className="" value="test3">
            test3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="test1">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
        </TabsContent>
        <TabsContent value="test2">
          Duis aute irure dolor in reprehenderit in voluptate velit esse.
        </TabsContent>
        <TabsContent value="test3">
          Excepteur sint occaecat cupidatat non proident.
        </TabsContent>
      </Tabs>
    </div>
  );
}