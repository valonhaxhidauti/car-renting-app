"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
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
import { Skeleton } from "../ui/skeleton";
import { useSearchParams } from "next/navigation";
import VehicleSort from "../common/vehicleSort";
import { VehiclePagination } from "../other/vehiclePagination";

export default function ExploreVehicles() {
  const t = useTranslations("Header");
  const u = useTranslations("ExploreVehicles");
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const params: { [key: string]: string } = {
    "filter[carType]": searchParams.get("filter[carType]") || "",
    "filter[carClass]": searchParams.get("filter[carClass]") || "",
    "filter[gearType]": searchParams.get("filter[gearType]") || "",
    "filter[fuelType]": searchParams.get("filter[fuelType]") || "",
  };

  const [vehicles, setVehicles] = useState<VehicleData>({
    data: [],
    links: {},
    meta: { last_page: 1 },
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const url = new URL(
          `https://rent-api.rubik.dev/api/cars?page=${currentPage}`
        );

        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );

        const sortBy = searchParams.get("sort");
        if (sortBy) {
          switch (sortBy) {
            case "yearDesc":
              url.searchParams.append("sort", "-year");
              break;
            case "yearAsc":
              url.searchParams.append("sort", "year");
              break;
            case "priceDesc":
              url.searchParams.append("sort", "-base_price_in_cents");
              break;
            case "priceAsc":
              url.searchParams.append("sort", "base_price_in_cents");
              break;
            default:
              break;
          }
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        // console.log("API Response:", data);

        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [currentPage, searchParams]);

  const totalPages = vehicles.meta?.last_page || 1;

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (currentPage !== pageNumber) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevChange = (pageNumber: number) => {
    if (pageNumber === 1) return;
    else {
      setCurrentPage(pageNumber - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextChange = (pageNumber: number) => {
    if (pageNumber === totalPages) return;
    else {
      setCurrentPage(pageNumber + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-bgSecondary w-full pb-16">
      <div className="w-full bg-white ">
        <div className="max-w-[1440px] m-auto flex justify-between px-4 mobile:px-8 bigDesktop:px-0 py-8">
          <div className="text-primary font-bold text-4xl w-full items-center flex cursor-default">
            {u("pageTitle")}
          </div>
          <div className="laptop:flex gap-6 hidden">
            <div className="flex gap-2 items-center text-sm">
              <VehicleSort />
            </div>
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
            <VehicleSort />
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
          <div className="flex flex-col w-full laptop:w-4/5 gap-4">
            <div
              className={`w-full gap-4 ${
                viewMode === "list"
                  ? "flex flex-col"
                  : "grid grid-cols-1 tablet:grid-cols-2"
              }`}
            >
              {loading
                ? Array.from({ length: 12 }, (_, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-white p-4 gap-4"
                    >
                      <Skeleton className="h-[196px] w-full" />
                      <div className="flex gap-2 w-full">
                        <div className="flex flex-col gap-2 w-[60%] mobile:w-[70%]">
                          <div className="flex flex-col gap-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Skeleton className="h-[78px] w-full" />
                            <Skeleton className="h-[78px] w-full" />
                            <Skeleton className="h-[78px] w-full" />
                            <Skeleton className="h-[78px] w-full" />
                          </div>
                        </div>
                        <div className="w-[40%] mobile:w-[29%]">
                          <Skeleton className="h-full w-full" />
                        </div>
                      </div>
                    </div>
                  ))
                : vehicles.data.map((vehicle: any) => (
                    <VehicleCard
                      viewMode={viewMode}
                      vehicle={vehicle}
                      key={vehicle.id}
                    />
                  ))}
            </div>
            <VehiclePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onNextChange={handleNextChange}
              onPrevChange={handlePrevChange}
            />
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
