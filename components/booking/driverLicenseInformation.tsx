import { DriverLicenseInfo } from "@/lib/types";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";

interface DriverLicenseInformationProps {
  driverLicenseInfo: DriverLicenseInfo;
  setDriverLicenseInfo: React.Dispatch<React.SetStateAction<DriverLicenseInfo>>;
}

export default function DriverLicenseInformation({
  driverLicenseInfo,
  setDriverLicenseInfo,
}: DriverLicenseInformationProps) {
  const t = useTranslations("vehiclePayment");

  const handleDriverLicenseInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriverLicenseInfo({
      ...driverLicenseInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleDriverLicenseImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setDriverLicenseInfo({ ...driverLicenseInfo, [name]: e.target.files[0] });
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <h1 className="text-3xl text-grayFont font-bold">
        {t("driverLicenseInfo.driverLicenseInfoTitle")}
      </h1>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("driverLicenseInfo.driverLicenseNumberLabel")}
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
            {t("issuingCountryLabel")}
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
            {t("dateOfIssueLabel")}
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
            {t("dateOfExpirationLabel")}
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
            {t("frontImageLabel")}
          </label>
          <input
            type="file"
            name="frontImage"
            onChange={handleDriverLicenseImageChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("backImageLabel")}
          </label>
          <input
            type="file"
            name="backImage"
            onChange={handleDriverLicenseImageChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
    </div>
  );
}
