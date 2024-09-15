"use client";

import {
  LoginFormValidation,
  isEmailValid,
  isPasswordValid,
} from "../utils/formValidations";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import { CheckIcon, FacebookIcon, GoogleIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";
import { LoginFormValues } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { useAuth } from "../context/authContext";

export default function LoginForm() {
  const t = useTranslations("Account");
  const locale = useTranslations()("Locale");
  const router = useRouter();
  const { setAuthenticated, setToken } = useAuth();
  const translations = {
    emailRequired: t("validation.emailRequired"),
    emailInvalid: t("validation.emailInvalid"),
    passwordRequired: t("validation.passwordRequired"),
    passwordInvalid: t("validation.passwordInvalid"),
    errorDuringLogin: t("login.errorDuringLogin"),
    formErrors: t("login.formErrors"),
    verifyEmail: t("login.verifyEmail"),
  };
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormValues>>({});
  const [unprocessedErrorMessage, setUnprocessedErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    fieldName: keyof LoginFormValues,
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

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = LoginFormValidation(formData, translations);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_BASE_URL +"/api/auth/login",
          {
            method: "POST",
            headers: {
              "Accept-Language": locale,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const token = data.data.attributes.token;

          if (data.data.attributes.email_verified_at === null) {
            setUnprocessedErrorMessage(translations.verifyEmail);
          } else {
            setAuthenticated(true);
            setToken(token);
            router.push("/");
          }
        } else {
          const errorData = await response.json();
          setUnprocessedErrorMessage(errorData.detail);
        }
      } catch (error) {
        console.error(translations.errorDuringLogin, error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log(translations.formErrors, errors);
    }
  };

  return (
    <div className="flex mobile:bg-white w-full">
      <div className="items-start flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 mobile:p-16">
        <h1 className="text-grayFont font-bold text-4xl mb-2">
          {t("login.title")}
        </h1>
        <div className="w-20 h-[3px] bg-primary"></div>
        <p className="text-grayFont">{t("login.description")}</p>
        <div
          className={`flex flex-col gap-2 w-full self-end justify-self-end h-full`}
        >
          {/* Facebook and Google Login */}
          {/* <div className="flex flex-col tablet:flex-row gap-6 w-full px-8 tablet:px-0">
            <button className="flex gap-4 p-4 justify-center w-full bg-white shadow-btnShadow hover:bg-slate-50 active:bg-slate-100">
              <FacebookIcon />
              <p className="text-grayFont"> {t("login.facebookButton")}</p>
            </button>
            <button className="flex gap-4 p-4 justify-center w-full bg-white shadow-btnShadow hover:bg-slate-50 active:bg-slate-100">
              <GoogleIcon />
              <p className="text-grayFont">{t("login.googleButton")}</p>
            </button>
          </div>
          <div className="flex items-center w-full my-8">
            <div className=" border-b border-zinc-200 w-full"></div>
            <span className="px-4 text-slate-400 italic">{t("login.or")}</span>
            <div className=" border-b border-zinc-200 w-full"></div>
          </div> */}
          <div
            className={`text-red-500 font-medium transition-opacity duration-300 ${
              unprocessedErrorMessage ? "opacity-100" : "opacity-0"
            }`}
          >
            {unprocessedErrorMessage}
          </div>
          <div className="w-full h-full">
            <form
              className="flex flex-col gap-4 justify-between h-full"
              onSubmit={submitForm}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <div className="mt-2 relative">
                    <Label
                      htmlFor="loginEmail"
                      className="block text-sm font-medium leading-6 text-grayFont"
                    >
                      {t("login.emailLabel")}
                    </Label>
                    <input
                      type="email"
                      id="loginEmail"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`block w-full rounded-sm text-grayFont p-4 focus-visible:outline-primary pr-8 ${
                        errors.email
                          ? "outline outline-2 outline-red-500"
                          : "border-zinc-300 border"
                      }`}
                    />
                    <CheckIcon
                      className={`absolute transition-opacity right-4 bottom-[22px] ${
                        isEmailValid(formData.email)
                          ? "opacity-100"
                          : "opacity-0"
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
                <div>
                  <div>
                    <div className="mt-2 relative">
                      <Label
                        htmlFor="loginPassword"
                        className="block text-sm font-medium leading-6 text-grayFont"
                      >
                        {t("login.passwordLabel")}
                      </Label>
                      <input
                        type="password"
                        id="loginPassword"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8 ${
                          errors.password
                            ? "outline outline-2 outline-red-500"
                            : "border-zinc-300 border"
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
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <Link
                    href="/account/forgot-password"
                    className="font-bold text-grayFont hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
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
                      {t("login.loginButton")}
                    </div>
                  ) : (
                    t("login.loginButton")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
