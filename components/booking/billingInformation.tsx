import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { BillingInfo } from "@/lib/types";
import { ChangeEvent } from "react";

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

  useEffect(() => {
    const fetchBillingInfo = async () => {
      const url = new URL("https://rent-api.rubik.dev/api/my-profiles");
      const token = localStorage.getItem("token");

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
        setBillingInfo({
          address: billingData.address || "",
          number: billingData.number || "",
          zip: billingData.zip || "",
          street: billingData.street || "",
          city: billingData.city || "",
          country: billingData.country || "",
        });
      }
    };

    fetchBillingInfo();
  }, [setBillingInfo]);

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
        <div className="flex items-center">
          <input
            type="checkbox"
            id="editBillingInfo"
            checked={updateBilling}
            onChange={toggleUpdate}
            className="mr-2"
          />
          <label htmlFor="editBillingInfo" className="text-grayFont text-sm">
            {t("updateBilling")}
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("addressLabel")}
          </label>
          <input
            type="text"
            name="address"
            value={billingInfo.address}
            onChange={handleBillingInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("numberLabel")}
          </label>
          <input
            type="text"
            name="number"
            value={billingInfo.number}
            onChange={handleBillingInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("zipLabel")}
          </label>
          <input
            type="text"
            name="zip"
            value={billingInfo.zip}
            onChange={handleBillingInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("streetLabel")}
          </label>
          <input
            type="text"
            name="street"
            value={billingInfo.street}
            onChange={handleBillingInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("cityLabel")}
          </label>
          <input
            type="text"
            name="city"
            value={billingInfo.city}
            onChange={handleBillingInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("countryLabel")}
          </label>
          <input
            type="text"
            name="country"
            value={billingInfo.country}
            onChange={handleBillingInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
    </div>
  );
}
