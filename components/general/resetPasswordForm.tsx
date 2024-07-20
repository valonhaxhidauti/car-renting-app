"use client";

import {
  ResetPasswordValidation,
  isPasswordMatched,
  isPasswordValid,
} from "../utils/formValidations";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Breadcrumbs } from "../common/headingParts";
import { useTranslations } from "next-intl";
import { ResetPasswordValues } from "@/lib/types";
import { CheckIcon } from "@/assets/svgs";

export default function ResetPasswordForm({
  params,
}: {
  params: { token: string };
}) {
  const t = useTranslations("ResetPassword");
  const locale = useTranslations()("Locale");

  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParameter = searchParams.get("email") || "";

  const [formData, setFormData] = useState<ResetPasswordValues>({
    password: "",
    passwordConfirm: "",
  });
  const translations = {
    passwordRequired: t("validation.passwordRequired"),
    passwordWeak: t("validation.passwordWeak"),
    passwordsNotMatched: t("validation.passwordsNotMatched"),
    passwordConfirmRequired: t("validation.passwordConfirmRequired"),
  };

  const [errors, setErrors] = useState<Partial<ResetPasswordValues>>({});

  const handleInputChange = (
    fieldName: keyof ResetPasswordValues,
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = ResetPasswordValidation(formData, translations);
    setErrors(errors);

    try {
      const url = "https://rent-api.rubik.dev/api/auth/reset-password";
      const headers = {
        "Accept-Language": locale,
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const body = {
        token: params.token,
        email: emailParameter,
        password: formData.password,
        password_confirmation: formData.passwordConfirm,
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        router.push("/account");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="bg-bgSecondary w-full pb-16">
      <Breadcrumbs translations={t} />
      <div className=" max-w-[1440px] m-auto">
        <div className="relative bg-white mx-0 mobile:mx-8 bigDesktop:mx-0 px-4 desktop:px-8 py-8 flex flex-col">
          <div className="flex flex-col w-full items-start">
            <h1 className="mb-6 text-primary text-4xl font-bold">
              {t("title")}
            </h1>
            <form onSubmit={handleFormSubmit}>
              <div className="w-64 flex flex-col gap-2">
                <div>
                  <label htmlFor="email" className="text-grayFont text-sm">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    disabled
                    id="email"
                    value={emailParameter}
                    className="w-full text-grayFont cursor-not-allowed rounded-sm border-gray border px-3 py-2"
                  />
                </div>
                <div>
                  <div className="relative">
                    <label htmlFor="password" className="text-grayFont text-sm">
                      {t("newPassword")}
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full text-grayFont rounded-sm px-3 py-2 focus-visible:outline-primary pr-8 ${
                        errors.password
                          ? "outline outline-2 outline-red-500"
                          : "border-gray border"
                      }`}
                    />
                    <CheckIcon
                      className={`absolute transition-opacity right-4 bottom-4 ${
                        isPasswordValid(formData.password)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-xs pt-2 opacity-0 text-red-500 w-full transition-opacity
                    ${errors.password && "opacity-100"}`}
                  >
                    {errors.password}
                  </p>
                </div>
                <div>
                  <div className="relative">
                    <label
                      htmlFor="passwordConfirm"
                      className="text-grayFont text-sm"
                    >
                      {t("confirmPassword")}
                    </label>
                    <input
                      type="password"
                      id="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={(e) =>
                        handleInputChange("passwordConfirm", e.target.value)
                      }
                      className={`w-full text-grayFont rounded-sm px-3 py-2 focus-visible:outline-primary pr-8 ${
                        errors.passwordConfirm
                          ? "outline outline-2 outline-red-500"
                          : "border-gray border"
                      }`}
                    />
                    <CheckIcon
                      className={`absolute transition-opacity right-4 bottom-4 ${
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
                    className={`text-xs pt-2 opacity-0 text-red-500 w-full transition-opacity
                    ${errors.passwordConfirm && "opacity-100"}`}
                  >
                    {errors.passwordConfirm}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary mt-8 px-6 py-3 text-sm font-bold text-white hover:bg-secondary"
              >
                {t("resetPassword")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
