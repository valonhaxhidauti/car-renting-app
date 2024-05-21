import { Ambulance } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NoVehiclesFound() {
  const t = useTranslations("ExploreVehicles.notFound");

  return (
    <div className="flex flex-col items-center justify-center bg-white w-full laptop:h-1/2 px-4 py-16">
      <Ambulance size={125} strokeWidth={0.75} className="text-primary" />
      <p className="text-grayFont text-lg font-bold mb-2">{t("title")}</p>
      <p className="text-grayFont text-center">{t("description")}</p>
    </div>
  );
}
