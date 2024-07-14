import { useState } from "react";
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
            />
          )}
          {selectedInfoType === "id" && (
            <IdInformation idInfo={idInfo} setIdInfo={setIdInfo} />
          )}
        </div>
      </div>
    </div>
  );
}
