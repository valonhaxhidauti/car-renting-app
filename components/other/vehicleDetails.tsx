"use client";

import { CarRackIcon, ChildSeatIcon, NavigationIcon } from "@/assets/svgs";
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
import { HeadingTitle } from "../common/headingParts";
import VehicleGallery from "./vehicleGallery";
import VehicleSpecs from "./vehicleSpecs";
import BookingMobile from "../common/bookingMobile";
import dayjs from "dayjs";
import VehicleOptions from "./vehicleOptions";
import BookingPrice from "../common/bookingPrice";
import VehicleTerms from "./vehicleTerms";
import VehicleDetailsSkeleton from "../loader/vehicleDetailsSkeleton";
import VehicleInsurance from "./vehicleInsurance";
import VehicleMileage from "./vehicleMileage";
import VehicleDetailsInfo from "./vehicleDetailsInfo";

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

  const childSeatPrice =
    vehicle.relationships?.additionalItems[0]?.attributes?.base_price_in_cents.toFixed(
      "2"
    ) || 0;
  const rackPrice =
    vehicle.relationships?.additionalItems[1]?.attributes?.base_price_in_cents.toFixed(
      "2"
    ) || 0;
  const naviPrice =
    vehicle.relationships?.additionalItems[2]?.attributes?.base_price_in_cents.toFixed(
      "2"
    ) || 0;

  const prices: VehiclePrices = {
    vehicle: vehicle.attributes?.base_price_in_cents || 0.0,
    childSeat: childSeatPrice,
    navigation: rackPrice,
    carRack: naviPrice,
  };

  const maxChildSeat =
    vehicle.relationships?.additionalItems[0]?.attributes?.max_quantity || 0;
  const maxRack =
    vehicle.relationships?.additionalItems[1]?.attributes?.max_quantity || 0;
  const maxNavi =
    vehicle.relationships?.additionalItems[2]?.attributes?.max_quantity || 0;

  const [childSeat, incChildSeat, decChildSeat] = useCounter(0, maxChildSeat);
  const [rack, incRack, decRack] = useCounter(0, maxRack);
  const [navigation, incNavigation, decNavigation] = useCounter(0, maxNavi);
  console.log(vehicle);

  const optionalItems = [
    {
      name: t("childSeat"),
      quantity: childSeat,
      price: childSeatPrice,
      icon: <ChildSeatIcon />,
    },
    {
      name: t("additionalRack"),
      quantity: rack,
      price: rackPrice,
      icon: <CarRackIcon />,
    },
    {
      name: t("navigation"),
      quantity: navigation,
      price: naviPrice,
      icon: <NavigationIcon />,
    },
  ];

  const optionalItemsTotal = optionalItems.reduce(
    (total, item) => total + item.quantity * item.price * daysDifference,
    0
  );

  const totalPrice = prices.vehicle * daysDifference + optionalItemsTotal;

  return (
    <>
      <HeadingTitle title={t("pageTitle")} />
      <div className="bg-bgSecondary w-full h-full mb-8">
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
          <div className="mx-0 mobile:mx-8 bigDesktop:mx-0 flex flex-col-reverse laptop:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full laptop:w-3/4 desktop:w-4/5">
              {vehicle && vehicle.attributes ? (
                <>
                  <VehicleDetailsInfo vehicle={vehicle} />
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
                        extraOptions={vehicle.relationships.additionalItems}
                        childSeat={childSeat}
                        incChildSeat={incChildSeat}
                        decChildSeat={decChildSeat}
                        maxChildSeat={maxChildSeat}
                        rack={rack}
                        incRack={incRack}
                        decRack={decRack}
                        maxRack={maxRack}
                        navi={navigation}
                        incNavi={incNavigation}
                        decNavi={decNavigation}
                        maxNavi={maxNavi}
                      />
                      <VehicleInsurance />
                      <VehicleMileage />
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
                      {vehicle.relationships.media ? (
                        <VehicleGallery images={vehicle.relationships.media} />
                      ) : (
                        <p className="text-grayFont text-lg font-bold mb-2">
                          {t("noImages")}
                        </p>
                      )}
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
    </>
  );
}
