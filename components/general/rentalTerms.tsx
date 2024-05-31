"use client";

import { useTranslations } from "next-intl";
import { Breadcrumbs, HeadingTitle } from "../common/headingParts";
import ScrollToTop from "../common/scrollToTop";
import SideMenu from "../common/sideMenu";

export default function RentalTerms() {
  const t = useTranslations("RentalTerms");
  const paragraphs = [
    t("content.paragraph1"),
    t("content.paragraph2"),
    t("content.paragraph3"),
  ];

  return (
    <>
      <HeadingTitle title={t("heading")} />
      <div className="bg-bgSecondary w-full pb-16">
        <Breadcrumbs translations={t} />
        <div className=" max-w-[1440px] m-auto">
          <div className="relative mx-0 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 desktop:px-8 pb-8 flex flex-col">
            <SideMenu />
            <div className="flex flex-col w-full laptop:w-3/4 gap-8 py-8">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-grayFont">
                  {paragraph}
                </p>
              ))}
            </div>
            <ScrollToTop />
          </div>
        </div>
      </div>
    </>
  );
}
