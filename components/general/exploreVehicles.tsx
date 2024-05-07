"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "next-view-transitions";
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
  CloseMenuIcon,
  EditBookingIcon,
  FilterIcon,
  GridViewIcon,
  ListViewIcon,
} from "@/assets/svgs";
import VehicleCard from "../common/vehicleCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";
import VehicleFilters from "../common/vehicleFilters";
import BookingInfo from "../common/bookingInfo";
import { VehicleData } from "@/lib/types";

export default function ExploreVehicles() {
  const t = useTranslations("Header");
  const u = useTranslations("ExploreVehicles");

  const [vehicles, setVehicles] = useState<VehicleData>({
    data: [],
    links: {},
    meta: {},
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const url = new URL("https://rent-api.rubik.dev/api/cars");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const [showFilters, setShowFilters] = useState(false);
  const [showFiltersAnimation, setShowFiltersAnimation] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showBookingAnimation, setShowBookingAnimation] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setShowFiltersAnimation(true);
  };

  const toggleBooking = () => {
    setShowBooking(!showBooking);
    setShowBookingAnimation(true);
  };
  return (
    <div className="bg-bgSecondary w-full pb-16">
      <div className="w-full bg-white ">
        <div className="max-w-[1440px] m-auto flex justify-between px-4 mobile:px-8 bigDesktop:px-0 py-8">
          <div className="text-primary font-bold text-4xl w-full items-center flex cursor-default">
            {u("pageTitle")}
          </div>
          <div className="laptop:flex gap-6 hidden">
            <div className="flex gap-2 items-center">
              <p className="text-grayFont font-medium text-sm">
                {u("currency.label")}
              </p>
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
              <Select>
                <SelectTrigger className="flex border-borderGray border-2 text-grayFont text-xs font-medium rounded-full w-36 h-8 gap-2 px-2">
                  <SelectValue placeholder={u("sortByLabel")} />
                  <ChevronDown className="text-grayFont font-medium h-4 w-4" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>{u("sortBy")}</SelectLabel>
                    <SelectItem value="price">{u("modelYear")}</SelectItem>
                    <SelectItem value="year">{u("price")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4 items-center text-sm">
              <p className="text-grayFont font-medium text-nowrap">
                {u("changeListView")}
              </p>
              <div className="flex gap-2">
                <GridViewIcon
                  onClick={() => viewMode !== "grid" && toggleViewMode()}
                  className={`text-[#c2c2c2] hover:text-primary cursor-pointer ${
                    viewMode === "grid" && "text-primary"
                  }`}
                />
                <ListViewIcon
                  onClick={() => viewMode !== "list" && toggleViewMode()}
                  className={`text-[#c2c2c2] hover:text-primary cursor-pointer ${
                    viewMode === "list" && "text-primary"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] m-auto">
        <Breadcrumb className="w-full px-4 mobile:px-8 bigDesktop:px-0 py-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t("homepage")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{u("pageTitle")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="bg-white flex mb-4 mx-0 mobile:mx-8 p-4 laptop:hidden">
          <div className="flex gap-4 mobile:gap-6">
            <div className="flex gap-2 items-center text-sm">
              <Select>
                <SelectTrigger className="flex border-borderGray border-2 text-grayFont text-xs font-medium rounded-full tablet:w-36 h-8 gap-2 px-2">
                  <SelectValue placeholder={u("sortByLabel")} />
                  <ChevronDown className="text-grayFont font-medium h-4 w-4" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>{u("sortBy")}</SelectLabel>
                    <SelectItem value="price">{u("modelYear")}</SelectItem>
                    <SelectItem value="year">{u("price")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div
              className="flex gap-2 p-2 h-8 text-xs text-grayFont cursor-pointer items-center border-borderGray border-2 rounded-full self-center"
              onClick={toggleBooking}
            >
              <EditBookingIcon />
              {u("booking")}
            </div>
            <div
              className="border-borderGray h-8 border-2 cursor-pointer rounded-full px-2 text-grayFont font-medium text-xs flex gap-2 items-center"
              onClick={toggleFilters}
            >
              <FilterIcon className="text-primary" /> {u("filters")}
            </div>
            <div
              className={`fixed top-0 right-0 left-0 bottom-0 z-10 w-full fill-mode-forwards	${
                showBooking ? "animate-show-overlay" : "hidden"
              }`}
              onClick={toggleBooking}
            ></div>
            <div
              className={`fill-mode-forwards bg-white fixed w-full overflow-y-scroll right-0 z-10 ${
                showBooking
                  ? "animate-show-booking"
                  : showBookingAnimation
                  ? "animate-hide-booking"
                  : "hidden"
              }`}
            >
              <BookingInfo border={false} label="diffLocation2" />
            </div>

            <div
              className={`fixed top-0 right-0 left-0 bottom-0  z-10 w-full fill-mode-forwards	${
                showFilters ? "animate-show-overlay" : "hidden"
              }`}
              onClick={toggleFilters}
            ></div>
            <div
              className={`fill-mode-forwards bg-white fixed h-full overflow-y-scroll top-0 w-3/4 z-10 ${
                showFilters
                  ? "animate-show-filters"
                  : showFiltersAnimation
                  ? "animate-hide-filters"
                  : "hidden"
              }`}
            >
              <div className="bg-white p-4 h-screen">
                <div className="flex justify-between text-lg text-grayFont font-bold mb-4">
                  {u("filterVehicles")}
                  <CloseMenuIcon
                    className="text-primary cursor-pointer"
                    onClick={toggleFilters}
                  />
                </div>
                <VehicleFilters filtersId="1" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mobile:mx-8 bigDesktop:mx-0">
          <div
            className={`w-full laptop:w-4/5 gap-4 ${
              viewMode === "list"
                ? "flex flex-col"
                : "grid grid-cols-1 tablet:grid-cols-2"
            }`}
          >
            {vehicles.data.map((vehicle: any) => (
              <VehicleCard
                viewMode={viewMode}
                vehicle={vehicle}
                key={vehicle.id}
              />
            ))}
          </div>
          <div className="w-1/5 flex-col h-full gap-4 hidden laptop:flex">
            <BookingInfo border={true} />
            <div className="bg-white p-4 flex flex-col gap-4 h-full">
              <Accordion
                defaultValue="filters"
                type="single"
                collapsible
                className="w-full py-0"
              >
                <AccordionItem value="filters" className="border-none">
                  <AccordionTrigger>
                    <div className="flex justify-between cursor-pointer text-lg text-grayFont font-bold">
                      {u("filterVehicles")}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <VehicleFilters filtersId="2" />
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
