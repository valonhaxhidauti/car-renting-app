import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BirthdaySelector() {
  const t = useTranslations("Account.birthdaySelect");
  const keys = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ] as const;

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, index) => currentYear - index);

  // const [selectedDay, setSelectedDay] = useState(null);
  // const [selectedMonth, setSelectedMonth] = useState(null);
  // const [selectedYear, setSelectedYear] = useState(null);

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-grayFont">
        {t("label")}
      </label>
      <div className="mt-2 flex gap-2">
        {/* Day */}
        <Select>
          <SelectTrigger className="w-full border-borderForm border rounded-sm h-[56px] flex gap-2">
            <SelectValue placeholder={t("day")} />
            <ChevronDown size={12} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("day")}</SelectLabel>
              {days.map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Month */}
        <Select>
          <SelectTrigger className="w-full border-borderForm border rounded-sm h-[56px] flex gap-2">
            <SelectValue placeholder={t("month")} />
            <ChevronDown size={12} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("month")}</SelectLabel>
              {keys.map((month) => (
                <SelectItem key={month} value={month}>
                  {t(`months.${month}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Year */}
        <Select>
          <SelectTrigger className="w-full border-borderForm border rounded-sm h-[56px] flex gap-2">
            <SelectValue placeholder={t("year")} />
            <ChevronDown size={12} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("year")}</SelectLabel>
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
  );
}
