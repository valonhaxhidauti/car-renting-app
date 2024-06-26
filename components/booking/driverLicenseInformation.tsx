import { DriverLicenseInfo } from "@/lib/types"; 
import { ChangeEvent } from "react";

interface DriverLicenseInformationProps {
  driverLicenseInfo: DriverLicenseInfo;
  setDriverLicenseInfo: React.Dispatch<React.SetStateAction<DriverLicenseInfo>>;
}

export default function DriverLicenseInformation({
  driverLicenseInfo,
  setDriverLicenseInfo,
}: DriverLicenseInformationProps) {
  const handleDriverLicenseInfoChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setDriverLicenseInfo({ ...driverLicenseInfo, [e.target.name]: e.target.value });
  };

  const handleDriverLicenseImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDriverLicenseInfo({ ...driverLicenseInfo, frontImage: e.target.files[0] });
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <h1 className="text-3xl text-grayFont font-bold">Driver License Information</h1>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Driver License Number
          </label>
          <input
            type="text"
            name="driverLicenseNumber"
            value={driverLicenseInfo.driverLicenseNumber}
            onChange={handleDriverLicenseInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Issuing Country
          </label>
          <input
            type="text"
            name="issuingCountry"
            value={driverLicenseInfo.issuingCountry}
            onChange={handleDriverLicenseInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Date of Issue
          </label>
          <input
            type="date"
            name="dateOfIssue"
            value={driverLicenseInfo.dateOfIssue}
            onChange={handleDriverLicenseInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Date of Expiration
          </label>
          <input
            type="date"
            name="dateOfExpiration"
            value={driverLicenseInfo.dateOfExpiration}
            onChange={handleDriverLicenseInfoChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Front Image
          </label>
          <input
            type="file"
            name="driverLicenseFrontImage"
            onChange={handleDriverLicenseImageChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Back Image
          </label>
          <input
            type="file"
            name="driverLicenseBackImage"
            onChange={handleDriverLicenseImageChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
    </div>
  );
}
