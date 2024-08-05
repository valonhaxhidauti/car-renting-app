import { ChangeEvent } from "react";
import { PassportInfo } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SelectCountries } from "./selectCountries";

interface PassportInformationProps {
  passportInfo: PassportInfo;
  setPassportInfo: React.Dispatch<React.SetStateAction<PassportInfo>>;
  updateDocuments: boolean;
  errors: { [key: string]: string[] };
}

export default function PassportInformation({
  passportInfo,
  setPassportInfo,
  updateDocuments,
  errors,
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

  const handleCountryChange = (value: string) => {
    setPassportInfo({
      ...passportInfo,
      issuingCountry: value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
      <div className="relative">
        <Label
          htmlFor="passportNr"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("passportNumber")} <span className="text-red-500">*</span>
        </Label>
        <input
          type="text"
          id="passportNr"
          name="passportNumber"
          value={passportInfo.passportNumber}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          } ${
            errors.passport_number
              ? "outline outline-2 outline-red-500"
              : "border-borderForm border"
          }`}
        />
        {errors.passport_number && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.passport_number[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Label className="block text-sm font-medium leading-6 text-grayFont">
          {t("issuingCountryLabel")} <span className="text-red-500">*</span>
        </Label>
        <SelectCountries
          onChange={handleCountryChange}
          selectedCountryId={passportInfo.issuingCountry}
          error={!!errors.passport_issuing_country}
          readOnly={!updateDocuments}
        />
        {errors.passport_issuing_country && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.passport_issuing_country[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Label
          htmlFor="passportIssue"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("dateOfIssueLabel")} <span className="text-red-500">*</span>
        </Label>
        <input
          type="date"
          id="passportIssue"
          name="dateOfIssue"
          value={passportInfo.dateOfIssue}
          readOnly={!updateDocuments}
          onChange={handlePassportInfoChange}
          className={`block mt-2 w-full rounded-sm p-3.5 text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          } ${
            errors.passport_date_of_issue
              ? "outline outline-2 outline-red-500"
              : "border-borderForm border"
          }`}
        />
        {errors.passport_date_of_issue && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.passport_date_of_issue[0]}
          </p>
        )}
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
          className={`block mt-2 w-full rounded-sm p-3.5 text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          } ${
            errors.passport_date_of_expiration
              ? "outline outline-2 outline-red-500"
              : "border-borderForm border"
          }`}
        />
        {errors.passport_date_of_expiration && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.passport_date_of_expiration[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Label
          htmlFor="passporImage"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("frontImageLabel")} <span className="text-red-500">*</span>
        </Label>
        <Input
          type="file"
          name="passportFrontImage"
          id="passporImage"
          disabled={!updateDocuments}
          onChange={handlePassportImageChange}
          className={` ${updateDocuments ? "bg-white" : "bg-gray-100"} ${
            errors.passport_front_image
              ? "outline outline-2 outline-red-500 border-none"
              : "border-borderForm border"
          }`}
        />
        {errors.passport_front_image && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.passport_front_image[0]}
          </p>
        )}
      </div>
    </div>
  );
}
