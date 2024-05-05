import { Link } from "next-view-transitions";
import { Logo } from "@/assets/svgs";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = dayjs().year();

  return (
    <footer className="relative bottom-0 left-0 ">
      <div className="bg-bgSecondary">
        <div className="bg-white">
          <div className="w-full max-w-[1440px] m-auto flex flex-col tablet:flex-row gap-8 tablet:gap-32 laptop:gap-48 px-4 mobile:px-8 bigDesktop:px-0 py-12">
            <div className="flex flex-col justify-between">
              <Logo />
              <p className="text-grayFont text-xs mt-6">{t("companyName")}</p>
              <p className="text-grayFont text-2xl mb-6">{t("slogan")}</p>
              <div className="flex gap-4">
                <Facebook size={20} />
                <Twitter size={20} />
                <Instagram size={20} />
                <Youtube size={20} />
                <Linkedin size={20} />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-primary text-xl ">{t("pages.title")}</p>
              <div className="flex flex-col gap-4 mt-6 justify-between">
                <Link
                  href="/about"
                  className="text-grayFont hover:font-medium text-sm leading-none"
                >
                  {t("pages.aboutUs")}
                </Link>
                <Link
                  href="/explore"
                  className="text-grayFont hover:font-medium text-sm leading-none"
                >
                  {t("pages.exploreVehicles")}
                </Link>
                <Link
                  href="/"
                  className="text-grayFont hover:font-medium text-sm leading-none"
                >
                  {t("pages.blog")}
                </Link>
                <Link
                  href="/contact"
                  className="text-grayFont hover:font-medium text-sm leading-none"
                >
                  {t("pages.contact")}
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-primary text-xl ">{t("information.title")}</p>
              <div className="flex flex-col gap-4 mt-6 justify-between">
                <Link
                  href="/faq"
                  className="text-grayFont hover:font-medium text-sm leading-none"
                >
                  {t("information.faq")}
                </Link>
                <Link
                  href="/terms"
                  className="text-grayFont hover:font-medium text-sm leading-none"
                >
                  {t("information.rentalTerms")}
                </Link>
                <Link
                  href="/policy"
                  className="text-grayFont hover:font-medium text-sm leading-none"
                >
                  {t("information.privacyPolicy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] m-auto">
          <div className="px-4 mobile:px-8 bigDesktop:px-0 py-6 text-grayFont text-sm">
            {t("copyright", { currentYear: currentYear })}
          </div>
        </div>
      </div>
    </footer>
  );
}
