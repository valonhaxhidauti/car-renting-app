import { CheckIcon, FlagUkIcon } from "@/assets/svgs";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const t = useTranslations("Account");

  return (
    <div className="flex flex-col tablet:flex-row w-full gap-8">
      <div className="items-start flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between mobile:p-16">
        <h1 className="text-grayFont font-bold text-4xl mb-2">
          {t("register.title")}
        </h1>
        <div className="w-20 h-0.5 bg-primary"></div>
        <p className="text-grayFont">{t("register.description")}</p>
        <div className="w-full">
          <form
            className="grid grid-cols-1 mobile:grid-cols-2 gap-4"
            action="#"
            method="POST"
          >
            <div className="flex gap-4 w-full">
              <RadioGroup defaultValue="mr" className="flex w-full">
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
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.nameLabel")}
              </label>
              <input
                type="text"
                required
                className="block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.surnameLabel")}
              </label>
              <input
                type="text"
                required
                className="block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.emailAddressLabel")}
              </label>
              <div className="mt-2 relative">
                <input
                  type="email"
                  required
                  className="block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary pr-8"
                />
                <CheckIcon className="absolute right-4 bottom-[22px]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.phoneNumberLabel")}
              </label>
              <div className="mt-2 flex gap-2">
                <Select>
                  <SelectTrigger className="bg-white border-none rounded-sm h-[56px] w-fit flex gap-2">
                    <FlagUkIcon />
                    <ChevronDown size={12} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>country</SelectLabel>
                      <SelectItem value="en">eng</SelectItem>
                      <SelectItem value="de">test</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input
                  type="tel"
                  required
                  className="block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.passwordLabel")}
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  className="block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grayFont">
                {t("register.passwordAgainLabel")}
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  className="block w-full rounded-sm p-4 text-grayFont focus-visible:outline-primary"
                />
              </div>
            </div>
            <div></div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline-primary"
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
