import { useAuth } from "../context/authContext";
import { ChangeEvent, useEffect } from "react";
import { useTranslations } from "next-intl";
import { DriverLicenseInfo } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DriverLicenseInformationProps {
  driverLicenseInfo: DriverLicenseInfo;
  setDriverLicenseInfo: React.Dispatch<React.SetStateAction<DriverLicenseInfo>>;
  updateDocuments: boolean;
  setUpdateDocuments: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DriverLicenseInformation({
  driverLicenseInfo,
  setDriverLicenseInfo,
  updateDocuments,
  setUpdateDocuments,
}: DriverLicenseInformationProps) {
  const t = useTranslations("vehiclePayment");
  const locale = useTranslations()("Locale");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchDriverLicenseData = async () => {
      const url = new URL("https://rent-api.rubik.dev/api/my-profiles");
      const token = localStorage.getItem("token");

      if (isAuthenticated) {
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
          data.data.relationships.driverLicence
        ) {
          const driverLicenseData =
            data.data.relationships.driverLicence.attributes;
          setDriverLicenseInfo({
            driverLicenseNumber: driverLicenseData.driver_licence_number || "",
            issuingCountry:
              driverLicenseData.driver_licence_issuing_country || "",
            dateOfIssue:
              driverLicenseData.driver_licence_date_of_issue?.split("T")[0] ||
              "",
            dateOfExpiration:
              driverLicenseData.driver_licence_date_of_expiration?.split(
                "T"
              )[0] || "",
            frontImage: driverLicenseData.driver_licence_front_image || null,
            backImage: driverLicenseData.driver_licence_back_image || null,
          });
        }
      } else {
        setUpdateDocuments(true);
      }
    };

    fetchDriverLicenseData();
  }, [locale, setDriverLicenseInfo]);

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

  const toggleUpdate = () => {
    setUpdateDocuments(!updateDocuments);
  };

  return (
    <>
      <div className="flex flex-col mobile:flex-row justify-between gap-2 items-start mobile:items-center">
        <h1 className="text-3xl text-grayFont font-bold">
          {t("driverLicenseInfoTitle")}
        </h1>
        {isAuthenticated && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="editDocuments"
              checked={updateDocuments}
              onChange={toggleUpdate}
              className="mr-2"
            />
            <label htmlFor="editDocuments" className="text-grayFont text-sm">
              {t("updateDocuments")}
            </label>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <Label
            htmlFor="driverLicenseNr"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("driverLicenseNumberLabel")}
          </Label>
          <input
            type="text"
            id="driverLicenseNr"
            name="driverLicenseNumber"
            value={driverLicenseInfo.driverLicenseNumber}
            readOnly={!updateDocuments}
            onChange={handleDriverLicenseInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateDocuments ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="driverCountry"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("issuingCountryLabel")}
          </Label>
          <input
            type="text"
            id="driverCountry"
            name="issuingCountry"
            value={driverLicenseInfo.issuingCountry}
            readOnly={!updateDocuments}
            onChange={handleDriverLicenseInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateDocuments ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="driverIssue"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("dateOfIssueLabel")}
          </Label>
          <input
            type="date"
            id="driverIssue"
            name="dateOfIssue"
            value={driverLicenseInfo.dateOfIssue}
            readOnly={!updateDocuments}
            onChange={handleDriverLicenseInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 leading-tight text-grayFont focus-visible:outline-primary ${
              updateDocuments ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="driverExpiration"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("dateOfExpirationLabel")}
          </Label>
          <input
            type="date"
            id="driverExpiration"
            name="dateOfExpiration"
            value={driverLicenseInfo.dateOfExpiration}
            readOnly={!updateDocuments}
            onChange={handleDriverLicenseInfoChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 leading-tight text-grayFont focus-visible:outline-primary ${
              updateDocuments ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="driversFrontImage"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("frontImageLabel")}
          </Label>
          <Input
            id="driversFrontImage"
            name="frontImage"
            type="file"
            onChange={handleDriverLicenseImageChange}
            disabled={!updateDocuments}
            required
            className={` ${updateDocuments ? "bg-white" : "bg-gray-100"}`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="driversBackImage"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("backImageLabel")}
          </Label>
          <Input
            id="driversBackImage"
            name="backImage"
            type="file"
            onChange={handleDriverLicenseImageChange}
            disabled={!updateDocuments}
            required
            className={` ${updateDocuments ? "bg-white" : "bg-gray-100"}`}
          />
        </div>
      </div>
    </>
  );
}
