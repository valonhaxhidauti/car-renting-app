import { useAuth } from "../context/authContext";
import { ChangeEvent, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { PersonalInfo } from "@/lib/types";
import { formatDate } from "../utils/formatDate";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

interface PersonalInformationProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  updateCustomer: boolean;
  setUpdateCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PersonalInformation({
  personalInfo,
  setPersonalInfo,
  updateCustomer,
  setUpdateCustomer,
}: PersonalInformationProps) {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("vehiclePayment");
  const locale = useTranslations()("Locale");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
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

        if (data && data.data && data.data.attributes) {
          const userProfile = data.data.attributes;

          setPersonalInfo({
            firstName: userProfile.first_name || "",
            lastName: userProfile.last_name || "",
            email: userProfile.email || "",
            phoneCode: userProfile.phone_code || "",
            phone: userProfile.phone || "",
            dateOfBirth: userProfile.date_of_birth
              ? formatDate(userProfile.date_of_birth)
              : "",
          });
        }
      } else {
        setUpdateCustomer(true);
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

  const toggleUpdate = () => {
    setUpdateCustomer(!updateCustomer);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <div className="flex flex-col mobile:flex-row justify-between gap-2 items-start mobile:items-center">
        <h1 className="text-3xl text-grayFont font-bold">
          {t("personalInfoTitle")}
        </h1>
        {isAuthenticated && (
          <div className="flex items-center">
            <Checkbox
              id="editPersonalInfo"
              checked={updateCustomer}
              onCheckedChange={toggleUpdate}
              className="mr-2"
            />
            <Label
              htmlFor="editPersonalInfo"
              className="cursor-pointer text-grayFont text-sm"
            >
              {t("updateCustomer")}
            </Label>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="relative">
          <Label
            htmlFor="firstname"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("firstNameLabel")}
          </Label>
          <input
            type="text"
            id="firstname"
            name="firstName"
            value={personalInfo.firstName}
            readOnly={!updateCustomer}
            onChange={handleChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateCustomer ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="surname"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("lastNameLabel")}
          </Label>
          <input
            type="text"
            id="surname"
            name="lastName"
            value={personalInfo.lastName}
            readOnly={!updateCustomer}
            onChange={handleChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateCustomer ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("emailLabel")}
          </Label>
          <input
            type="email"
            id="email"
            name="email"
            value={personalInfo.email}
            readOnly={!updateCustomer}
            onChange={handleChange}
            className={`block mt-2 w-full border-borderForm border rounded-sm p-3.5 leading-relaxed text-grayFont focus-visible:outline-primary ${
              updateCustomer ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div className="relative">
          <p className="block text-sm font-medium leading-6 text-grayFont">
            {t("phoneNumberLabel")}
          </p>
          <div className="mt-2">
            <PhoneInput
              country={"de"}
              value={personalInfo.phoneCode + personalInfo.phone}
              onChange={handlePhoneChange}
              disabled={!updateCustomer}
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
          <Label
            htmlFor="birthday"
            className="block text-sm font-medium leading-6 text-grayFont"
          >
            {t("dateOfBirthLabel")}
          </Label>
          <input
            type="date"
            id="birthday"
            name="dateOfBirth"
            value={personalInfo.dateOfBirth}
            readOnly={!updateCustomer}
            onChange={handleChange}
            required
            className={`block mt-2 w-full border-borderForm border rounded-sm p-4 leading-tight text-grayFont focus-visible:outline-primary ${
              updateCustomer ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
