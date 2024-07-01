import { ChangeEvent, useEffect, useRef } from "react";
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
  const locale = useTranslations()("Locale");

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch(
            "https://rent-api.rubik.dev/api/my-profiles",
            {
              method: "GET",
              headers: {
                "Accept-Language": locale,
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const userProfile = data.data.attributes;

            setPersonalInfo({
              firstName: userProfile.first_name,
              lastName: userProfile.last_name,
              email: userProfile.email,
              phoneCode: userProfile.phone_code || "",
              phone: userProfile.phone,
              dateOfBirth: userProfile.date_of_birth || "",
            });
          } else {
            console.error("Failed to fetch profile data");
          }
        } catch (error) {
          console.error("Error occurred during profile fetch:", error);
        }
      } else {
        console.error("No token found");
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

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <h1 className="text-3xl text-grayFont font-bold">Personal Information</h1>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Phone Number
          </label>
          <div className="mt-2">
            <PhoneInput
              country={"de"}
              value={personalInfo.phoneCode + personalInfo.phone}
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
                className:
                  "block w-full border-borderForm border rounded-sm pr-8 pl-12 py-4 text-grayFont focus-visible:outline-primary",
              }}
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium leading-6 text-grayFont">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={personalInfo.dateOfBirth}
            onChange={handleChange}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
    </div>
  );
}
