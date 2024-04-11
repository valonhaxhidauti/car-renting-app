"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckIcon } from "@/assets/svgs";
import { isEmailValid } from "../utils/formValidations";

export default function PasswordReset() {
  const t = useTranslations("Account");
  const translations = {
    emailRequired: t("validation.emailRequired"),
    emailInvalid: t("validation.emailInvalid"),
  };

  const [formData, setFormData] = useState("");
  const [captcha, setCaptcha] = useState<string | null>();
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (captcha && isEmailValidated) {
      console.log("Form submitted:", formData);
    }
  };

  const handleInputChange = (value: string) => {
    setFormData(value);
    setIsEmailValidated(isEmailValid(value));
  };

  return (
    <div className="flex flex-col bg-white tablet:flex-row w-full gap-8 ">
      <div className="items-center flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between py-16">
        <h1 className="text-grayFont text-center font-bold text-4xl mb-2">
          {t("passwordReset.title")}
        </h1>
        <div className="w-20 h-0.5 bg-primary"></div>
        <div className="text-center">
          <p className="text-grayFont">{t("passwordReset.description1")}</p>
          <p className="text-grayFont">{t("passwordReset.description2")}</p>
        </div>
        <form className="flex flex-col gap-4 items-center" onSubmit={onSubmit}>
          <div className="flex flex-col items-center">
            <div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-grayFont text-center"
                >
                  {t("passwordReset.emailLabel")}
                </label>
                <input
                  type="email"
                  required
                  value={formData}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="block rounded-sm mt-2 mobile:w-96 border-zinc-300 border px-6 py-4 mobile:px-8 text-grayFont focus-visible:outline-primary"
                />
                <CheckIcon
                  className={`absolute transition-opacity right-4 bottom-[22px] ${
                    isEmailValidated && formData !== ""
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              </div>
            </div>
          </div>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={setCaptcha}
          />
          <button
            type="submit"
            className="flex justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
          >
            {t("passwordReset.passwordResetButton")}
          </button>
        </form>
      </div>
    </div>
  );
}
