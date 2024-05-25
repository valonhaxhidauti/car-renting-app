import { CheckIcon, FlagUkIcon } from "@/assets/svgs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BirthdaySelector from "@/components/account/birthdaySelector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";
import { UpdateFormValues } from "@/lib/types";
import { UpdateFormValidation } from "../utils/formValidations";

export default function UpdateInfoForm() {
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
    passwordRequired: t("validation.passwordRequired"),
    passwordWeak: t("validation.passwordWeak"),
    passwordConfirmRequired: t("validation.passwordConfirmRequired"),
    passwordsNotMatch: t("validation.passwordsNotMatch"),
  };
  const [errors, setErrors] = useState<Partial<UpdateFormValues>>({});

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState<UpdateFormValues>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    phoneCode: "",
    birthday: "",
    password: "",
  });

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = UpdateFormValidation(formData, translations);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          "",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              first_name: formData.name,
              last_name: formData.surname,
              email: formData.email,
              phone_code: formData.phoneCode,
              phone: formData.phone,
              birthday: formData.birthday,
              password: formData.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("User updated successfully:", data);
        } else {
          const errorData = await response.json();
          console.error("Update failed:", errorData);
          alert("Update failed!");
        }
      } catch (error) {
        console.error("Error occurred during update:", error);
      }
    } else {
      console.log("Form not submitted due to errors:", errors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <form
      className="w-full desktop:w-3/4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-12 items-end"
      onSubmit={submitForm}
    >
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.nameLabel")}
        </label>
        <input
          type="text"
          className={`block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary 
          ${errors.name && " outline outline-2 outline-red-500"}`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.surnameLabel")}
        </label>
        <input
          type="text"
          className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.emailAddressLabel")}
        </label>
        <div className="mt-2">
          <input
            type="email"
            className="block w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.phoneNumberLabel")}
        </label>
        <div className="mt-2">
          <PhoneInput
            country={"de"}
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
              className:
                "block w-full border-borderForm border rounded-sm pr-8 pl-12 py-4 text-grayFont focus-visible:outline-primary",
            }}
          />
        </div>
      </div>
      <BirthdaySelector />
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.passwordLabel")}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          required
          onChange={handlePasswordChange}
          className="block w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-28"
        />
        {password && (
          <div className="flex gap-2 items-center absolute right-4 bottom-[20px]">
            <p
              className="text-primary text-sm cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {t("viewPassword")}
            </p>
            {/* <CheckIcon /> */}
          </div>
        )}
      </div>
      <div className="hidden laptop:block"></div>
      <div className="hidden laptop:block"></div>
      <div className="laptop:justify-self-end">
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
