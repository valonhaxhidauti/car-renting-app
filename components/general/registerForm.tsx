"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import {
  RegisterFormValidation,
  RegisterFormValues,
  isNameValid,
  isEmailValid,
  isPhoneValid,
  isPasswordValid,
  isPasswordMatched,
} from "../utils/formValidations";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ChevronDown } from "lucide-react";
import { CheckIcon, FlagUkIcon } from "@/assets/svgs";

interface FormValues {
  salutation: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

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
    passwordConfirmRequired: t("validation.passwordConfirmRequired"),
    passwordsNotMatch: t("validation.passwordsNotMatch"),
  };

  const [formData, setFormData] = useState<FormValues>({
    salutation: "mr",
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({});

  const handleInputChange = (fieldName: keyof FormValues, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = RegisterFormValidation(formData, translations);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form not submitted due to errors:", errors);
    }
  };

  const handleSalutationChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      salutation: value,
    }));
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
          <form
            className="grid grid-cols-1 mobile:grid-cols-2 gap-4"
            onSubmit={submitForm}
          >
            <div className="flex gap-4 w-full">
              <RadioGroup
                className="flex w-full"
                defaultValue="mr"
                onValueChange={(value: string) => handleSalutationChange(value)}
              >
                <div className="w-full">
                  <Label
                    htmlFor="r1"
                    className="bg-white p-4 flex rounded-sm gap-4 w-full hover:shadow-btnShadow cursor-pointer"
                  >
                    <RadioGroupItem value="mr" id="r1" />
                    {t("register.mrLabel")}
                  </Label>
                </div>
                <div className="w-full">
                  <Label
                    htmlFor="r2"
                    className="bg-white p-4 flex rounded-sm gap-4 w-full hover:shadow-btnShadow cursor-pointer"
                  >
                    <RadioGroupItem value="mrs" id="r2" />
                    {t("register.mrsLabel")}
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div></div>
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
              <div className="mt-2 flex gap-2 relative">
                <Select>
                  <SelectTrigger className="bg-white border-none rounded-sm h-[56px] w-fit flex gap-2">
                    <FlagUkIcon />
                    <ChevronDown size={12} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>country</SelectLabel>
                      <SelectItem value="en">eng</SelectItem>
                      <SelectItem value="de">de</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8${
                    errors.phone && " outline outline-2 outline-red-500"
                  }`}
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
                    className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8${
                      errors.password && " outline outline-2 outline-red-500"
                    }`}
                  />
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
            </div>
            <div>
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
            </div>
            <div></div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex justify-center bg-primary w-[150px] mobile:w-[200px] p-3 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline-primary"
              >
                {t("register.registerButton")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
