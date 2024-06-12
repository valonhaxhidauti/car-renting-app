"use client";

import { useMessages, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Breadcrumbs, HeadingTitle } from "../common/headingParts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollToTop from "../common/scrollToTop";
import SideMenu from "../common/sideMenu";
import { Skeleton } from "../ui/skeleton";

interface FaqItem {
  id: string;
  attributes: {
    question: string;
    answer: string;
  };
}

interface OpenItems {
  [key: string]: boolean;
}

export default function FrequentlyAskedQuestions() {
  const t = useTranslations("FaqItems");
  const locale = useTranslations()("Locale");

  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [openItems, setOpenItems] = useState<OpenItems>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const url = new URL("https://rent-api.rubik.dev/api/faq");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept-Language": locale,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setFaq(data.data);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);

  const handleToggle = (id: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  };

  return (
    <>
      <HeadingTitle title={t("heading")} />
      <div className="bg-bgSecondary w-full pb-16">
        <Breadcrumbs translations={t} />
        <div className=" max-w-[1440px] m-auto">
          <div className="relative mx-0 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 desktop:px-8 pb-8 flex flex-col">
            <SideMenu />
            {loading ? (
              <div className="py-8">
                {Array.from({ length: 10 }, (_, index) => (
                  <div key={index} className="flex flex-col mt-4">
                    <Skeleton className="h-10 w-full laptop:w-3/4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col tablet:flex-row w-full laptop:w-3/4 gap-8 py-8">
                <Accordion type="multiple" className="w-full">
                  {faq.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger
                        onClick={() => handleToggle(item.id)}
                        className={`${
                          openItems[item.id]
                            ? " text-primary font-bold"
                            : "text-grayFont font-normal"
                        } text-start`}
                      >
                        {item.attributes.question}
                      </AccordionTrigger>
                      <AccordionContent
                        className={`${
                          openItems[item.id] ? "border-primary border-b-2" : ""
                        } text-sm text-grayFont`}
                      >
                        {item.attributes.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            <div className="desktop:mb-20">
              <ScrollToTop />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
