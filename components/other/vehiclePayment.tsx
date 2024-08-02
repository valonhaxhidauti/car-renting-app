"use client";

import {
  BillingInfo,
  DriverLicenseInfo,
  IdInfo,
  PassportInfo,
  PersonalInfo,
} from "@/lib/types";
import { useAuth } from "../context/authContext";
import { useBooking } from "../context/bookingContext";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useFetchedVehicle } from "../hooks/useFetchedVehicle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { BreadcrumbExtended, HeadingTitle } from "../common/headingParts";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import BookingPrice from "../common/bookingPrice";
import CreditCardPayment from "./creditCardPayment";
import CashPayment from "./cashPayment";
import RentForm from "../general/rentForm";
import BillingInformation from "../booking/billingInformation";
import DocumentsInformation from "../booking/documentsInformation";
import PersonalInformation from "../booking/personalInformation";

export default function VehiclePayment() {
  const t = useTranslations("VehicleDetails");
  const u = useTranslations("vehiclePayment.payment");
  const locale = useTranslations()("Locale");
  const router = useRouter();

  const {
    childSeat,
    rack,
    navigation,
    insuranceId,
    mileageId,
    rentLocationId,
    returnLocationId,
  } = useBooking();
  const { params } = useCustomSearchParams();
  const { isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState(false);
  const [updateDocuments, setUpdateDocuments] = useState(false);
  const [updateBilling, setUpdateBilling] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const vehicleId = params.vehicleId;

  const vehicle = useFetchedVehicle(vehicleId);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCode: "",
    dateOfBirth: "",
  });

  const [passportInfo, setPassportInfo] = useState<PassportInfo>({
    passportNumber: "",
    issuingCountry: "",
    dateOfIssue: "",
    dateOfExpiration: "",
    frontImage: null,
  });

  const [driverLicenseInfo, setDriverLicenseInfo] = useState<DriverLicenseInfo>(
    {
      driverLicenseNumber: "",
      issuingCountry: "",
      dateOfIssue: "",
      dateOfExpiration: "",
      frontImage: null,
      backImage: null,
    }
  );

  const [idInfo, setIdInfo] = useState<IdInfo>({
    idNumber: "",
    issuingCountry: "",
    dateOfIssue: "",
    dateOfExpiration: "",
    frontImage: null,
    backImage: null,
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    address: "",
    number: "",
    zip: "",
    street: "",
    city: "",
    country: "",
  });

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = "https://rent-api.rubik.dev/api/bookings";
    const headers = {
      "Accept-Language": locale,
      Accept: "application/json",
    };

    const body = new FormData();
    body.append("mileage_type_id", `${mileageId}`);
    body.append("insurance_type_id", `${insuranceId}`);
    body.append("pick_up_location_id", `${rentLocationId}`);
    body.append("drop_off_location_id", `${returnLocationId}`);
    body.append("car_id", vehicleId);
    body.append("start_date_time", params.pickupDate);
    body.append("end_date_time", params.dropOffDate);
    body.append("seat_no", `${childSeat}`);
    body.append("rack_no", `${rack}`);
    body.append("navigation_no", `${navigation}`);
    body.append("first_name", personalInfo.firstName);
    body.append("last_name", personalInfo.lastName);
    body.append("email", personalInfo.email);
    body.append("phone_code", personalInfo.phoneCode);
    body.append("phone", personalInfo.phone);
    body.append("date_of_birth", personalInfo.dateOfBirth);
    if (isAuthenticated) {
      body.append("update_documents", "true");
      body.append("update_customer", "true");
      body.append("update_billing_address", "true");
    } else {
      body.append("update_documents", String(updateDocuments));
      body.append("update_customer", String(updateCustomer));
      body.append("update_billing_address", String(updateBilling));
    }
    body.append("payment_method", paymentMethod);
    body.append("address", billingInfo.address);
    body.append("number", billingInfo.number);
    body.append("zip", billingInfo.zip);
    body.append("street", billingInfo.street);
    body.append("city", billingInfo.city);
    body.append("country", billingInfo.country);
    body.append("driver_licence_number", driverLicenseInfo.driverLicenseNumber);
    body.append("driver_licence_issuing_country", driverLicenseInfo.issuingCountry);
    body.append("driver_licence_date_of_issue", driverLicenseInfo.dateOfIssue);
    body.append("driver_licence_date_of_expiration", driverLicenseInfo.dateOfExpiration);
    body.append("driver_licence_front_image", driverLicenseInfo.frontImage || "");
    body.append("driver_licence_back_image", driverLicenseInfo.backImage || "");
    body.append("passport_number", passportInfo.passportNumber);
    body.append("passport_issuing_country", passportInfo.issuingCountry);
    body.append("passport_front_image", passportInfo.frontImage || "");
    body.append("passport_date_of_issue", passportInfo.dateOfIssue);
    body.append("passport_date_of_expiration", passportInfo.dateOfExpiration);
    body.append("id_number", idInfo.idNumber);
    body.append("id_issuing_country", idInfo.issuingCountry);
    body.append("id_front_image", idInfo.frontImage || "");
    body.append("id_back_image", idInfo.backImage || "");
    body.append("id_date_of_issue", idInfo.dateOfIssue);
    body.append("id_date_of_expiration", idInfo.dateOfExpiration);

    setIsSubmitting(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      if (response.ok) {
        const responseData = await response.json();
        const bookingId = responseData.data.attributes.booking_id;
        router.push(`/booking/${bookingId}`);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setFormErrors(errorData.detail);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeadingTitle title={t("pageTitle")} />
      <div className="bg-bgSecondary w-full h-full mb-8">
        <div className="max-w-[1440px] pb-16 m-auto w-full">
          <BreadcrumbExtended translations={t} params={params} />
          <div className="bg-white flex mb-4 mx-0 mobile:mx-8 p-4 laptop:hidden">
            <div className="flex gap-2 p-2 h-8 text-sm text-grayFont cursor-pointer items-center border-borderGray border-2 rounded-full">
              <RentForm isModal={true} id="vehicleDetailsBooking" />
            </div>
          </div>
          <div className="mx-0 mobile:mx-8 bigDesktop:mx-0 flex flex-col-reverse laptop:flex-row gap-4">
            <form
              className="flex flex-col w-full laptop:w-3/4 desktop:w-4/5 gap-4"
              onSubmit={onSubmit}
            >
              <PersonalInformation
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
                updateCustomer={updateCustomer}
                setUpdateCustomer={setUpdateCustomer}
              />
              <DocumentsInformation
                driverLicenseInfo={driverLicenseInfo}
                setDriverLicenseInfo={setDriverLicenseInfo}
                passportInfo={passportInfo}
                setPassportInfo={setPassportInfo}
                idInfo={idInfo}
                setIdInfo={setIdInfo}
                updateDocuments={updateDocuments}
                setUpdateDocuments={setUpdateDocuments}
              />
              <BillingInformation
                billingInfo={billingInfo}
                setBillingInfo={setBillingInfo}
                updateBilling={updateBilling}
                setUpdateBilling={setUpdateBilling}
              />
              <div className="flex flex-col gap-4 w-full h-full bg-white p-4">
                <h1 className="text-3xl text-grayFont font-bold">
                  {u("paymentMethodsTitle")}
                </h1>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                  className="flex gap-8 mt-2 mb-8 overflow-auto"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Cash" id="cash" />
                    <Label htmlFor="cash" className="text-grayFont text-sm">
                      {u("payInCashLabel")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Card" id="card" />
                    <Label htmlFor="card" className="text-grayFont text-sm">
                      {u("creditCardInfoTitle")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Twint" id="twint" />
                    <Label htmlFor="twint" className="text-grayFont text-sm">
                      {u("twintLabel")}
                    </Label>
                  </div>
                </RadioGroup>
                <div className="relative">
                  <div
                    className={`transition-opacity duration-700 ${
                      paymentMethod === "Cash" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {paymentMethod === "Cash" && <CashPayment />}
                  </div>
                  <div
                    className={`transition-opacity duration-700 ${
                      paymentMethod === "Card" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {paymentMethod === "Card" && <CreditCardPayment />}
                  </div>
                </div>
              </div>
              <div className="flex flex-col tablet:flex-row justify-end gap-4 w-full items-start tablet:items-center m-4 mobile:m-0">
                <p className="text-red-500 font-medium">{formErrors}</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex justify-center bg-primary w-[150px] p-3 text-sm font-semibold leading-6 text-white  transition-colors ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-secondary"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex gap-2">
                      <Loader2
                        size={20}
                        className="self-center my-0.5 animate-spin"
                      />
                      {t("bookNow")}
                    </div>
                  ) : (
                    t("bookNow")
                  )}
                </button>
              </div>
            </form>
            <BookingPrice vehicle={vehicle} />
          </div>
        </div>
      </div>
    </>
  );
}
