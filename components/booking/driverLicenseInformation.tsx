import { ChangeEvent, useEffect } from "react";
import { useTranslations } from "next-intl";
import { DriverLicenseInfo } from "@/lib/types";

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

  useEffect(() => {
    const fetchDriverLicenseData = async () => {
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
        data.data.relationships.driverLicence
      ) {
        const driverLicenseData =
          data.data.relationships.driverLicence.attributes;
        setDriverLicenseInfo({
          driverLicenseNumber: driverLicenseData.driver_licence_number || "",
          issuingCountry:
            driverLicenseData.driver_licence_issuing_country || "",
          dateOfIssue:
            driverLicenseData.driver_licence_date_of_issue?.split("T")[0] || "",
          dateOfExpiration:
            driverLicenseData.driver_licence_date_of_expiration?.split(
              "T"
            )[0] || "",
          frontImage: driverLicenseData.driver_licence_front_image || null,
          backImage: driverLicenseData.driver_licence_back_image || null,
        });
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
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("driverLicenseNumberLabel")}
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
            required
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
            required
            onChange={handleDriverLicenseImageChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
    </>
  );
}
