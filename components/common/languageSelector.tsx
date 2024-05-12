"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { ChevronDown } from "lucide-react";
import { FlagDeIcon, FlagUkIcon } from "@/assets/svgs";

export default function LanguageSelector({
  isOpen,
  triggerClass,
}: {
  isOpen: boolean;
  triggerClass: string;
}) {
  const t = useTranslations("Header");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const activeLocale = useLocale();
  const pathname = usePathname();
  const [shown, setShown] = useState(false); 
  
  useEffect(() => {
    if (shown) {
      document.body.style.setProperty('overflow-y', 'auto', 'important');
    } else {
      document.body.style.removeProperty('overflow-y');
    }
  }, [shown]);

  function onSelectClicked(){
    setShown(!shown)
  }

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);
      const newPathname = pathname.replace(
        `/${activeLocale}`,
        `/${nextLocale}`
      );
      const newUrl = `${
        window.location.origin
      }${newPathname}?${searchParams.toString()}`;

      router.replace(newUrl);
    });
  }


  return (
    <>
      <Select
        onValueChange={onSelectChange}
        defaultValue={activeLocale}
        onOpenChange={onSelectClicked}
        disabled={isPending}
      >
        <SelectTrigger className={triggerClass}>
          {activeLocale === "en" ? <FlagUkIcon /> : <FlagDeIcon />}
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
