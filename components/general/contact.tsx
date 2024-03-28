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
import {
  CallUsIcon,
  LocationMapIcon,
  MailIcon,
  VisitUsIcon,
} from "@/assets/svgs";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ChevronUp } from "lucide-react";

export default function Contact() {
  const { register, handleSubmit } = useForm();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const t = useTranslations("Contact");

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
                <Link href="/">{t("breadcrumb.homepage")}</Link>
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
          <div className="flex flex-col tablet:flex-row w-full laptop:w-4/5 gap-8 max-w-[1440px] px-0 py-8 tablet:px-8">
            <div className="flex flex-col min-h-64 gap-6 justify-between items-center py-8 px-12 border-primary border-b-[3px]">
              <VisitUsIcon />
              <h1 className="text-center text-gray font-bold text-2xl">
                {t("visitUs")}
              </h1>
              <p className="text-center text-gray text-sm ">
                {t("visitUsDescription")}
              </p>
            </div>
            <div className="flex flex-col min-h-64 gap-6 justify-between items-center py-8 px-12 border-primary border-b-[3px]">
              <CallUsIcon />
              <h1 className="text-center text-gray font-bold text-2xl">
                {t("callUs")}
              </h1>
              <p className="text-center text-gray text-sm ">
                {t("callUsDescription")}
              </p>
            </div>
            <div className="flex flex-col min-h-64 gap-2 relative z-0 shadow-grayPrimary justify-center items-center py-8 px-12 ">
              <MailIcon className="absolute top-1 right-4 -z-10" />
              <a href="mailto:rentgo@rentgotheme.com" className="text-primary">
                rentgo@rentgotheme.com
              </a>
              <a href="mailto:support@rentgotheme.com" className="text-primary">
                support@rentgotheme.com
              </a>
            </div>
          </div>
          <div className="px-0 py-8 tablet:px-8 w-full laptop:w-4/5">
            <div className="flex flex-col tablet:flex-row gap-8">
              <div className="relative flex-shrink-0 w-full tablet:w-1/2 h-80 tablet:h-auto">
                <Image
                  src="/map.png"
                  alt="map"
                  priority
                  width={100}
                  height={100}
                  sizes="100%"
                  className="object-cover absolute w-full h-full left-0 top-0 "
                />
                <LocationMapIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="flex flex-col w-full tablet:w-1/2">
                <h1 className="text-gray text-2xl font-bold">
                  {t("formHeading")}
                </h1>
                <p className="text-graySecondary text-sm mt-2 mb-10">
                  {t("formDescription")}
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2 text-right"
                >
                  <input
                    type="text"
                    placeholder={t("fullNamePlaceholder")}
                    className="p-2 border border-gray rounded outline-primary"
                    {...register("fullName")}
                  />
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="p-2 border border-gray rounded outline-primary"
                    {...register("email")}
                  />
                  <input
                    type="text"
                    placeholder={t("phoneNumberPlaceholder")}
                    className="p-2 border border-gray rounded outline-primary"
                    {...register("phoneNumber")}
                  />
                  <textarea
                    placeholder={t("messagePlaceholder")}
                    rows={4}
                    className="p-2 border border-gray rounded outline-primary resize-none"
                    {...register("message")}
                  ></textarea>
                  <div className="w-full text-right">
                    <button
                      type="submit"
                      className="w-full mobile:w-fit text-white bg-primary hover:bg-secondary px-8 py-3"
                    >
                      {t("sendMessage")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className="hidden laptop:block cursor-pointer rounded-full p-3 border-gray border-2 absolute bottom-16 right-8"
            onClick={scrollToTop}
          >
            <ChevronUp size={32} className="text-gray" />
          </div>
        </div>
      </div>
    </>
  );
}
