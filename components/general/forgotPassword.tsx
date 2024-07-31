"use client";

import { useTranslations } from "next-intl";
import { isEmailValid } from "../utils/formValidations";
import { CheckIcon } from "@/assets/svgs";
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import ReCAPTCHA from "react-google-recaptcha";

export default function ForgotPassword() {
  const t = useTranslations("Account");
  const locale = useTranslations()("Locale");

  const translations = {
    emailRequired: t("validation.emailRequired"),
    emailInvalid: t("validation.emailInvalid"),
  };

  const [formData, setFormData] = useState("");
  const [captcha, setCaptcha] = useState<string | null>();
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (captcha && isEmailValidated) {
      try {
        const url = "https://rent-api.rubik.dev/api/auth/forgot-password";
        const headers = {
          "Accept-Language": locale,
          "Content-Type": "application/json",
          Accept: "application/json",
        };
        const body = {
          email: formData,
        };

        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });

        if (response.ok) {
          setEmailSent(true);
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Something went wrong!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
        {emailSent ? (
          <div className="text-center text-green-600">{t("emailSent")}</div>
        ) : (
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col items-center">
              <div>
                <div className="relative">
                  <div className="flex flex-col">
                    <Label htmlFor="email" className="text-grayFont">
                      {t("passwordReset.emailLabel")}
                    </Label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="rounded-sm mt-2 w-[304px]  border-zinc-300 border px-3 py-2 text-grayFont focus-visible:outline-primary"
                    />
                  </div>
                  <CheckIcon
                    className={`absolute transition-opacity right-4 bottom-4 ${
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
        )}
      </div>
    </div>
  );
}
