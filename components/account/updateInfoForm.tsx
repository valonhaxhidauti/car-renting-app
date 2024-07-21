import { formatDate } from "../utils/formatDate";
import { useRef } from "react";
import { UpdateFormValues } from "@/lib/types";
import { UpdateFormValidation } from "../utils/formValidations";
import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

interface UpdateInfoFormProps {
  formData: UpdateFormValues;
  handleInputChange: (fieldName: keyof UpdateFormValues, value: string) => void;
  setSuccessMessage: (message: string) => void;
  setUnprocessedErrorMessage: (message: string) => void;
  errors: Partial<UpdateFormValues>;
  setErrors: (errors: Partial<UpdateFormValues>) => void;
  locale: string;
}

export default function UpdateInfoForm({
  formData,
  handleInputChange,
  setSuccessMessage,
  setUnprocessedErrorMessage,
  errors,
  setErrors,
  locale,
}: UpdateInfoFormProps) {
  const t = useTranslations("Account");

  const translations = {
    nameRequired: t("validation.nameRequired"),
    nameInvalid: t("validation.nameInvalid"),
    surnameRequired: t("validation.surnameRequired"),
    surnameInvalid: t("validation.surnameInvalid"),
    emailRequired: t("validation.emailRequired"),
    emailInvalid: t("validation.emailInvalid"),
    phoneRequired: t("validation.phoneRequired"),
    phoneInvalid: t("validation.phoneInvalid"),
  };
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = UpdateFormValidation(formData, translations);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const token = localStorage.getItem("token");

        const formattedBirthday = formData.birthday
          ? formatDate(formData.birthday)
          : "";

        const response = await fetch(
          "https://rent-api.rubik.dev/api/my-profiles",
          {
            method: "PUT",
            headers: {
              "Accept-Language": locale,
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              first_name: formData.name,
              last_name: formData.surname,
              email: formData.email,
              phone: formData.phone,
              date_of_birth: formattedBirthday,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage(t("userUpdated"));
        } else {
          const errorData = await response.json();
          setUnprocessedErrorMessage(errorData.detail);
        }
      } catch (error) {
        console.error("Error occurred during update:", error);
      }
    } else {
      console.log("Form not submitted due to errors:", errors);
    }
  };

  return (
    <form
      className="w-full desktop:w-3/4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8 items-start"
      onSubmit={submitForm}
    >
      <div>
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.nameLabel")}
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`block mt-2 w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary 
          ${
            errors.name
              ? " outline outline-2 outline-red-500"
              : "border-borderForm border"
          }`}
          />
          {errors.name && (
            <p className="text-xs p-2 text-red-500">{errors.name}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.surnameLabel")}
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => handleInputChange("surname", e.target.value)}
            className={`block mt-2 w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary 
              ${
                errors.name
                  ? " outline outline-2 outline-red-500"
                  : "border-borderForm border"
              }`}
          />
          {errors.surname && (
            <p className="text-xs p-2 text-red-500">{errors.surname}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.emailAddressLabel")}
        </label>
        <div className="relative">
          <input
            type="email"
            value={formData.email}
            disabled
            className="block mt-2 w-full cursor-not-allowed border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.phoneNumberLabel")}
        </label>
        <div className="relative">
          <PhoneInput
            country={"de"}
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
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
              ref: phoneInputRef,
              className: `block w-full rounded-sm pr-8 pl-12 py-[17px] text-grayFont focus-visible:outline-primary
              ${
                errors.name
                  ? " outline outline-2 outline-red-500"
                  : "border-borderForm border"
              }`,
            }}
          />
          {errors.phone && (
            <p className="text-xs p-2 text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("birthdaySelect.label")}
        </label>
        <input
          type="date"
          value={formData.birthday}
          onChange={(e) => handleInputChange("birthday", e.target.value)}
          className="block w-full border-borderForm border rounded-sm p-4 leading-snug text-grayFont focus-visible:outline-primary pr-8"
        />
      </div>
      <div className="col-span-1 tablet:col-span-2 laptop:col-span-3 flex justify-end ">
        <button
          type="submit"
          className="flex w-full mobile:w-auto justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary transition focus-visible:outline-primary"
        >
          {t("update")}
        </button>
      </div>
    </form>
  );
}
