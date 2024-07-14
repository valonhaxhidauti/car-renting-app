import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect } from "react";
import { IdInfo } from "@/lib/types";

interface IdInformationProps {
  idInfo: IdInfo;
  setIdInfo: React.Dispatch<React.SetStateAction<IdInfo>>;
}

export default function IdInformation({
  idInfo,
  setIdInfo,
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

  return (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("idNumber")}
        </label>
        <input
          type="text"
          name="idNumber"
          value={idInfo.idNumber}
          onChange={handleIdInfoChange}
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
          value={idInfo.issuingCountry}
          onChange={handleIdInfoChange}
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
          value={idInfo.dateOfIssue}
          onChange={handleIdInfoChange}
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
          value={idInfo.dateOfExpiration}
          onChange={handleIdInfoChange}
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
          required
          onChange={handleIdImageChange}
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
          onChange={handleIdImageChange}
          className="block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary"
        />
      </div>
    </div>
  );
}
