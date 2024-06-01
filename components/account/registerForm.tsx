"use client";

import {
  RegisterFormValidation,
  isNameValid,
  isEmailValid,
  isPhoneValid,
  isPasswordValid,
  isPasswordMatched,
  isPasswordStrong,
} from "../utils/formValidations";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { RegisterFormValues } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckIcon } from "@/assets/svgs";
import { Loader2, ShieldAlert } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

export default function RegisterForm() {
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
    passwordShortLength: t("validation.passwordShortLength"),
    passwordNoLowercase: t("validation.passwordNoLowercase"),
    passwordNoUppercase: t("validation.passwordNoUppercase"),
    passwordNoNumber: t("validation.passwordNoNumber"),
    passwordNoSpecialChar: t("validation.passwordNoSpecialChar"),
    passwordConfirmRequired: t("validation.passwordConfirmRequired"),
    passwordsNotMatch: t("validation.passwordsNotMatch"),
    errorDuringRegister: t("register.errorDuringRegister"),
    formErrors: t("register.formErrors"),
  };
  // const [authenticated, setAuthenticated] = useState(
  //   localStorage.getItem("authenticated") === "true"
  // );

  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormValues>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    phoneCode: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unprocessedErrorMessage, setUnprocessedErrorMessage] = useState("");
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    fieldName: keyof RegisterFormValues,
    value: string
  ) => {
    if (fieldName === "phone" && phoneInputRef.current) {
      const phoneInputValue = phoneInputRef.current.value;

      const countryCode = phoneInputValue?.split(" ")[0];
      const phoneNumber = phoneInputValue;

      setFormData((prevData) => ({
        ...prevData,
        phoneCode: countryCode,
        [fieldName]: phoneNumber,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = RegisterFormValidation(formData, translations);
    setErrors(errors);
    setFormSubmitted(true);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "https://rent-api.rubik.dev/api/auth/register",
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
              password: formData.password,
              password_confirmation: formData.passwordConfirm,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // setAuthenticated(true);
          localStorage.setItem("authenticated", "true");
          router.push("/");
        } else {
          const errorData = await response.json();
          setUnprocessedErrorMessage(errorData.detail);
        }
      } catch (error) {
        console.error(translations.errorDuringRegister, error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log(translations.formErrors, errors);
    }
  };

  return (
    <div className="flex w-full">
      <div className="items-start flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between mobile:p-16">
        <h1 className="text-grayFont font-bold text-4xl mb-2">
          {t("register.title")}
        </h1>
        <div className="w-20 h-0.5 bg-primary"></div>
        <p className="text-grayFont">{t("register.description")}</p>
        <div className="w-full">
          <div
            className={`text-red-500 font-medium my-2 transition-opacity duration-300 ${
              unprocessedErrorMessage ? "opacity-100" : "opacity-0"
            }`}
          >
            {unprocessedErrorMessage}
          </div>
          <form
            className="grid grid-cols-1 mobile:grid-cols-2 gap-4"
            onSubmit={submitForm}
          >
            <div>
              <div className="mt-2 relative">
                <label className="block text-sm font-medium leading-6 text-grayFont">
                  {t("register.nameLabel")}
                </label>
                <input
                  type="text"
                  className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8${
                    errors.name && " outline outline-2 outline-red-500"
                  }`}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <CheckIcon
                  className={`absolute transition-opacity right-4 bottom-[22px] ${
                    isNameValid(formData.name) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <p
                className={`text-xs p-2 opacity-0 text-red-500 w-full transition-opacity
                ${errors.name && "opacity-100"}`}
              >
                {errors.name}
              </p>
            </div>
            <div>
              <div className="mt-2 relative">
                <label className="block text-sm font-medium leading-6 text-grayFont">
                  {t("register.surnameLabel")}
                </label>
                <input
                  type="text"
                  className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8${
                    errors.surname && " outline outline-2 outline-red-500"
                  }`}
                  value={formData.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                />
                <CheckIcon
                  className={`absolute transition-opacity right-4 bottom-[22px] ${
                    isNameValid(formData.surname) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <p
                className={`text-xs p-2 opacity-0 text-red-500 w-full transition-opacity
                ${errors.surname && "opacity-100"}`}
              >
                {errors.surname}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.emailAddressLabel")}
              </label>
              <div>
                <div className="mt-2 relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8${
                      errors.email && " outline outline-2 outline-red-500"
                    }`}
                  />
                  <CheckIcon
                    className={`absolute transition-opacity right-4 bottom-[22px] ${
                      isEmailValid(formData.email) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
                <p
                  className={`text-xs p-2 opacity-0 text-red-500 w-full transition-opacity
                  ${errors.email && "opacity-100"}`}
                >
                  {errors.email}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.phoneNumberLabel")}
              </label>
              <div className="mt-2 relative">
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
                    required: true,
                    ref: phoneInputRef,
                    className: `block w-full rounded-sm pr-8 pl-12 py-4 text-grayFont focus-visible:outline-primary
                      ${errors.phone && " outline outline-2 outline-red-500"}`,
                  }}
                />
                <CheckIcon
                  className={`absolute transition-opacity right-4 bottom-[22px] ${
                    isPhoneValid(formData.phone) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <p
                className={`text-xs p-2 opacity-0 text-red-500 w-full transition-opacity
                ${errors.phone && "opacity-100"}`}
              >
                {errors.phone}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.passwordLabel")}
              </label>
              <div className="mt-2 relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-9${
                    errors.password && " outline outline-2 outline-red-500"
                  }`}
                />
                {isPasswordStrong(formData.password, translations) &&
                  formSubmitted && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          id="passwordTooltip"
                          className="absolute z-50 cursor-help right-3 bottom-[16px]"
                        >
                          <ShieldAlert
                            size={24}
                            className={`text-primary 
                          ${
                            isPasswordStrong(formData.password, translations)
                              ? "block"
                              : "hidden"
                          }`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary">
                          <p className="text-white">
                            {isPasswordStrong(formData.password, translations)}
                          </p>
                          <TooltipArrow className="fill-primary" />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                <CheckIcon
                  className={`absolute transition-opacity right-4 bottom-[22px] ${
                    isPasswordValid(formData.password)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              </div>
              <p
                className={`text-xs p-2 opacity-0 text-red-500 w-full transition-opacity
                  ${errors.password && "opacity-100"}`}
              >
                {errors.password}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.passwordAgainLabel")}
              </label>
              <div className="mt-2 relative">
                <input
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    handleInputChange("passwordConfirm", e.target.value)
                  }
                  className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8${
                    errors.passwordConfirm &&
                    " outline outline-2 outline-red-500"
                  }`}
                />
                <CheckIcon
                  className={`absolute transition-opacity right-4 bottom-[22px] ${
                    isPasswordMatched(
                      formData.password,
                      formData.passwordConfirm
                    )
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              </div>
              <p
                className={`text-xs p-2 opacity-0 text-red-500 w-full transition-opacity
                  ${errors.passwordConfirm && "opacity-100"}`}
              >
                {errors.passwordConfirm}
              </p>
            </div>
            <div></div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex justify-center bg-primary w-[150px] mobile:w-[200px] p-3 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-secondary"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex gap-2">
                    <Loader2
                      size={20}
                      className="self-center my-0.5 animate-spin"
                    />
                    {t("register.registerButton")}
                  </div>
                ) : (
                  t("register.registerButton")
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
