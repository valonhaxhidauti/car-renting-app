import { useEffect, useState } from "react";
import { DriverLicenseInfo, IdInfo, PassportInfo } from "@/lib/types";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import DriverLicenseInformation from "./driverLicenseInformation";
import IdInformation from "./idInformation";
import PassportInformation from "./passportInformation";

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

  const handleInfoTypeChange = (value: string) => {
    setSelectedInfoType(value);
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
          <RadioGroup
            value={selectedInfoType}
            onValueChange={handleInfoTypeChange}
            className="flex gap-4 mt-2 mb-8"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="passport" id="passport" />
              <Label htmlFor="passport">{t("passport")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="id" id="id" />
              <Label htmlFor="id">{t("id")}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="relative">
          <div
            className={`transition-opacity duration-700 ease-in-out ${
              selectedInfoType === "passport" ? "opacity-100" : "opacity-0"
            }`}
          >
            {selectedInfoType === "passport" && (
              <PassportInformation
                passportInfo={passportInfo}
                setPassportInfo={setPassportInfo}
                updateDocuments={updateDocuments}
              />
            )}
          </div>
          <div
            className={`transition-opacity duration-700 ease-in-out ${
              selectedInfoType === "id" ? "opacity-100" : "opacity-0"
            }`}
          >
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
    </div>
  );
}
