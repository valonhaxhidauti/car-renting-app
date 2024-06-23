"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useFetchedVehicle } from "../hooks/useFetchedVehicle";
import { BreadcrumbExtended, HeadingTitle } from "../common/headingParts";
import BirthdaySelector from "../account/birthdaySelector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";
import BookingPrice from "../common/bookingPrice";
import CreditCarrdPayment from "./creditCardPayment";
import CashPayment from "./cashPayment";
import RentForm from "../general/rentForm";

export default function VehiclePayment() {
  const t = useTranslations("Account");
  const u = useTranslations("VehicleDetails");

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { params } = useCustomSearchParams();
  const vehicleId = params.vehicleId;

  const vehicle = useFetchedVehicle(vehicleId);

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
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
            <div className="flex flex-col w-full laptop:w-3/4 desktop:w-4/5 gap-4">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-4 bg-white p-4">
                  <h1 className="text-3xl text-grayFont font-bold">
                    Personal Information
                  </h1>
                  <form className="w-full grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-12 items-end">
                    <div className="relative">
                      <label className="block text-sm font-medium leading-6 text-grayFont">
                        {t("register.nameLabel")}
                      </label>
                      <input
                        type="text"
                        className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-grayFont">
                        {t("register.surnameLabel")}
                      </label>
                      <input
                        type="text"
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
                            className:
                              "block w-full border-borderForm border rounded-sm pr-8 pl-12 py-4 text-grayFont focus-visible:outline-primary",
                          }}
                        />
                      </div>
                    </div>
                    <BirthdaySelector />
                  </form>
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
                {paymentMethod === "card" && <CreditCarrdPayment />}
                {paymentMethod === "cash" && <CashPayment />}
              </div>
            </div>
            <BookingPrice vehicle={vehicle} />
          </div>
        </div>
      </div>
    </>
  );
}
