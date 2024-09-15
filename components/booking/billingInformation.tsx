import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { BillingInfo } from "@/lib/types";
import { ChangeEvent } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { SelectCountries } from "./selectCountries";

interface BillingInformationProps {
  billingInfo: BillingInfo;
  setBillingInfo: React.Dispatch<React.SetStateAction<BillingInfo>>;
  updateBilling: boolean;
  setUpdateBilling: React.Dispatch<React.SetStateAction<boolean>>;
  errors: { [key: string]: string[] };
}

export default function BillingInformation({
  billingInfo,
  setBillingInfo,
  updateBilling,
  setUpdateBilling,
  errors,
}: BillingInformationProps) {
  const t = useTranslations("vehiclePayment");
  const locale = useTranslations()("Locale");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBillingInfo = async () => {
      const url = new URL(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/my-profiles");
      const token = localStorage.getItem("token");

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Accept-Language": locale,
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        const data = await response.json();

        if (
          data &&
          data.data &&
          data.data.relationships &&
          data.data.relationships.billingAddress
        ) {
          const billingData = data.data.relationships.billingAddress.attributes;
          const updatedBillingInfo = {
            number: billingData.number || "",
            zip: billingData.zip || "",
            street: billingData.street || "",
            city: billingData.city || "",
            country: billingData.country || "",
          };

          setBillingInfo(updatedBillingInfo);

          const isAnyFieldEmpty = Object.values(updatedBillingInfo).some(
            (value) => !value
          );
          if (isAnyFieldEmpty) {
            setUpdateBilling(true);
          }
        }
      } else {
        setUpdateBilling(true);
      }
    };

    fetchBillingInfo();
  }, [setBillingInfo, setUpdateBilling]);

  const handleBillingInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const toggleUpdate = () => {
    setUpdateBilling(!updateBilling);
  };

  const handleCountryChange = (value: string) => {
    setBillingInfo({
      ...billingInfo,
      country: value,
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <div className="flex flex-col mobile:flex-row justify-between gap-2 items-start mobile:items-center">
        <h1 className="text-3xl text-grayFont font-bold">
          {t("billingInfoTitle")}
        </h1>
        {isAuthenticated && (
          <div className="flex items-center">
            <Checkbox
              id="editBillingInfo"
              checked={updateBilling}
              onCheckedChange={toggleUpdate}
              className="mr-2"
            />
            <Label
              htmlFor="editBillingInfo"
              className="cursor-pointer text-grayFont text-sm"
            >
              {t("updateBilling")}
            </Label>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <Label
            htmlFor="billingNumber"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("numberLabel")} <span className="text-red-500">*</span>
          </Label>
          <input
            type="text"
            id="billingNumber"
            name="number"
            value={billingInfo.number}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            } ${
              errors.number
                ? "outline outline-2 outline-red-500"
                : "border-borderForm border"
            }`}
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1 font-medium">
              {errors.number[0]}
            </p>
          )}
        </div>
        <div className="relative">
          <Label
            htmlFor="zipCode"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("zipLabel")} <span className="text-red-500">*</span>
          </Label>
          <input
            type="text"
            id="zipCode"
            name="zip"
            value={billingInfo.zip}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            } ${
              errors.zip
                ? "outline outline-2 outline-red-500"
                : "border-borderForm border"
            }`}
          />
          {errors.zip && (
            <p className="text-red-500 text-sm mt-1 font-medium">
              {errors.zip[0]}
            </p>
          )}
        </div>
        <div className="relative">
          <Label
            htmlFor="streetAddress"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("streetLabel")} <span className="text-red-500">*</span>
          </Label>
          <input
            type="text"
            id="streetAddress"
            name="street"
            value={billingInfo.street}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            } ${
              errors.street
                ? "outline outline-2 outline-red-500"
                : "border-borderForm border"
            }`}
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1 font-medium">
              {errors.street[0]}
            </p>
          )}
        </div>
        <div className="relative">
          <Label
            htmlFor="billingCity"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("cityLabel")} <span className="text-red-500">*</span>
          </Label>
          <input
            type="text"
            id="billingCity"
            name="city"
            value={billingInfo.city}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            } ${
              errors.city
                ? "outline outline-2 outline-red-500"
                : "border-borderForm border"
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1 font-medium">
              {errors.city[0]}
            </p>
          )}
        </div>
        <div className="relative">
          <Label className="block text-sm font-medium leading-6 text-grayFont">
            {t("countryLabel")} <span className="text-red-500">*</span>
          </Label>
          <SelectCountries
            selectedCountryId={billingInfo.country}
            onChange={handleCountryChange}
            error={!!errors.driver_licence_issuing_country}
            readOnly={!updateBilling}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1 font-medium">
              {errors.country[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
