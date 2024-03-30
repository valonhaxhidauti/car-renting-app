import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SideMenu() {
  const t = useTranslations("SideMenu");

  return (
    <div className="bg-primary hidden desktop:flex flex-col absolute -top-[60px] right-8 w-64">
      <p className="text-white p-4 text-lg font-medium border-b-[#4c95eb] border-b">
        {t("pages")}
      </p>
      <Link
        href="/about"
        className="text-white p-4 text-xs border-b-[#4c95eb] hover:font-medium border-b"
      >
        {t("about")}
      </Link>
      <Link
        href="/faq"
        className="text-white p-4 text-xs border-b-[#4c95eb] hover:font-medium border-b"
      >
        {t("faq")}
      </Link>
      <Link
        href="/"
        className="text-white p-4 text-xs border-b-[#4c95eb] hover:font-medium border-b"
      >
        {t("rentalTerms")}
      </Link>
      <Link
        href="/policy"
        className="text-white p-4 text-xs border-b-[#4c95eb] hover:font-medium border-b"
      >
        {t("privacyPolicy")}
      </Link>
      <Link
        href="/contact"
        className="text-white p-4 text-xs border-b-[#4c95eb] hover:font-medium "
      >
        {t("contact")}
      </Link>
    </div>
  );
}
