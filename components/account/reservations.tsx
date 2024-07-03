import { useState, useEffect } from "react";
import { Breadcrumbs, HeadingTitle } from "../common/headingParts";
import { useTranslations } from "next-intl";
import AccountSideMenu from "./accountSideMenu";

interface Booking {
  id: number;
  attributes: {
    booking_id: string;
    start_date_time: string;
    end_date_time: string;
    total_price_in_cents: number;
    currency: string;
  };
  relationships: {
    car: {
      attributes: {
        name: string;
        status: string;
        description: string;
      };
    };
  };
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
        setInternalServerError("Token Error");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [locale]);

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
              {loading && <p>Loading...</p>}
              {internalServerError && <p>{internalServerError}</p>}
              {!loading && !internalServerError ? (
                reservations.length > 0 ? (
                  <div className="w-full desktop:w-3/4 flex flex-col gap-12 items-end">
                    {reservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="reservation-item p-4 border rounded flex flex-col w-full"
                      >
                        <h2 className="text-xl font-semibold">
                          Booking ID: {reservation.attributes.booking_id}
                        </h2>
                        <p>
                          Car: {reservation.relationships.car.attributes.name}
                        </p>
                        <p>
                          Start:{" "}
                          {new Date(
                            reservation.attributes.start_date_time
                          ).toLocaleString()}
                        </p>
                        <p>
                          End:{" "}
                          {new Date(
                            reservation.attributes.end_date_time
                          ).toLocaleString()}
                        </p>
                        <p>
                          Price:{" "}
                          {reservation.attributes.total_price_in_cents / 100}{" "}
                          {reservation.attributes.currency}
                        </p>
                        <p>
                          Status:{" "}
                          {reservation.relationships.car.attributes.status}
                        </p>
                        <p>
                          Description:{" "}
                          {reservation.relationships.car.attributes.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-lg font-bold text-primary">Currently you have no reservations</div>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
