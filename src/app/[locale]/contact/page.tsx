import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations();
  t("Index.title");

  return <div>{t("Header.aboutUs")}</div>;
}
