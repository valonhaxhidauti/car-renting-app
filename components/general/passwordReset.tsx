"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";

export default function PasswordReset() {
  const t = useTranslations("Authenthication");
  const [captcha, setCaptcha] = useState<string | null>();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (captcha) {
      console.log("Captcha verified");
    }
  };

  return (
    <div className="flex flex-col bg-white tablet:flex-row w-full gap-8 ">
      <div className="items-center flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between py-16 px-16">
        <h1 className="text-gray font-bold text-4xl mb-2">
          {t("PasswordReset.Title")}
        </h1>
        <div className="w-20 h-0.5 bg-primary"></div>
        <div className="text-center">
          <p className="text-gray">{t("PasswordReset.Description1")}</p>
          <p className="text-gray">{t("PasswordReset.Description2")}</p>
        </div>
        <form className="flex flex-col gap-4 items-center" onSubmit={onSubmit}>
          <div className="flex flex-col items-center">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray text-center"
            >
              {t("PasswordReset.EmailLabel")}
            </label>
            <div className="mt-2">
              <input
                type="email"
                required
                className="w-96 block rounded-sm border-zinc-300 border p-4 text-gray focus-visible:outline-primary"
              />
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
            {t("PasswordReset.PasswordResetButton")}
          </button>
        </form>
      </div>
    </div>
  );
}
