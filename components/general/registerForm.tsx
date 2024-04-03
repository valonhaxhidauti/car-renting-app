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
  const t = useTranslations("Authenthication");

  return (
    <div className="flex flex-col tablet:flex-row w-full gap-8">
      <div className="items-start flex flex-col flex-grow tablet:w-1/3 min-h-64 gap-6 justify-between py-16 px-16">
        <h1 className="text-gray font-bold text-4xl mb-2">
          {t("Register.Title")}
        </h1>
        <div className="w-20 h-0.5 bg-primary"></div>
        <p className="text-gray">{t("Register.Description")}</p>
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

                    {t("Register.MrLabel")}
                  </Label>
                </div>
                <div className="w-full">
                  <Label
                    htmlFor="r2"
                    className="bg-white p-4 flex rounded-sm gap-4 w-full hover:shadow-btnShadow cursor-pointer"
                  >
                    <RadioGroupItem value="mrs" id="r2" />
                    {t("Register.MrsLabel")}
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div></div>
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray">
                {t("Register.NameLabel")}
              </label>
              <input
                type="text"
                required
                className="block w-full rounded-sm p-4 text-gray focus-visible:outline-primary"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray">
                {t("Register.SurnameLabel")}
              </label>
              <input
                type="text"
                required
                className="block w-full rounded-sm p-4 text-gray focus-visible:outline-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray">
                {t("Register.EmailAddressLabel")}
              </label>
              <div className="mt-2 relative">
                <input
                  type="email"
                  required
                  className="block w-full rounded-sm p-4 text-gray focus-visible:outline-primary pr-8"
                />
                <CheckIcon className="absolute right-4 bottom-[22px]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray">
                {t("Register.PhoneNumberLabel")}
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
                  className="block w-full rounded-sm p-4 text-gray focus-visible:outline-primary"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray">
                  {t("Register.PasswordLabel")}
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  className="block w-full rounded-sm p-4 text-gray focus-visible:outline-primary"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray">
                  {t("Register.PasswordAgainLabel")}
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  className="block w-full rounded-sm p-4 text-gray focus-visible:outline-primary"
                />
              </div>
            </div>
            <div></div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex justify-center bg-primary px-12 py-3 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
              >
                {t("Register.RegisterButton")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
