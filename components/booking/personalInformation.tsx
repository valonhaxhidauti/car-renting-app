import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { PersonalInfo } from "@/lib/types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

interface PersonalInformationProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
}

export default function PersonalInformation({
  personalInfo,
  setPersonalInfo,
}: PersonalInformationProps) {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("vehiclePayment.personalInfo");
  const locale = useTranslations()("Locale");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
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

      if (data && data.data && data.data.attributes) {
        const userProfile = data.data.attributes;

        setPersonalInfo({
          firstName: userProfile.first_name || "",
          lastName: userProfile.last_name || "",
          email: userProfile.email || "",
          phoneCode: userProfile.phone_code || "",
          phone: userProfile.phone || "",
          dateOfBirth: userProfile.date_of_birth || "",
        });

        if (
          !userProfile.first_name &&
          !userProfile.last_name &&
          !userProfile.email &&
          !userProfile.phone &&
          !userProfile.date_of_birth
        ) {
          setIsEditable(true);
        }
      } else {
        setIsEditable(true);
      }
    };

    fetchProfileData();
  }, [locale, setPersonalInfo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    if (phoneInputRef.current) {
      const phoneInputValue = phoneInputRef.current.value;

      const countryCode = phoneInputValue?.split(" ")[0];
      const phoneNumber = phoneInputRef.current.value
        .replace(countryCode, "")
        .trim();

      setPersonalInfo((prevInfo) => ({
        ...prevInfo,
        phoneCode: countryCode.replace(/\+/g, ""),
        phone: phoneNumber,
      }));
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-grayFont font-bold">
          {t("personalInfoTitle")}
        </h1>
        {!isEditable && (
          <div
            onClick={toggleEdit}
            className="text-center cursor-pointer bg-primary w-[150px] p-3 text-sm font-semibold hover:bg-secondary leading-6 text-white transition-colors "
          >
            {t("updateDataButton")}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("firstNameLabel")}
          </label>
          <input
            type="text"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("lastNameLabel")}
          </label>
          <input
            type="text"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("emailLabel")}
          </label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("phoneNumberLabel")}
          </label>
          <div className="mt-2">
            <PhoneInput
              country={"de"}
              value={personalInfo.phoneCode + personalInfo.phone}
              disabled={!isEditable}
              onChange={handlePhoneChange}
              buttonStyle={{
                border: "none",
                background: "white",
                margin: "2px",
              }}
              dropdownStyle={{
                border: "none",
                marginTop: "4px",
                maxWidth: "272px",
              }}
              inputProps={{
                required: true,
                ref: phoneInputRef,
                className: `block w-full border-borderForm border rounded-sm pr-8 pl-12 py-4 text-grayFont focus-visible:outline-primary ${
                  isEditable ? "" : "bg-gray-100"
                }`,
              }}
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            {t("dateOfBirthLabel")}
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={personalInfo.dateOfBirth}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary ${
              isEditable ? "" : "bg-gray-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
