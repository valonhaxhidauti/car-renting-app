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
import { CallUsIcon, MailIcon, VisitUsIcon } from "@/assets/svgs";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <>
      <div className="w-full flex max-w-[1440px] m-auto px-4 mobile:px-8 py-8 bg-white ">
        <div className="text-primary font-bold text-4xl w-full items-center flex">
          {t("heading")}
        </div>
      </div>
      <div className="bg-bgSecondary w-full">
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
        <div className="max-w-[1440px] m-auto px-4 mobile:px-8 pb-8">
          <div className="bg-white grid grid-cols-1 tablet:grid-cols-3	gap-8 max-w-[1440px] p-8">
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
        </div>
      </div>
    </>
  );
}
