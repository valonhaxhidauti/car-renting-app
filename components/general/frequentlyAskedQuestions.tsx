"use client";

import { useMessages, useTranslations } from "next-intl";
import { useState } from "react";
import { Breadcrumbs, HeadingTitle } from "../common/headingParts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollToTop from "../common/scrollToTop";
import SideMenu from "../common/sideMenu";

type AccordionItemState = {
  [key: string]: boolean;
};

export default function FrequentlyAskedQuestions() {
  const t = useTranslations("FaqItems");
  const messages = useMessages();
  const keys = (messages.FaqItems as { items: Record<string, string> }).items;
  const items = Object.keys(keys);

  const initialState = items.reduce((acc, item) => {
    acc[item as keyof AccordionItemState] = false;
    return acc;
  }, {} as AccordionItemState);

  const [isOpen, setIsOpen] = useState<AccordionItemState>(initialState);

  const handleClick = (item: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  return (
    <>
      <HeadingTitle translations={t("heading")} /> 
      <div className="bg-bgSecondary w-full pb-16">
      <Breadcrumbs translations={t} /> 
        <div className="relative max-w-[1440px] bg-white m-auto px-4 mobile:px-8 pb-8 flex flex-col">
          <SideMenu />
          <div className="flex flex-col tablet:flex-row w-full laptop:w-3/4 gap-8 py-8">
            <Accordion type="multiple" className="w-full">
              {items.map((item) => (
                <AccordionItem key={item} value={item}>
                  <AccordionTrigger
                    onClick={() => handleClick(item)}
                    className={`${
                      isOpen[item]
                        ? " text-primary font-bold"
                        : "text-grayFont font-normal"
                    } text-start`}
                  >
                    {/* @ts-ignore */}
                    {t(`items.${item}.question`)}
                  </AccordionTrigger>
                  <AccordionContent
                    className={`${
                      isOpen[item] ? "border-primary border-b-2" : ""
                    } text-sm text-grayFont`}
                  >
                    {/* @ts-ignore */}
                    {t(`items.${item}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="desktop:mb-20">
          <ScrollToTop />
          </div>
        </div>
      </div>
    </>
  );
}
