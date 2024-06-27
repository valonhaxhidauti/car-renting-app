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
  const handleBillingInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <h1 className="text-3xl text-grayFont font-bold">Billing Information</h1>
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
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
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
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
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
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
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
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
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
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
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
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
    </div>
  );
}
