import { useEffect, ChangeEvent } from "react";
import { PassportInfo } from "@/lib/types";
import { useTranslations } from "next-intl";

interface PassportInformationProps {
  passportInfo: PassportInfo;
  setPassportInfo: React.Dispatch<React.SetStateAction<PassportInfo>>;
}

export default function PassportInformation({
  passportInfo,
  setPassportInfo,
}: PassportInformationProps) {
  const t = useTranslations("vehiclePayment");
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
      }
    };

    fetchPassportData();
  }, [locale, setPassportInfo]);

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
          onChange={handlePassportInfoChange}
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
          value={passportInfo.issuingCountry}
          onChange={handlePassportInfoChange}
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
          value={passportInfo.dateOfIssue}
          onChange={handlePassportInfoChange}
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
          value={passportInfo.dateOfExpiration}
          onChange={handlePassportInfoChange}
          className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
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
          required
          onChange={handlePassportImageChange}
          className="block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary"
        />
      </div>
    </div>
  );
}
