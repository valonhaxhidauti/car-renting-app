import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect } from "react";
import { IdInfo } from "@/lib/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SelectCountries } from "./selectCountries";

interface IdInformationProps {
  idInfo: IdInfo;
  setIdInfo: React.Dispatch<React.SetStateAction<IdInfo>>;
  updateDocuments: boolean;
  errors: { [key: string]: string[] };
}

export default function IdInformation({
  idInfo,
  setIdInfo,
  updateDocuments,
  errors,
}: IdInformationProps) {
  const t = useTranslations("vehiclePayment");
  const locale = useTranslations()("Locale");

  useEffect(() => {
    const fetchIdInfo = async () => {
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
        data.data.relationships.id
      ) {
        const idData = data.data.relationships.id.attributes;

        setIdInfo({
          idNumber: idData.id_number || "",
          issuingCountry: idData.id_issuing_country || "",
          dateOfIssue: idData.id_date_of_issue?.split("T")[0] || "",
          dateOfExpiration: idData.id_date_of_expiration?.split("T")[0] || "",
          frontImage: idData.id_front_image || null,
          backImage: idData.id_back_image || null,
        });
      }
    };

    fetchIdInfo();
  }, [setIdInfo]);

  const handleIdInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdInfo({ ...idInfo, [e.target.name]: e.target.value });
  };

  const handleIdImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setIdInfo({ ...idInfo, [name]: e.target.files[0] });
    }
  };

  const handleCountryChange = (value: string) => {
    setIdInfo({
      ...idInfo,
      issuingCountry: value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
      <div className="relative">
        <Label
          htmlFor="idNr"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("idNumber")} <span className="text-red-500">*</span>
        </Label>
        <input
          type="text"
          id="idNr"
          name="idNumber"
          value={idInfo.idNumber}
          readOnly={!updateDocuments}
          onChange={handleIdInfoChange}
          className={`block mt-2 w-full rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          } ${
            errors.id_number
              ? "outline outline-2 outline-red-500"
              : "border-borderForm border"
          }`}
        />
        {errors.id_number && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.id_number[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Label
          htmlFor="idCountry"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("issuingCountryLabel")} <span className="text-red-500">*</span>
        </Label>
        <SelectCountries
          onChange={handleCountryChange}
          selectedCountryId={idInfo.issuingCountry}
          error={!!errors.id_issuing_country}
          readOnly={!updateDocuments}
        />
        {errors.id_issuing_country && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.id_issuing_country[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Label
          htmlFor="idIssue"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("dateOfIssueLabel")} <span className="text-red-500">*</span>
        </Label>
        <input
          type="date"
          id="idIssue"
          name="dateOfIssue"
          value={idInfo.dateOfIssue}
          readOnly={!updateDocuments}
          onChange={handleIdInfoChange}
          className={`block mt-2 w-full rounded-sm p-3.5 text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          } ${
            errors.id_date_of_issue
              ? "outline outline-2 outline-red-500"
              : "border-borderForm border"
          }`}
        />
        {errors.id_date_of_issue && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.id_date_of_issue[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Label
          htmlFor="idExpiration"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("dateOfExpirationLabel")}
        </Label>
        <input
          type="date"
          id="idExpiration"
          name="dateOfExpiration"
          value={idInfo.dateOfExpiration}
          readOnly={!updateDocuments}
          onChange={handleIdInfoChange}
          className={`block mt-2 w-full rounded-sm p-3.5 text-grayFont focus-visible:outline-primary ${
            updateDocuments ? "bg-white" : "bg-gray-100"
          } ${
            errors.id_date_of_expiration
              ? "outline outline-2 outline-red-500"
              : "border-borderForm border"
          }`}
        />
        {errors.id_date_of_expiration && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.id_date_of_expiration[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Label
          htmlFor="idFrontImg"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("frontImageLabel")} <span className="text-red-500">*</span>
        </Label>
        <Input
          type="file"
          id="idFrontImg"
          name="frontImage"
          disabled={!updateDocuments}
          onChange={handleIdImageChange}
          className={` ${updateDocuments ? "bg-white" : "bg-gray-100"} ${
            errors.id_front_image
              ? "outline outline-2 outline-red-500 border-none"
              : "border-borderForm border"
          }`}
        />
        {errors.id_front_image && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.id_front_image[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Label
          htmlFor="idBackImg"
          className="block text-sm font-medium leading-6 text-grayFont"
        >
          {t("backImageLabel")} <span className="text-red-500">*</span>
        </Label>
        <Input
          type="file"
          id="idBackImg"
          name="backImage"
          disabled={!updateDocuments}
          onChange={handleIdImageChange}
          className={` ${updateDocuments ? "bg-white" : "bg-gray-100"} ${
            errors.id_back_image
              ? "outline outline-2 outline-red-500 border-none"
              : "border-borderForm border"
          }`}
        />
        {errors.id_back_image && (
          <p className="text-red-500 text-sm mt-1 font-medium">
            {errors.id_back_image[0]}
          </p>
        )}
      </div>
    </div>
  );
}
