import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { BillingInfo } from "@/lib/types";
import { ChangeEvent } from "react";

interface BillingInformationProps {
  billingInfo: BillingInfo;
  setBillingInfo: React.Dispatch<React.SetStateAction<BillingInfo>>;
}

export default function BillingInformation({
  billingInfo,
  setBillingInfo,
}: BillingInformationProps) {
  const locale = useTranslations()("Locale");
  const [isEditable, setIsEditable] = useState(false);

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
        if (
          !billingData.address &&
          !billingData.number &&
          !billingData.zip &&
          !billingData.street &&
          !billingData.city
        ) {
          setIsEditable(true);
        }
      } else {
        setIsEditable(true);
      }
    };

    fetchBillingInfo();
  }, [setBillingInfo]);

  const handleBillingInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-grayFont font-bold">
          Billing Information
        </h1>
        {!isEditable && (
          <div
            onClick={toggleEdit}
            className="text-center cursor-pointer bg-primary w-[150px] p-3 text-sm font-semibold hover:bg-secondary leading-6 text-white transition-colors "
          >
            Update Data
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={billingInfo.address}
            onChange={handleBillingInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Number
          </label>
          <input
            type="text"
            name="number"
            value={billingInfo.number}
            onChange={handleBillingInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Zip
          </label>
          <input
            type="text"
            name="zip"
            value={billingInfo.zip}
            onChange={handleBillingInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Street
          </label>
          <input
            type="text"
            name="street"
            value={billingInfo.street}
            onChange={handleBillingInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            City
          </label>
          <input
            type="text"
            name="city"
            value={billingInfo.city}
            onChange={handleBillingInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={billingInfo.country}
            onChange={handleBillingInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
