import { useEffect, useState, ChangeEvent } from "react";
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
  const [isEditable, setIsEditable] = useState(false);
  const locale = useTranslations()("Locale");
  // const [photoUrl, setPhotoUrl] = useState("");
  // const [photoFile, setPhotoFile] = useState<File | null>(null);

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

        // if (passportData.passport_front_image) {
        //   const photoFileUrl = `https://rent-api.rubik.dev/storage/${passportData.passport_front_image}`;
        //   setPhotoUrl(photoFileUrl);

        //   const response = await fetch(photoFileUrl);
        //   const blob = await response.blob();
        //   const file = new File([blob], "passport_front_image.jpg", {
        //     type: blob.type,
        //   });
        //   setPhotoFile(file);
        // }

        if (
          !passportData.passport_number &&
          !passportData.passport_issuing_country &&
          !passportData.passport_date_of_issue &&
          !passportData.passport_date_of_expiration &&
          !passportData.passport_front_image
        ) {
          setIsEditable(true);
        }
      } else {
        setIsEditable(true);
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
      // setPhotoFile(e.target.files[0]);
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-grayFont font-bold">
          Passport Information
        </h1>
        {!isEditable && (
          <div
            onClick={toggleEdit}
            className="text-center cursor-pointer bg-primary w-[150px] p-3 text-sm font-semibold hover:bg-secondary leading-6 text-white transition-colors "
          >
            Update Data
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Passport Number
          </label>
          <input
            type="text"
            name="passportNumber"
            value={passportInfo.passportNumber}
            onChange={handlePassportInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Issuing Country
          </label>
          <input
            type="text"
            name="issuingCountry"
            value={passportInfo.issuingCountry}
            onChange={handlePassportInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Date of Issue
          </label>
          <input
            type="date"
            name="dateOfIssue"
            value={passportInfo.dateOfIssue}
            onChange={handlePassportInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Date of Expiration
          </label>
          <input
            type="date"
            name="dateOfExpiration"
            value={passportInfo.dateOfExpiration}
            onChange={handlePassportInfoChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          {/* {photoUrl && (
            <img
              src={photoUrl}
              alt="Current passport front image"
              width={100}
              height={100}
              className="mt-2"
            />
          )} */}
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Front Image
          </label>
          <input
            type="file"
            name="passportFrontImage"
            id="passportFrontImage"
            onChange={handlePassportImageChange}
            disabled={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
