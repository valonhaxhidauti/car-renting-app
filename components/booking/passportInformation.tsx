// passportInformation.tsx
import { useEffect, ChangeEvent } from "react";
import { PassportInfo } from "@/lib/types";
import { useTranslations } from "next-intl";

interface PassportInformationProps {
  passportInfo: PassportInfo;
  setPassportInfo: React.Dispatch<React.SetStateAction<PassportInfo>>;
  updateDocuments: boolean;
}

export default function PassportInformation({
  passportInfo,
  setPassportInfo,
  updateDocuments,
}: PassportInformationProps) {
  const t = useTranslations("vehiclePayment");

  const handlePassportInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassportInfo({ ...passportInfo, [e.target.name]: e.target.value });
  };

  const handlePassportImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPassportInfo({ ...passportInfo, frontImage: e.target.files[0] });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("passportNumber")}
        </label>
        <input
          type="text"
          name="passportNumber"
          value={passportInfo.passportNumber}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("issuingCountryLabel")}
        </label>
        <input
          type="text"
          name="issuingCountry"
          value={passportInfo.issuingCountry}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("dateOfIssueLabel")}
        </label>
        <input
          type="date"
          name="dateOfIssue"
          value={passportInfo.dateOfIssue}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-[15px] text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("dateOfExpirationLabel")}
        </label>
        <input
          type="date"
          name="dateOfExpiration"
          value={passportInfo.dateOfExpiration}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-[15px] text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("frontImageLabel")}
        </label>
        <input
          type="file"
          name="passportFrontImage"
          id="passportFrontImage"
          disabled={!updateDocuments}
          required
          onChange={handlePassportImageChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-[13px] text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
    </div>
  );
}
