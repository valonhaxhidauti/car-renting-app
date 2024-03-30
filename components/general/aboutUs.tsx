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
import Image from "next/image";
import ScrollToTop from "../common/scrollToTop";
import { EasyIcon, EconomicIcon, EverywhereIcon } from "@/assets/svgs";
import { Facebook, Instagram, Twitter } from "lucide-react";
import SideMenu from "../common/sideMenu";

export default function AboutUs() {
  const t = useTranslations("AboutUs");

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
            <p className="text-primary text-xl font-medium">
              {t("description.paragraph1")}
            </p>
            <p className="text-gray">{t("description.paragraph2")}</p>
          </div>
          <div className="py-8 w-full laptop:w-3/4">
            <div className="flex flex-col tablet:flex-row gap-8 w-full">
              <div className="flex flex-col flex-grow group p-8 tablet:w-1/3 hover:bg-primary transition duration-300">
                <EasyIcon className="text-primary group-hover:text-white" />
                <h1 className="text-3xl text-gray group-hover:text-white my-4">
                  {t("features.easy.title")}
                </h1>
                <div className="w-20 h-[2.5px] mb-4 bg-primary group-hover:bg-white"></div>
                <p className="group-hover:text-white text-gray">
                  {t("features.easy.description")}
                </p>
              </div>
              <div className="flex flex-col flex-grow group p-8 tablet:w-1/3 hover:bg-primary transition duration-300">
                <EconomicIcon className="text-primary group-hover:text-white" />
                <h1 className="text-3xl text-gray group-hover:text-white my-4">
                  {t("features.economic.title")}
                </h1>
                <div className="w-20 h-[2.5px] mb-4 bg-primary group-hover:bg-white"></div>
                <p className="group-hover:text-white text-gray">
                  {t("features.economic.description")}
                </p>
              </div>
              <div className="flex flex-col flex-grow group p-8 tablet:w-1/3 hover:bg-primary transition duration-300">
                <EverywhereIcon className="text-primary group-hover:text-white" />
                <h1 className="text-3xl text-gray group-hover:text-white my-4">
                  {t("features.everywhere.title")}
                </h1>
                <div className="w-20 h-[2.5px] mb-4 bg-primary group-hover:bg-white"></div>
                <p className="group-hover:text-white text-gray">
                  {t("features.everywhere.description")}
                </p>
              </div>
            </div>
          </div>
          <div className="py-8 w-full laptop:w-3/4">
            <div className="flex flex-col gap-8 w-full items-center">
              <h1 className="text-center text-gray text-4xl mb-4">
                {t("teamSection")}
              </h1>
              <div className="flex flex-col gap-4 tablet:flex-row">
                <div className="relative overflow-hidden group w-fit">
                  <Image
                    src="/person1.png"
                    alt="person1"
                    width="400"
                    height="400"
                  />
                  <div className="absolute flex flex-col justify-between group items-end inset-0 hover:bg-primary transition-all duration-300 ease-in-out group-hover:opacity-90">
                    <div className="p-8 hidden group-hover:flex justify-end gap-4">
                      <Facebook className="text-white" size={24} />
                      <Twitter className="text-white" size={24} />
                      <Instagram className="text-white" size={24} />
                    </div>
                    <div className="p-8 hidden group-hover:flex flex-col self-start">
                      <p className="text-white text-2xl">Daisy Rose</p>
                      <p className="text-white text-xs">General Manager</p>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden group w-fit">
                  <Image
                    src="/person2.png"
                    alt="person2"
                    width="400"
                    height="400"
                  />
                  <div className="absolute flex flex-col justify-between group items-end inset-0 hover:bg-primary transition-all duration-300 ease-in-out group-hover:opacity-90">
                    <div className="p-8 hidden group-hover:flex justify-end gap-4">
                      <Facebook className="text-white" size={24} />
                      <Twitter className="text-white" size={24} />
                      <Instagram className="text-white" size={24} />
                    </div>
                    <div className="p-8 hidden group-hover:flex flex-col self-start">
                      <p className="text-white text-2xl">Nathaniel Garrison</p>
                      <p className="text-white text-xs">Director</p>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden group w-fit">
                  <Image
                    src="/person3.png"
                    alt="person3"
                    width="400"
                    height="400"
                  />
                  <div className="absolute flex flex-col justify-between group items-end inset-0 hover:bg-primary transition-all duration-300 ease-in-out group-hover:opacity-90">
                    <div className="p-8 hidden group-hover:flex justify-end gap-4">
                      <Facebook className="text-white" size={24} />
                      <Twitter className="text-white" size={24} />
                      <Instagram className="text-white" size={24} />
                    </div>
                    <div className="p-8 hidden group-hover:flex flex-col self-start">
                      <p className="text-white text-2xl">Aron Garrison</p>
                      <p className="text-white text-xs">Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-8 w-full laptop:w-3/4">
            <div
              style={{
                background:
                  "linear-gradient(28deg, rgb(30 129 246) 0%, rgb(84 181 251) 100%)",
                boxShadow: "-7.071px 7.071px 0px 0px rgba(0, 0, 0, 0.05)",
              }}
              className="w-full rounded-tr-[4rem] rounded-bl-[4rem] py-8 px-16 text-white relative"
            >
              <div className="w-full mobile:w-1/2 flex flex-col gap-4">
                <h1 className="text-3xl">
                  {t.rich("callToAction.title", {
                    bold: (chunks) => <strong>{chunks}</strong>,
                  })}
                </h1>
                <p className="text-sm">{t("callToAction.description")}</p>
                <button className="px-10 py-3 hover:bg-slate-50 bg-white text-primary text-sm w-fit font-medium">
                  {t("callToAction.button")}
                </button>
                <Image
                  src="/aboutUsCar.png"
                  alt="Car Photo"
                  width="300"
                  height="200"
                  className="hidden mobile:block absolute -bottom-10 right-0"
                />
              </div>
            </div>
          </div>
          <ScrollToTop />
        </div>
      </div>
    </>
  );
}
