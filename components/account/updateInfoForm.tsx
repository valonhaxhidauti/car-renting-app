import { CheckIcon, FlagUkIcon } from "@/assets/svgs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BirthdaySelector from "@/components/account/birthdaySelector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

export default function UpdateInfoForm() {
  const t = useTranslations("Account");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <form className="w-full desktop:w-3/4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-12 items-end">
      {/* <div className="flex gap-4 w-full">
        <RadioGroup defaultValue="mr" className="flex w-full">
          <div className="w-full">
            <Label
              htmlFor="r1"
              className="border-borderForm h-[57px] border p-4 flex items-center rounded-sm gap-4 w-full cursor-pointer"
            >
              <RadioGroupItem value="mr" id="r1" />
              {t("register.mrLabel")}
            </Label>
          </div>
          <div className="w-full">
            <Label
              htmlFor="r2"
              className="border-borderForm h-[57px] border p-4 flex items-center rounded-sm gap-4 w-full cursor-pointer"
            >
              <RadioGroupItem value="mrs" id="r2" />
              {t("register.mrsLabel")}
            </Label>
          </div>
        </RadioGroup>
      </div> */}
      <div className="relative">
        <label className="block text-sm font-medium leading-6 text-grayFont">
          {t("register.nameLabel")}
        </label>
        <input
          type="text"
          className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
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
