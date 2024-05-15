import React from "react";
import BookingInfo from "./bookingInfo";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { Skeleton } from "../ui/skeleton";

export default function BookingPrice(props: any) {
  const t = useTranslations("VehicleDetails");

  return (
    <div className="flex flex-col gap-4 laptop:w-1/4 desktop:w-1/5">
      <div className="hidden laptop:block">
        <BookingInfo border={true} />
      </div>
      {props.vehicle && props.vehicle.attributes ? (
        <div className="text-grayFont sticky top-32 right-8 flex flex-col w-full p-4 bg-white">
          <div className="flex flex-col border-b border-borderGray pb-3">
            <p className="text-xl font-bold">{t("pageTitle")}</p>
            <p className="font-medium">
              {props.vehicle.attributes.name.split(" (")[0]}
            </p>
          </div>
          <div className="flex justify-between text-sm border-b border-borderGray py-3">
            <p className="font-bold">{t("vehicleValue")}</p>
            <p className="font-bold text-primary">
              ${(props.prices.vehicle * props.daysDifference).toFixed(2)}
            </p>
          </div>
          {props.optionalItemsTotal > 0 && (
            <div className="flex flex-col border-b border-borderGray py-3 gap-2">
              <div className="flex justify-between text-sm">
                <p className="font-bold">{t("optionalItems")}</p>
                <p className="font-bold text-primary">
                  ${props.optionalItemsTotal.toFixed(2)}
                </p>
              </div>
              {props.optionalItems.map(
                (item:any) =>
                  item.quantity > 0 && (
                    <div
                      key={item.name}
                      className="flex justify-between text-xs"
                    >
                      <div className="w-14 flex justify-center">
                        {item.icon}
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="font-light text-sm">{item.name}</p>
                        <p className="font-light text-sm text-primary">
                          $
                          {(
                            item.quantity *
                            item.price *
                            props.daysDifference
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
          <div className="py-3">
            <div className="flex justify-between items-center pb-2">
              <p className="font-light text-sm">{t("pricePer")}</p>
              <p className="text-xs text-white px-2 py-0.5 bg-primary rounded-sm">
                {props.daysDifference} &nbsp;
                {props.daysDifference === 1
                  ? t("day").toUpperCase()
                  : t("days").toUpperCase()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">{t("totalValue")}</p>
              <p className="font-bold text-primary">
                ${props.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <Link
            href={`/explore/vehicle/payment?vehicleId=${props.params.vehicleId}&rentLocation=${props.params.rentLocation}&returnLocation=${props.params.returnLocation}&pickupDate=${props.params.pickupDate}&dropOffDate=${props.params.dropOffDate}`}
            className="px-8 py-3 text-white hover:bg-secondary bg-primary transition-all text-center"
          >
            {t("continueButton")}
          </Link>
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
