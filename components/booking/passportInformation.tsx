import { ChangeEvent } from "react";
import { PassportInfo } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
        <Label
          htmlFor="passportNr"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("passportNumber")}
        </Label>
        <input
          type="text"
          id="passportNr"
          name="passportNumber"
          value={passportInfo.passportNumber}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
      <div className="relative">
        <Label
          htmlFor="passportCountry"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("issuingCountryLabel")}
        </Label>
        <input
          type="text"
          id="passportCountry"
          name="issuingCountry"
          value={passportInfo.issuingCountry}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
      <div className="relative">
        <Label
          htmlFor="passportIssue"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("dateOfIssueLabel")}
        </Label>
        <input
          type="date"
          id="passportIssue"
          name="dateOfIssue"
          value={passportInfo.dateOfIssue}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
      <div className="relative">
        <Label
          htmlFor="passportExpiration"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("dateOfExpirationLabel")}
        </Label>
        <input
          type="date"
          id="passportExpiration"
          name="dateOfExpiration"
          value={passportInfo.dateOfExpiration}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>
      <div className="relative">
        <Label
          htmlFor="passporImage"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("frontImageLabel")}
        </Label>
        <Input
          type="file"
          name="passportFrontImage"
          id="passporImage"
          disabled={!updateDocuments}
          required
          onChange={handlePassportImageChange}
          className={`${updateDocuments ? "bg-white" : "bg-gray-100"}`}
        />
      </div>
    </div>
  );
}
