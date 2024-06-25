"use client";

import { useState, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useFetchedVehicle } from "../hooks/useFetchedVehicle";
import { BreadcrumbExtended, HeadingTitle } from "../common/headingParts";
import BirthdaySelector from "../account/birthdaySelector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";
import BookingPrice from "../common/bookingPrice";
import CreditCardPayment from "./creditCardPayment";
import CashPayment from "./cashPayment";
import RentForm from "../general/rentForm";
import PassportInformation from "../booking/passportInformation";
import { PassportInfo } from "@/lib/types";

export default function VehiclePayment() {
  const t = useTranslations("Account");
  const u = useTranslations("VehicleDetails");
  const locale = useTranslations()("Locale");

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { params } = useCustomSearchParams();
  const vehicleId = params.vehicleId;

  const vehicle = useFetchedVehicle(vehicleId);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [passportInfo, setPassportInfo] = useState<PassportInfo>({
    passportNumber: "",
    issuingCountry: "",
    dateOfIssue: "",
    dateOfExpiration: "",
    frontImage: null,
    backImage: null,
  });

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handlePersonalInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = "https://rent-api.rubik.dev/api/bookings";
    const headers = {
      "Accept-Language": locale,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    };

    const body = new FormData();
    body.append("mileage_type_id", "3");
    body.append("insurance_type_id", "1");
    body.append("pick_up_location_id", "16");
    body.append("drop_off_location_id", "9");
    body.append("car_id", vehicleId);
    body.append("start_date_time", "2114-10-09");
    body.append("end_date_time", "2098-07-28");
    body.append("seat_no", "18");
    body.append("rack_no", "8");
    body.append("navigation_no", "14");
    body.append("update_customer", "1");
    body.append("email", personalInfo.email);
    body.append("first_name", personalInfo.firstName);
    body.append("last_name", personalInfo.lastName);
    body.append("phone", personalInfo.phone);
    body.append("nationality", "et");
    body.append("gender", "o");
    body.append("date_of_birth", "2014-03-10");
    body.append("update_documents", "1");
    body.append("payment_method", paymentMethod);
    if (paymentMethod === "card") {
      body.append("card_number", "2382580946423959");
      body.append("card_expiration_month", "k");
      body.append("card_expiration_year", "9030");
      body.append("card_ccv", "898");
    }
    if (passportInfo.frontImage) {
      body.append("passport_front_image", passportInfo.frontImage);
    }
    if (passportInfo.backImage) {
      body.append("passport_back_image", passportInfo.backImage);
    }
    body.append("passport_number", passportInfo.passportNumber);
    body.append("passport_issuing_country", passportInfo.issuingCountry);
    body.append("passport_date_of_issue", passportInfo.dateOfIssue);
    body.append("passport_date_of_expiration", passportInfo.dateOfExpiration);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      if (response.ok) {
        // Handle successful response
      } else {
        // Handle error response
      }
    } catch (error: any) {
      // Handle fetch error
    }
  };

  return (
    <>
      <HeadingTitle title={u("pageTitle")} />
      <div className="bg-bgSecondary w-full h-full mb-8">
        <div className="max-w-[1440px] pb-16 m-auto w-full">
          <BreadcrumbExtended translations={u} params={params} />
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
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-4 bg-white p-4">
                  <h1 className="text-3xl text-grayFont font-bold">
                    Personal Information
                  </h1>
                  <div className="w-full grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-12 items-end">
                    <div className="relative">
                      <label className="block text-sm font-medium leading-6 text-grayFont">
                        {t("register.nameLabel")}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                        className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-grayFont">
                        {t("register.surnameLabel")}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={personalInfo.lastName}
                        onChange={handlePersonalInfoChange}
                        className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-grayFont">
                        {t("register.emailAddressLabel")}
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          className="block w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-grayFont">
                        {t("register.phoneNumberLabel")}
                      </label>
                      <div className="mt-2">
                        <PhoneInput
                          country={"de"}
                          buttonStyle={{
                            border: "none",
                            background: "white",
                            margin: "2px",
                          }}
                          dropdownStyle={{
                            border: "none",
                            marginTop: "4px",
                            maxWidth: "272px",
                          }}
                          inputProps={{
                            required: true,
                            name: "phone",
                            value: personalInfo.phone,
                            onChange: handlePersonalInfoChange,
                            className:
                              "block w-full border-borderForm border rounded-sm pr-8 pl-12 py-4 text-grayFont focus-visible:outline-primary",
                          }}
                        />
                      </div>
                    </div>
                    <BirthdaySelector />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full bg-white p-4">
                <h1 className="text-3xl text-grayFont font-bold">
                  Payment methods
                </h1>
                <div className="flex gap-8 my-8">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      onChange={handlePaymentMethodChange}
                      checked={paymentMethod === "cash"}
                    />
                    <label className="text-grayFont text-sm" htmlFor="cash">
                      Pay in Cash
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      onChange={handlePaymentMethodChange}
                      checked={paymentMethod === "card"}
                    />
                    <label className="text-grayFont text-sm" htmlFor="card">
                      Credit Card
                    </label>
                  </div>
                </div>
                {paymentMethod === "card" && <CreditCardPayment />}
                {paymentMethod === "cash" && <CashPayment />}
              </div>
              <PassportInformation
                passportInfo={passportInfo}
                setPassportInfo={setPassportInfo}
              />
              <div className="flex justify-end gap-4 w-full bg-white p-4">
                <button
                  type="submit"
                  className="w-full mobile:w-fit transition text-white bg-primary hover:bg-secondary px-16 py-3"
                >
                  Book
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
