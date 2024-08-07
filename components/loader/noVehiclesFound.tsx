import { useTranslations } from "next-intl";

export default function NoVehiclesFound() {
  const t = useTranslations("ExploreVehicles.notFound");

  return (
    <div className="flex flex-col items-center justify-center bg-white w-full laptop:h-1/2 px-4 py-16">
      <p className="text-grayFont text-lg font-bold mb-2">{t("title")}</p>
      <p className="text-grayFont text-center">{t("description")}</p>
    </div>
  );
}
