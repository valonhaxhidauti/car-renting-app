import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOverflowControl } from "../hooks/useOverflowControl";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Link } from "next-view-transitions";

export default function CreditCardPayment() {
  const t = useTranslations("vehiclePayment.payment");
  const toggleShown = useOverflowControl(false);

  function onSelectClicked() {
    toggleShown();
  }

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ] as const;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, index) => currentYear + index);

  return (
    <>
      <h1 className="text-grayFont font-bold"> {t("creditCardInfoTitle")}</h1>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="flex flex-col w-full mobile:w-auto">
          <label
            className="block text-sm font-medium leading-6 text-grayFont"
            htmlFor="cardOwner"
          >
            {t("cardOwnerLabel")}
          </label>
          <input
            type="text"
            id="cardOwner"
            name="cardOwner"
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
            required
          />
        </div>
        <div className="flex flex-col w-full mobile:w-auto">
          <label
            className="block text-sm font-medium leading-6 text-grayFont"
            htmlFor="cardNumber"
          >
            {t("cardNumberLabel")}
          </label>
          <input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={16}
            id="cardNumber"
            name="cardNumber"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/, "");
            }}
            className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
            required
          />
        </div>
        <div className="flex gap-4 w-full mobile:w-auto">
          <div className="flex flex-col  w-3/4">
            <label className="block text-sm font-medium leading-6 text-grayFont">
              {t("expireDateLabel")}
            </label>
            <div className="flex gap-2">
              <Select onOpenChange={onSelectClicked}>
                <SelectTrigger className="mt-2 p-3.5 h-full border-borderForm border rounded-sm">
                  <SelectValue placeholder={t("monthLabel")} />
                  <ChevronDown size={12} />
                </SelectTrigger>
                <SelectContent className="h-full">
                  <SelectGroup>
                    <SelectLabel>Month</SelectLabel>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onOpenChange={onSelectClicked}>
                <SelectTrigger className="mt-2 p-3.5 h-full border-borderForm border rounded-sm">
                  <SelectValue placeholder={t("yearLabel")} />
                  <ChevronDown size={12} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-1/4 flex flex-col">
            <label
              className="block text-sm font-medium leading-6 text-grayFont"
              htmlFor="cvv"
            >
              {t("cvvLabel")}
            </label>
            <input
              type="password"
              maxLength={3}
              id="cvv"
              name="cvv"
              className="block mt-2 w-full border-borderForm border rounded-sm p-4 text-grayFont focus-visible:outline-primary"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex items-center">
          <Checkbox id="terms" className="mr-2" required />
          <Label
            htmlFor="terms"
            className="text-sm text-grayFont cursor-pointer"
          >
            {t("termsLabel")}
          </Label>
        </div>

        <Link href="/terms" className="ml-6 text-blue-500 underline text-sm">
          {t("readTerms")}
        </Link>
      </div>
    </>
  );
}
