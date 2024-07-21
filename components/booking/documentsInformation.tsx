// documentsInformation.tsx
import { useEffect, useState } from "react";
import { DriverLicenseInfo, IdInfo, PassportInfo } from "@/lib/types";
import DriverLicenseInformation from "./driverLicenseInformation";
import IdInformation from "./idInformation";
import PassportInformation from "./passportInformation";
import { useTranslations } from "next-intl";

interface DocumentsInformationProps {
  driverLicenseInfo: DriverLicenseInfo;
  setDriverLicenseInfo: React.Dispatch<React.SetStateAction<DriverLicenseInfo>>;
  passportInfo: PassportInfo;
  setPassportInfo: React.Dispatch<React.SetStateAction<PassportInfo>>;
  idInfo: IdInfo;
  setIdInfo: React.Dispatch<React.SetStateAction<IdInfo>>;
  updateDocuments: boolean;
  setUpdateDocuments: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DocumentsInformation({
  driverLicenseInfo,
  setDriverLicenseInfo,
  passportInfo,
  setPassportInfo,
  idInfo,
  setIdInfo,
  updateDocuments,
  setUpdateDocuments,
}: DocumentsInformationProps) {
  const t = useTranslations("vehiclePayment");

  const [selectedInfoType, setSelectedInfoType] = useState("passport");
  const locale = useTranslations()("Locale");

  useEffect(() => {
    const fetchPassportData = async () => {
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
        data.data.relationships.passport
      ) {
        const passportData = data.data.relationships.passport.attributes;

        setPassportInfo({
          passportNumber: passportData.passport_number || "",
          issuingCountry: passportData.passport_issuing_country || "",
          dateOfIssue: passportData.passport_date_of_issue?.split("T")[0] || "",
          dateOfExpiration:
            passportData.passport_date_of_expiration?.split("T")[0] || "",
          frontImage: passportData.passport_front_image || null,
        });

        if (passportData.passport_number) {
          setSelectedInfoType("passport");
        } else {
          setSelectedInfoType("id");
        }
      }
    };

    fetchPassportData();
  }, [locale, setPassportInfo]);

  const handleInfoTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedInfoType(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <DriverLicenseInformation
        driverLicenseInfo={driverLicenseInfo}
        setDriverLicenseInfo={setDriverLicenseInfo}
        updateDocuments={updateDocuments}
        setUpdateDocuments={setUpdateDocuments}
      />
      <div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-medium text-grayFont">
              {t("chooseDocument")}
            </h2>
          </div>
          <div className="flex gap-4 mt-2 mb-8">
            <label className="flex gap-2">
              <input
                type="radio"
                value="passport"
                checked={selectedInfoType === "passport"}
                onChange={handleInfoTypeChange}
              />
              {t("passport")}
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                value="id"
                checked={selectedInfoType === "id"}
                onChange={handleInfoTypeChange}
              />
              {t("id")}
            </label>
          </div>
        </div>

        <div>
          {selectedInfoType === "passport" && (
            <PassportInformation
              passportInfo={passportInfo}
              setPassportInfo={setPassportInfo}
              updateDocuments={updateDocuments}
            />
          )}
          {selectedInfoType === "id" && (
            <IdInformation
              idInfo={idInfo}
              setIdInfo={setIdInfo}
              updateDocuments={updateDocuments}
            />
          )}
        </div>
      </div>
    </div>
  );
}
