import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useOverflowControl } from "../hooks/useOverflowControl";
import { useTranslations } from "next-intl";

export default function VehicleSort() {
  const t = useTranslations("ExploreVehicles");
  const router = useRouter();
  const [currentSort, setCurrentSort] = useState("default");
  const toggleShown = useOverflowControl(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const initialSort = queryParams.get("sort") || "default";
    setCurrentSort(initialSort);
  }, [router]);

  function onSelectClicked() {
    toggleShown();
  }

  const handleSortChange = (sortBy: string) => {
    const queryParams = new URLSearchParams(window.location.search);

    if (sortBy === currentSort) {
      queryParams.delete("sort");
      setCurrentSort("default");
    } else {
      queryParams.set("sort", sortBy);
      setCurrentSort(sortBy);
    }

    const queryString = queryParams.toString();
    router.push(`explore?${queryString}`);
  };

  return (
    <div className="flex gap-2 items-center text-sm">
      <Select
        value={currentSort}
        onValueChange={handleSortChange}
        onOpenChange={onSelectClicked}
      >
        <SelectTrigger className="flex border-borderGray border-2 text-grayFont text-xs font-medium rounded-full h-8 gap-2 px-2">
          {t("sortBy")}
          <SelectValue />
          <ChevronDown className="text-grayFont font-medium h-4 w-4" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectItem value="default">{t("default")}</SelectItem>
            <SelectItem value="yearDesc">{t("modelYearDesc")}</SelectItem>
            <SelectItem value="yearAsc">{t("modelYearAsc")}</SelectItem>
            <SelectItem value="priceDesc">{t("priceDesc")}</SelectItem>
            <SelectItem value="priceAsc">{t("priceAsc")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
