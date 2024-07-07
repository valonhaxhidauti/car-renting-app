import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs, HeadingTitle } from "../common/headingParts";
import { RentLocIcon, ReturnLocIcon } from "@/assets/svgs";
import { Skeleton } from "../ui/skeleton";
import AccountSideMenu from "./accountSideMenu";
import Image from "next/image";

interface Booking {
  id: number;
  attributes: {
    booking_id: string;
    start_date_time: string;
    end_date_time: string;
    total_price_in_cents: number;
    currency: string;
  };
  relationships: any;
}

export default function Reservations() {
  const t = useTranslations("Account.myReservations");
  const locale = useTranslations()("Locale");

  const [reservations, setReservations] = useState<Booking[]>([]);
  const [internalServerError, setInternalServerError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservations = async () => {
      const url = new URL("https://rent-api.rubik.dev/api/bookings");
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Accept-Language": locale,
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const result = await response.json();
            setReservations(result.data);
          } else {
            const errorData = await response.json();
            setInternalServerError(errorData.detail || "Internal Server Error");
          }
        } catch (error) {
          console.error("Failed to fetch reservations:", error);
          setInternalServerError("Failed to fetch reservations");
        } finally {
          setLoading(false);
        }
      } else {
        setInternalServerError("Authentication Error");
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("de", options);
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.ceil(daysDifference);
  };

  return (
    <>
      <HeadingTitle title={t("title")} />
      <div className="bg-bgSecondary w-full pb-16">
        <Breadcrumbs translations={t} />
        <div className="max-w-[1440px] m-auto">
          <div className="relative mx-0 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 mobile:px-8 pb-8 flex flex-col">
            <AccountSideMenu />
            <div className="flex flex-col w-full gap-8 mt-16">
              <h1 className="text-grayFont text-3xl font-bold">
                {t("heading")}
              </h1>
              {loading && (
                <div className=" w-full desktop:w-3/4">
                  <Skeleton className="h-14 w-full mb-2" />
                  <div className="flex flex-col bg-white p-4h-fit gap-4">
                    <Skeleton className="h-44 w-full" />
                    <Skeleton className="h-44 w-full" />
                    <Skeleton className="h-44 w-full" />
                  </div>
                </div>
              )}
              {internalServerError && <p>{internalServerError}</p>}
              {!loading && !internalServerError ? (
                <div className="w-full desktop:w-3/4  overflow-auto">
                  <div className="grid grid-cols-3 gap-4 p-4 font-medium text-grayFont bg-bgSecondary">
                    <p className="text-center">Vehicle Info</p>
                    <p className="text-center">Rental Info</p>
                    <p className="text-center">Total Price</p>
                  </div>
                  {reservations.length > 0 ? (
                    <div className="flex flex-col gap-4 mt-2 items-end w-full overflow-auto">
                      {reservations.map((reservation) => (
                        <div
                          key={reservation.id}
                          className="reservation-item border w-full grid grid-cols-3 gap-2 justify-between overflow-auto text-grayFont"
                        >
                          <div className="vehicleInfo w-full flex flex-col border-r p-4 align-center items-center gap-4 overflow-auto">
                            {reservation.relationships.car.relationships
                              .media &&
                            reservation.relationships.car.relationships.media
                              .length > 0 ? (
                              <Image
                                src={
                                  reservation.relationships.car.relationships
                                    .media[0].attributes.public_url
                                }
                                width={200}
                                height={140}
                                alt="booked car"
                                className="pointer-events-none text-center"
                              />
                            ) : (
                              <Image
                                src="/sampleCar.png"
                                width={200}
                                height={140}
                                alt="booked car"
                                className="pointer-events-none text-center"
                              />
                            )}
                            <p className="text-center text-lg font-bold">
                              {
                                reservation.relationships.car.attributes.name.split(
                                  "("
                                )[0]
                              }
                            </p>
                          </div>
                          <div className="rentalInfo border-r p-4 gap-2 flex items-center justify-between w-full overflow-auto">
                            <div className="flex items-center justify-between">
                              <div>
                                <RentLocIcon className="w-12" />
                              </div>
                              <p className="text-sm font-bold">
                                {
                                  formatDate(
                                    reservation.attributes.start_date_time
                                  ).split(",")[0]
                                }
                                <br />
                                {
                                  formatDate(
                                    reservation.attributes.start_date_time
                                  ).split(",")[1]
                                }
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <ReturnLocIcon className="w-12" />
                              </div>
                              <p className="text-sm font-bold">
                                {
                                  formatDate(
                                    reservation.attributes.end_date_time
                                  ).split(",")[0]
                                }
                                <br />
                                {
                                  formatDate(
                                    reservation.attributes.end_date_time
                                  ).split(",")[1]
                                }
                              </p>
                            </div>
                          </div>
                          <div className="totalPrice w-full flex flex-col items-center justify-center gap-2 overflow-auto">
                            <div className="flex flex-col gap-2 items-center">
                              <p className="font-medium">
                                Total{" "}
                                {calculateDays(
                                  reservation.attributes.start_date_time,
                                  reservation.attributes.end_date_time
                                )}{" "}
                                days
                              </p>
                              <div className="h-full content-center">
                                <sup className="text-xs font-bold top-0">
                                  {reservation.attributes.currency}
                                </sup>
                                <span className="text-4xl font-bold">
                                  {reservation.attributes.total_price_in_cents}
                                </span>
                                <span className="inline-block ">
                                  <sup className="relative block text-xl leading-none font-bold -top-3">
                                    ,00
                                  </sup>
                                </span>
                              </div>
                            </div>
                            <p className="text-xs py-2 p-4 bg-primary rounded-full text-white font-bold">
                              {reservation.attributes.booking_id}
                            </p>
                            <p>
                              {reservation.relationships.car.attributes.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-lg text-center mt-8 p-4 font-bold text-primary">
                      Currently you have no reservations
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
