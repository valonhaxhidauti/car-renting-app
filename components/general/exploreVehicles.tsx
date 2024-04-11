import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  EditBookingIcon,
  GridViewIcon,
  ListViewIcon,
  RentLocIcon,
  ReturnLocIcon,
} from "@/assets/svgs";
import VehicleCard from "../common/vehicleCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function ExploreVehicles() {
  const t = useTranslations("Header");

  return (
    <div className="bg-bgSecondary w-full pb-16">
      <div className="w-full bg-white ">
        <div className="max-w-[1440px] m-auto flex justify-between px-4 mobile:px-8 py-8">
          <div className="text-primary font-bold text-4xl w-full items-center flex cursor-default">
            Explore Vehicles
          </div>
          <div className="flex gap-6 ">
            <div className="flex gap-2 items-center">
              <p className="text-grayFont font-medium text-sm">Currency</p>
              <Select>
                <SelectTrigger className="flex border-borderGray border-2 text-grayFont text-xs font-medium rounded-full w-24 h-8 gap-2 px-2">
                  <SelectValue placeholder={t("currencies.usd")} />
                  <ChevronDown className="text-grayFont font-medium h-4 w-4" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>{t("currencies.label")}</SelectLabel>
                    <SelectItem value="usd">{t("currencies.usd")}</SelectItem>
                    <SelectItem value="eur">{t("currencies.eur")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <p className="text-grayFont font-medium text-nowrap">
                Sort results by
              </p>
              <Select>
                <SelectTrigger className="flex border-borderGray border-2 text-grayFont text-xs font-medium rounded-full w-36 h-8 gap-2 px-2">
                  <SelectValue placeholder="Model Year" />
                  <ChevronDown className="text-grayFont font-medium h-4 w-4" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="price">Model Year</SelectItem>
                    <SelectItem value="year">Price</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4 items-center text-sm">
              <p className="text-grayFont font-medium text-nowrap">
                Change List View
              </p>
              <div className="flex gap-2">
                <GridViewIcon className="text-[#c2c2c2] hover:text-primary cursor-pointer" />
                <ListViewIcon className="text-[#c2c2c2] hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] m-auto">
        <Breadcrumb className="w-full px-4 mobile:px-8 py-8 ">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Homepage</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Explore Vehicles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4 ">
          <div className="w-4/5 flex flex-col gap-4">
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
          </div>
          <div className="w-1/5 flex flex-col h-full gap-4 mr-4 mobile:mr-8">
            <div className="bg-white p-4 flex flex-col gap-4 border-borderBooking border-2">
              <div className="flex justify-between">
                Booking Information <EditBookingIcon />
              </div>
              <div className="flex gap-2 items-center">
                <RentLocIcon className="w-12" />
                <div className="text-grayFont">
                  <p className="text-sm leading-none">30.10.2019 08:00 PM</p>
                  <p className="text-xs leading-none">
                    Los Angeles, ABD International Airport (LAX)
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <ReturnLocIcon className="w-12" />
                <div className="text-grayFont">
                  <p className="text-sm leading-none">03.11.2019 08:00 PM</p>
                  <p className="text-xs leading-none">
                    Los Angeles, ABD International Airport (LAX)
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 flex flex-col gap-4 h-full">
              <Accordion type="single" collapsible className="w-full py-0">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="pb-4 pt-0">
                    <div className="flex justify-between cursor-pointer">
                      <h1 className="text-lg text-fontGray font-bold">
                        Filter Vehicles
                      </h1>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col items-start gap-2 pb-4 border-borderGray border-b">
                      <p className="pb-2 text-sm font-bold">Vehicle Class</p>
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          id="economic"
                          className="cursor-pointer"
                        />
                        <label
                          htmlFor="economic"
                          className="text-grayFont text-xs cursor-pointer"
                        >
                          Economic
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Middle Class
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Top Grade
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Luxury
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          7+ Persons
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          SUV
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
                      <p className="pb-2 text-sm font-bold">Vehicle Type</p>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Sedan
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Hatchback
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Stationwagon
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          SUV
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          VAN
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 pb-4 mt-4 border-borderGray border-b">
                      <p className="pb-2 text-sm font-bold">Gear Type</p>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Autoamatic
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Manual
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 mt-4">
                      <p className="pb-2 text-sm font-bold">Fuel Type</p>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Diesel
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Autogas
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Hybrid
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Gasoline
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <label className="text-grayFont text-xs cursor-pointer">
                          Electrical
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}