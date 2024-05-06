"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import UpdateInfoForm from "./updateInfoForm";
import AccountSideMenu from "./accountSideMenu";

export default function PersonalInfoUpdate() {
  const t = useTranslations("Account");

  return (
    <>
      <div className="w-full flex max-w-[1440px] m-auto px-4 mobile:px-8 bigDesktop:px-0 py-8 bg-white">
        <div className="text-primary font-bold text-4xl w-full items-center flex">
          {t("title")}
        </div>
      </div>
      <div className="bg-bgSecondary w-full pb-16">
        <Breadcrumb className="max-w-[1440px] m-auto w-full px-4 mobile:px-8 bigDesktop:px-0 py-8 font-bold text-grayFont">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t("breadcrumb.homepage")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">{t("title")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("breadcrumb.personalInfo")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-[1440px] m-auto">
          <div className="relative mx-0 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 mobile:px-8 pb-8 flex flex-col">
            <AccountSideMenu />
            <div className="flex flex-col w-full gap-8 mt-16">
              <h1 className="text-grayFont text-3xl font-bold">
                {t("breadcrumb.personalInfo")}
              </h1>
              <UpdateInfoForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
