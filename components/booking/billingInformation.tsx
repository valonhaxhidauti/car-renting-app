import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { BillingInfo } from "@/lib/types";
import { ChangeEvent } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface BillingInformationProps {
  billingInfo: BillingInfo;
  setBillingInfo: React.Dispatch<React.SetStateAction<BillingInfo>>;
  updateBilling: boolean;
  setUpdateBilling: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BillingInformation({
  billingInfo,
  setBillingInfo,
  updateBilling,
  setUpdateBilling,
}: BillingInformationProps) {
  const t = useTranslations("vehiclePayment");
  const locale = useTranslations()("Locale");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBillingInfo = async () => {
      const url = new URL("https://rent-api.rubik.dev/api/my-profiles");
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
            address: billingData.address || "",
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
            htmlFor="billingAddress"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("addressLabel")}
          </Label>
          <input
            type="text"
            id="billingAddress"
            name="address"
            value={billingInfo.address}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="billingNumber"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("numberLabel")}
          </Label>
          <input
            type="text"
            id="billingNumber"
            name="number"
            value={billingInfo.number}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="zipCode"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("zipLabel")}
          </Label>
          <input
            type="text"
            id="zipCode"
            name="zip"
            value={billingInfo.zip}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="streetAddress"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("streetLabel")}
          </Label>
          <input
            type="text"
            id="streetAddress"
            name="street"
            value={billingInfo.street}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="billingCity"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("cityLabel")}
          </Label>
          <input
            type="text"
            id="billingCity"
            name="city"
            value={billingInfo.city}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="billingCountry"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("countryLabel")}
          </Label>
          <input
            type="text"
            id="billingCountry"
            name="country"
            value={billingInfo.country}
            readOnly={!updateBilling}
            onChange={handleBillingInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateBilling ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
