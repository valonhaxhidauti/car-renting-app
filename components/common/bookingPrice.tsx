import {
  CarRackIcon,
  ChildSeatIcon,
  InsuranceIcon,
  NavigationIcon,
} from "@/assets/svgs";
import { useBooking } from "../context/bookingContext";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Gauge } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { VehiclePrices } from "@/lib/types";
import BookingInfo from "./bookingInfo";
import dayjs from "dayjs";

export default function BookingPrice(vehicle: any) {
  const t = useTranslations("VehicleDetails");

  const childSeatPrice =
    vehicle.vehicle.relationships?.additionalItems[0]?.attributes?.final_base_price_in_cents.toFixed(
      "2"
    ) || 0;
  const rackPrice =
    vehicle.vehicle.relationships?.additionalItems[1]?.attributes?.final_base_price_in_cents.toFixed(
      "2"
    ) || 0;
  const naviPrice =
    vehicle.vehicle.relationships?.additionalItems[2]?.attributes?.final_base_price_in_cents.toFixed(
      "2"
    ) || 0;

  const prices: VehiclePrices = {
    vehicle: vehicle.vehicle.attributes?.final_base_price_in_cents || 0.0,
    childSeat: childSeatPrice,
    navigation: rackPrice,
    carRack: naviPrice,
  };

  const {
    childSeat,
    rack,
    navigation,
    insurance,
    insurancePrice,
    mileage,
    mileagePrice,
  } = useBooking();

  const { params } = useCustomSearchParams();
  const pickupDate = dayjs(params.pickupDate, "YYYY/MM/DD HH:mm");
  const dropOffDate = dayjs(params.dropOffDate, "YYYY/MM/DD HH:mm");

  const hoursDifference =
    dropOffDate.isValid() && pickupDate.isValid()
      ? dropOffDate.diff(pickupDate, "hour")
      : 0;
  const daysDifference = Math.ceil(hoursDifference / 24);

  const paramsSet =
    params &&
    Object.values(params).every(
      (param) => typeof param === "string" && param.trim() !== ""
    );

  const pathname = usePathname();
  const isPaymentPage =
    usePathname() === "/en/explore/vehicle/payment" ||
    pathname === "/de/explore/vehicle/payment";

  const optionalItems = [
    {
      name: t("childSeat"),
      quantity: childSeat,
      price: prices.childSeat,
      icon: <ChildSeatIcon />,
    },
    {
      name: t("additionalRack"),
      quantity: rack,
      price: prices.carRack,
      icon: <CarRackIcon />,
    },
    {
      name: t("navigation"),
      quantity: navigation,
      price: prices.navigation,
      icon: <NavigationIcon />,
    },
  ];

  const optionalItemsTotal = optionalItems.reduce(
    (total, item) => total + item.quantity * item.price * daysDifference,
    0
  );

  const insuranceTotal = insurancePrice;
  const mileageTotal = mileagePrice;

  const totalPrice =
    prices.vehicle * daysDifference +
    optionalItemsTotal +
    insuranceTotal +
    mileageTotal;

  return (
    <div className="flex flex-col gap-4 laptop:w-1/4 desktop:w-1/5">
      <div className="hidden laptop:block">
        <BookingInfo border={true} />
      </div>
      {vehicle && vehicle.vehicle.attributes ? (
        <div className="text-grayFont sticky top-32 right-8 flex flex-col w-full p-4 bg-white">
          <div className="flex flex-col border-b border-borderGray pb-3">
            <p className="text-xl font-bold flex justify-between items-center">
              {t("pageTitle")}
            </p>
            <p className="font-medium">
              {vehicle.vehicle.attributes.name.split(" (")[0]}
            </p>
          </div>
          <div className="flex justify-between text-sm border-b border-borderGray py-3">
            <p className="font-bold">{t("vehicleValue")}</p>
            <p className="font-bold text-primary">
              CHF {(prices.vehicle * daysDifference).toFixed(2)}
            </p>
          </div>
          {optionalItemsTotal > 0 && (
            <div className="flex flex-col border-b border-borderGray py-3 gap-2">
              <div className="flex justify-between text-sm">
                <p className="font-bold">{t("optionalItems")}</p>
                <p className="font-bold text-primary">
                  CHF {optionalItemsTotal.toFixed(2)}
                </p>
              </div>
              {optionalItems.map(
                (item) =>
                  item.quantity > 0 && (
                    <div
                      key={item.name}
                      className="flex justify-between items-center text-xs"
                    >
                      <div className="w-14 flex justify-center">
                        {item.icon}
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="font-light text-sm">{item.name}</p>
                        <p className="font-medium text-xs text-primary">
                          CHF{" "}
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
          {insuranceTotal > 0 && (
            <div className="flex flex-col mt-2">
              <p className="text-sm font-bold">{t("insuranceType")}</p>
              <div className="flex justify-between items-center text-xs border-b border-borderGray py-3">
                <div className="w-14 flex justify-center">
                  <InsuranceIcon />
                </div>
                <div className="flex justify-between w-full">
                  <p className="font-light text-sm">{insurance}</p>
                  <p className="font-medium text-xs text-primary">
                    CHF {insuranceTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
          {mileageTotal > 0 && (
            <div className="flex flex-col mt-2">
              <p className="text-sm font-bold">{t("mileageType")}</p>
              <div className="flex justify-between items-center text-xs border-b border-borderGray py-3">
                <div className="w-14 flex justify-center">
                  <Gauge className="w-8 h-8" color="#acacac" />
                </div>
                <div className="flex justify-between w-full">
                  <p className="font-light text-sm">{mileage}</p>
                  <p className="font-medium text-xs text-primary">
                    CHF {mileageTotal.toFixed(2)}
                  </p>
                </div>
              </div>
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
                CHF {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-white p-4 w-full h-fit gap-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 my-1 w-full" />
          <Skeleton className="h-4 mt-1 w-full" />
          <Skeleton className="h-4 mb-1 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}
    </div>
  );
}
