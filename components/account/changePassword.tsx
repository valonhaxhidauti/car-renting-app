import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UpdatePasswordValues } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { UpdatePasswordValidation } from "@/components/utils/formValidations";
import { useTranslations } from "next-intl";
import { Label } from "../ui/label";

interface ChangePasswordProps {
  setSuccessMessage: (message: string) => void;
  setUnprocessedErrorMessage: (message: string) => void;
  locale: string;
}

export default function ChangePassword({
  setSuccessMessage,
  setUnprocessedErrorMessage,
  locale,
}: ChangePasswordProps) {
  const t = useTranslations("Account");
  const u = useTranslations("Account.changePassword");
  const translations = {
    passwordRequired: t("validation.passwordRequired"),
    passwordWeak: t("validation.passwordWeak"),
    passwordShortLength: t("validation.passwordShortLength"),
    passwordNoLowercase: t("validation.passwordNoLowercase"),
    passwordNoUppercase: t("validation.passwordNoUppercase"),
    passwordNoNumber: t("validation.passwordNoNumber"),
    passwordNoSpecialChar: t("validation.passwordNoSpecialChar"),
    passwordConfirmRequired: t("validation.passwordConfirmRequired"),
    passwordsNotMatch: t("validation.passwordsNotMatch"),
  };
  const [errors, setErrors] = useState<Partial<UpdatePasswordValues>>({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<UpdatePasswordValues>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  const handleInputChange = (
    fieldName: keyof UpdatePasswordValues,
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

  const submitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = UpdatePasswordValidation(formData, translations);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://rent-api.rubik.dev/api/auth/change-password",
          {
            method: "PUT",
            headers: {
              "Accept-Language": locale,
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              password: formData.oldPassword,
              new_password: formData.newPassword,
              new_password_confirmation: formData.confirmPassword,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage("Password Updated");
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

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    switch (field) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  return (
    <div className="relative mx-0 mt-8 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 mobile:px-8 pb-8 flex flex-col">
      <h1 className="text-grayFont text-3xl mt-16 font-bold">
        {u("changeYourPassword")}
      </h1>
      <form
        className="w-full desktop:w-3/4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8 items-start mt-8"
        onSubmit={submitPassword}
      >
        <div>
          <Label
            className="block text-sm font-medium leading-6 text-grayFont"
            htmlFor="oldPassword"
          >
            {u("oldPassword")}
          </Label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              value={formData.oldPassword}
              onChange={(e) => handleInputChange("oldPassword", e.target.value)}
              className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-28 ${
                errors.oldPassword
                  ? "outline outline-2 outline-red-500"
                  : "border-borderForm border"
              }`}
            />
            {formData.oldPassword && (
              <div className="flex gap-2 items-center absolute right-4 bottom-4">
                {showOldPassword ? (
                  <Eye
                    onClick={() => togglePasswordVisibility("old")}
                    className="text-primary cursor-pointer"
                  />
                ) : (
                  <EyeOff
                    onClick={() => togglePasswordVisibility("old")}
                    className="text-primary cursor-pointer"
                  />
                )}
              </div>
            )}
            {errors.oldPassword && (
              <p className="text-xs p-2 text-red-500">{errors.oldPassword}</p>
            )}
          </div>
        </div>
        <div>
          <Label
            className="block text-sm font-medium leading-6 text-grayFont"
            htmlFor="newPassword"
          >
            {u("newPassword")}
          </Label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-28 ${
                errors.newPassword
                  ? "outline outline-2 outline-red-500"
                  : "border-borderForm border"
              }`}
            />
            {formData.newPassword && (
              <div className="flex gap-2 items-center absolute right-4 bottom-4">
                {showNewPassword ? (
                  <Eye
                    onClick={() => togglePasswordVisibility("new")}
                    className="text-primary cursor-pointer"
                  />
                ) : (
                  <EyeOff
                    onClick={() => togglePasswordVisibility("new")}
                    className="text-primary cursor-pointer"
                  />
                )}
              </div>
            )}
          </div>
          {errors.newPassword && (
            <p className="text-xs p-2 text-red-500">{errors.newPassword}</p>
          )}
        </div>
        <div>
          <Label
            className="block text-sm font-medium leading-6 text-grayFont"
            htmlFor="confirmPassword"
          >
            {u("confirmPassword")}
          </Label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-28 ${
                errors.confirmPassword
                  ? "outline outline-2 outline-red-500"
                  : "border-borderForm border"
              }`}
            />
            {formData.confirmPassword && (
              <div className="flex gap-2 items-center absolute right-4 bottom-4">
                {showConfirmPassword ? (
                  <Eye
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="text-primary cursor-pointer"
                  />
                ) : (
                  <EyeOff
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="text-primary cursor-pointer"
                  />
                )}
              </div>
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-xs p-2 text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="col-span-1 tablet:col-span-2 laptop:col-span-3 flex justify-end items-center gap-4 ">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="w-full mobile:w-auto">
                <input
                  type="submit"
                  value={u("submitButton")}
                  className="flex w-full mobile:w-auto cursor-pointer justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary transition focus-visible:outline-primary"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white mb-2" data-side="right">
                <p className="text-grayFont font-medium w-48">
                  {u("tooltipMessage")}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  );
}
