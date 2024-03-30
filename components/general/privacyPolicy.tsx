"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ScrollToTop from "../common/scrollToTop";
import SideMenu from "../common/sideMenu";

export default function PrivacyPolicy() {
  const t = useTranslations("PrivacyPolicy");
  const paragraphs = [
    t("content.paragraph1"),
    t("content.paragraph2"),
    t("content.paragraph3"),
    t("content.paragraph4"),
  ];

  return (
    <>
      <div className="w-full flex max-w-[1440px] m-auto px-4 mobile:px-8 py-8 bg-white">
        <div className="text-primary font-bold text-4xl w-full items-center flex">
          {t("heading")}
        </div>
      </div>
      <div className="bg-bgSecondary w-full pb-16">
        <Breadcrumb className="max-w-[1440px] m-auto w-full px-4 mobile:px-8 py-8 font-bold text-gray">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/"> {t("breadcrumb.homepage")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className=" font-bold">
                {t("heading")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative max-w-[1440px] bg-white m-auto px-4 mobile:px-8 pb-8 flex flex-col">
          <SideMenu />
          <div className="flex flex-col w-full laptop:w-3/4 gap-8 py-8">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray">
                {paragraph}
              </p>
            ))}
          </div>
          <ScrollToTop />
        </div>
      </div>
    </>
  );
}
