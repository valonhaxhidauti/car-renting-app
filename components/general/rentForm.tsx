"use client";

import { useBooking } from "../context/bookingContext";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { EditBookingIcon } from "@/assets/svgs";
import { Location, RentFormData } from "@/lib/types";
import dayjs, { Dayjs } from "dayjs";
import LocationForm from "../common/locationForm";
import "dayjs/locale/de";
import "dayjs/locale/en-gb";

export default function RentForm({
  isModal,
  id,
}: {
  isModal: boolean;
  id?: string;
}) {
  const t = useTranslations("RentForm");
  const locale = useTranslations()("Locale");

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [showRentSelect, setShowRentSelect] = useState(false);
  const [showReturnSelect, setShowReturnSelect] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rentLocations, setRentLocations] = useState<Location[]>([]);
  const [returnLocations, setReturnLocations] = useState<Location[]>([]);

  const { params } = useCustomSearchParams();
  const {
    rentLocationId,
    returnLocationId,
    setRentLocationId,
    setReturnLocationId,
  } = useBooking();

  useEffect(() => {
    const storedRentLocationId = sessionStorage.getItem("rentLocationId");
    const storedReturnLocationId = sessionStorage.getItem("returnLocationId");

    if (storedRentLocationId) setRentLocationId(storedRentLocationId);
    if (storedReturnLocationId) setReturnLocationId(storedReturnLocationId);
  }, [setRentLocationId, setReturnLocationId]);

  const parseDate = (dateString: string): Dayjs =>
    dayjs(dateString, "YYYY/MM/DD HH:mm");

  const defaultFormData: RentFormData = {
    rentLocation: params.rentLocation || "", 
    returnLocation: params.returnLocation || "", 
    pickupDate: params.pickupDate
      ? parseDate(params.pickupDate)
      : dayjs().add(1, "day").set("hour", 10).set("minute", 0),
    dropOffDate: params.dropOffDate
      ? parseDate(params.dropOffDate)
      : dayjs().add(2, "day").set("hour", 18).set("minute", 0),
  };

  const [formData, setFormData] = useState<RentFormData>(defaultFormData);

  const isLocationDifferent = () => {
    return formData.rentLocation !== formData.returnLocation;
  };

  const [showReturnLocation, setShowReturnLocation] = useState(
    isLocationDifferent()
  );

  useEffect(() => {
    if (showModal) {
      fetchLocations(formData.rentLocation, "rent");
      if (isLocationDifferent()) {
        fetchLocations(formData.returnLocation, "return");
      }
    }
  }, [showModal, formData]);

  const handleInputChange =
    (field: keyof RentFormData) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));

      const type = field === "rentLocation" ? "rent" : "return";
      await fetchLocations(value, type);
      if (type === "rent") setShowRentSelect(true);
      else setShowReturnSelect(true);
    };

  const handleDateChange = (
    field: "pickupDate" | "dropOffDate",
    date: Dayjs | null
  ) => {
    setFormData({ ...formData, [field]: date });
  };

  const fetchLocations = async (query: string, type: "rent" | "return") => {
    const url = new URL("https://rent-api.rubik.dev/api/locations");
    url.searchParams.append("filter[search]", query);

    const headers = {
      "Accept-Language": locale,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const response = await fetch(url, { method: "GET", headers });
    const data = await response.json();

    if (type === "rent") {
      setRentLocations(data.data);
    } else {
      setReturnLocations(data.data);
    }
  };

  const fetchLocationsOnFocus = useCallback(
    async (field: "rent" | "return") => {
      const query =
        field === "rent" ? formData.rentLocation : formData.returnLocation;
      await fetchLocations(query, field);
    },
    [formData, fetchLocations]
  );

  const validateLocation = (location: string, type: "rent" | "return") => {
    const locations = type === "rent" ? rentLocations : returnLocations;
    return locations.some((loc) => loc.attributes.name === location);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { rentLocation, returnLocation, pickupDate, dropOffDate } = formData;

    const isValidRentLocation = validateLocation(rentLocation, "rent");
    const isValidReturnLocation = validateLocation(returnLocation, "return");

    const now = dayjs();

    if (pickupDate && pickupDate.isBefore(now)) {
      setErrorMessage(t("pickupDateBeforeCurrentError"));
      return;
    }

    if (
      !isValidRentLocation ||
      (!isValidReturnLocation && showReturnLocation)
    ) {
      setErrorMessage(t("invalidLocationError"));
      return;
    }

    if (pickupDate && dropOffDate) {
      const timeDifferenceHours = dropOffDate.diff(pickupDate, "hours");

      if (timeDifferenceHours < 1) {
        setErrorMessage(t("invalidDateError"));
        return;
      }
    }

    if (!pickupDate || !dropOffDate) {
      setErrorMessage(t("noDateError"));
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("rentLocation", rentLocation);
    queryParams.set("pickupDate", pickupDate.format("YYYY/MM/DD HH:mm"));
    queryParams.set("dropOffDate", dropOffDate.format("YYYY/MM/DD HH:mm"));

    if (showReturnLocation) {
      queryParams.set("returnLocation", returnLocation);
    } else {
      queryParams.set("returnLocation", rentLocation);
    }

    const queryString = queryParams.toString();

    router.push(`/explore?${queryString}`);

    setShowModal(false);
    setErrorMessage(null);
  };

  const toggleModal = () => {
    setFormData((prevFormData) => ({
      ...defaultFormData,
      ...prevFormData,
    }));
    setShowModal(!showModal);
  };

  const toggleRentSelect = () => setShowRentSelect(!showRentSelect);
  const toggleReturnSelect = () => setShowReturnSelect(!showReturnSelect);
  const handleCheckboxClick = () => setShowReturnLocation(!showReturnLocation);

  const handleLocationSelect = (
    location: Location,
    type: "rent" | "return"
  ) => {
    const updatedField = type === "rent" ? "rentLocation" : "returnLocation";
    setFormData({ ...formData, [updatedField]: location.attributes.name });

    if (type === "rent") {
      setRentLocationId(location.id);
      setShowRentSelect(false);
      if (!showReturnLocation) {
        setReturnLocationId(location.id);
      }
    } else {
      setReturnLocationId(location.id);
      setShowReturnSelect(false);
    }
  };

  return isModal ? (
    <>
      <div
        title={t("editBooking")}
        className="flex items-center justify-between w-full cursor-pointer gap-2 text-nowrap"
        onClick={toggleModal}
      >
        <p>{t("booking")}</p>
        <EditBookingIcon />
      </div>
      <div
        className={`fixed top-0 right-0 left-0 bottom-0 z-10 w-full fill-mode-forwards rounded ${
          showModal ? "animate-show-overlay" : "hidden"
        }`}
        onClick={toggleModal}
      ></div>
      <div
        className={`fixed z-50 max-w-lg bg-white w-[90vw] top-1/2 right-1/2 p-8 translate-x-1/2 -translate-y-1/2 rounded-xl ${
          showModal ? "block" : "hidden"
        }`}
      >
        <div className="w-full text-xl text-center">{t("search")}</div>
        <div className="absolute top-4 right-4 rounded-full p-2 flex hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer">
          <X onClick={toggleModal} />
        </div>
        <form onSubmit={submitForm}>
          <div className="w-full desktop:rounded-none">
            <LocationForm
              formData={formData}
              showReturnLocation={showReturnLocation}
              rentLocations={rentLocations}
              returnLocations={returnLocations}
              handleInputChange={handleInputChange}
              toggleRentSelect={toggleRentSelect}
              toggleReturnSelect={toggleReturnSelect}
              handleLocationSelect={handleLocationSelect}
              handleDateChange={handleDateChange}
              handleCheckboxClick={handleCheckboxClick}
              errorMessage={errorMessage}
              fetchLocationsOnFocus={fetchLocationsOnFocus}
              id={id}
            />
          </div>
        </form>
      </div>
    </>
  ) : (
    <div className="w-full tablet:w-1/2 h-screen relative p-4 mobile:p-8 bigDesktop:pr-0 flex flex-col justify-center">
      <p className="pb-4 font-bold leading-4 text-white tablet:text-grayFont text-lg">
        {t("findYourCar")}
      </p>
      <form className="w-full" onSubmit={submitForm}>
        <div className="shadow-grayPrimary w-full p-4 pt-2 rounded-md bg-white">
          <div className="flex flex-col relative w-full">
            <LocationForm
              formData={formData}
              showReturnLocation={showReturnLocation}
              rentLocations={rentLocations}
              returnLocations={returnLocations}
              handleInputChange={handleInputChange}
              toggleRentSelect={toggleRentSelect}
              toggleReturnSelect={toggleReturnSelect}
              handleLocationSelect={handleLocationSelect}
              handleDateChange={handleDateChange}
              handleCheckboxClick={handleCheckboxClick}
              errorMessage={errorMessage}
              fetchLocationsOnFocus={fetchLocationsOnFocus}
            />
            <h1 className="hidden tablet:block absolute -top-16 laptop:-top-24 -right-2 laptop:-right-9 font-bold text-[54px] laptop:text-[84px] text-gray-100 -z-10">
              {t("findNow")}
            </h1>
          </div>
        </div>
      </form>
    </div>
  );
}
