"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./select";
import { ChevronDown } from "lucide-react";
import { FlagDeIcon, FlagUkIcon } from "@/assets/svgs";

export default function LanguageSelector({
  isOpen,
  triggerClass,
}: {
  isOpen: boolean;
  triggerClass: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();
  
  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      const newPathname = pathname.replace(`/${localActive}`, `/${nextLocale}`);
      router.replace(newPathname);
    });
  }
  
  const t = useTranslations("Header");

  return (
    <>
      <Select
        onValueChange={onSelectChange}
        defaultValue={localActive}
        disabled={isPending}
      >
        <SelectTrigger className={triggerClass}>
          {localActive === "en" ? <FlagUkIcon /> : <FlagDeIcon />}
          <ChevronDown className={`${isOpen ? "text-white" : ""} h-4 w-4`} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectLabel>{t("languages.label")}</SelectLabel>
            <SelectItem value="en">{t("languages.english")}</SelectItem>
            <SelectItem value="de">{t("languages.german")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
