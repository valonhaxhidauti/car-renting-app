import { CheckIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { UpdateFormValues } from "@/lib/types";
import { UpdateFormValidation } from "../utils/formValidations";
import { useToast } from "@/components/ui/use-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

export default function UpdateInfoForm() {
  const t = useTranslations("Account");
  const locale = useTranslations()("Locale");
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
  const [internalServerError, setInternalServerError] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [unprocessedErrorMessage, setUnprocessedErrorMessage] = useState("");
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState<UpdateFormValues>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    birthday: "",
  });

  const phoneInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    fieldName: keyof UpdateFormValues,
    value: string
  ) => {
    if (fieldName === "phone" && phoneInputRef.current) {
      const phoneInputValue = phoneInputRef.current.value;
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: phoneInputValue,
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

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
  
      if (token) {
        try {
          const response = await fetch(
            "https://rent-api.rubik.dev/api/my-profiles",
            {
              method: "GET",
              headers: {
                "Accept-Language": locale,
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              }
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            const userProfile = data.data.attributes;
  
            setFormData({
              name: userProfile.first_name || "",
              surname: userProfile.last_name || "",
              email: userProfile.email || "",
              phone: userProfile.phone || "",
              birthday: userProfile.date_of_birth || "",
            });
            setLoading(false);
          } else {
            const errorData = await response.json();
            setInternalServerError(errorData.detail);
            setLoading(false);
          }
        } catch (error) {
          setInternalServerError(t("profileFetchError"));
          setLoading(false);
        }
      } else {
        setInternalServerError(t("profileTokenError"));
        setLoading(false);
      }
    };
  
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast({
        variant: "success",
        description: successMessage,
      });

      setSuccessMessage("");
    } else if (unprocessedErrorMessage) {
      toast({
        variant: "destructive",
        description: unprocessedErrorMessage,
      });

      setUnprocessedErrorMessage("");
    }
  }, [successMessage, unprocessedErrorMessage, toast]);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = UpdateFormValidation(formData, translations);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const token = localStorage.getItem("token");
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
              date_of_birth: formData.birthday,
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (loading) {
    return null;
  }

  if (internalServerError) {
    return (
      <p className="text-primary text-lg font-bold">{internalServerError}</p>
    );
  }

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
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
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
          value={formData.surname}
          onChange={(e) => handleInputChange("surname", e.target.value)}
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
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
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
              className:
                "block w-full border-borderForm border rounded-sm pr-8 pl-12 py-4 text-grayFont focus-visible:outline-primary",
            }}
          />
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
          className="block w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8"
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.passwordLabel")}
        </label>
        <input
          type={showPassword ? "text" : "password"}
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
          </div>
        )}
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
