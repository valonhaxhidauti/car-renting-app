"use client";

import { useTranslations } from "next-intl";
import { Breadcrumbs, HeadingTitle } from "../common/headingParts";
import UpdateInfoForm from "./updateInfoForm";
import AccountSideMenu from "./accountSideMenu";

export default function PersonalInfoUpdate() {
  const t = useTranslations("Account.personalInfo")

  return (
    <>
      <HeadingTitle title={t("breadcrumb.homepage")}/>
      <div className="bg-bgSecondary w-full pb-16">
      <Breadcrumbs translations={t} />
        <div className="max-w-[1440px] m-auto">
          <div className="relative mx-0 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 mobile:px-8 pb-8 flex flex-col">
            <AccountSideMenu />
            <div className="flex flex-col w-full gap-8 mt-16">
              <h1 className="text-grayFont text-3xl font-bold">
                {t("heading")}
              </h1>
              <UpdateInfoForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
