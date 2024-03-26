import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations();

  return <div>{t("Header.contact")}</div>;
}
