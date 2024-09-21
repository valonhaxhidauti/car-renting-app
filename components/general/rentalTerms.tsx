"use client";

import { useTranslations } from "next-intl";
import { Breadcrumbs, HeadingTitle } from "../common/headingParts";
import ScrollToTop from "../common/scrollToTop";
import SideMenu from "../common/sideMenu";

export default function RentalTerms() {
  const t = useTranslations("RentalTerms");
  const paragraphs = [
    t.rich("content.paragraph1",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>}),
    t.rich("content.paragraph2",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>}),
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
                <p className="text-grayFont">{t.rich("content.deposit",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>})}</p>
                <p className="text-grayFont">{t.rich("content.deductible",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>})}</p>
                <ul className="text-grayFont list-disc list-inside">
                  <li>{t.rich("content.agreement1",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>})}</li>
                  <li>{t.rich("content.agreement2",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>})}</li>
                  <li>{t.rich("content.agreement3",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>})}</li>
                  <li>{t.rich("content.agreement4",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>})}</li>
                </ul>
                <p className="text-grayFont">{t.rich("content.jurisdiction",{br: () => <br/>,bold: (chunks) => <strong>{chunks}</strong>})}</p>
              </div>
              <ScrollToTop />
            </div>
          </div>
        </div>
      </>
  );
}
