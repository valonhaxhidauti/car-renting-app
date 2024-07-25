import { useTranslations } from "next-intl";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function CashPayment() {
  const t = useTranslations("vehiclePayment.payment");
  return (
    <div>
      <p className="text-grayFont font-medium">{t("payWithCash")}</p>
      <div className="flex items-center mt-4">
        <Checkbox id="terms" className="mr-2" required />
        <Label htmlFor="terms" className="text-sm text-grayFont cursor-pointer">
          {t("termsLabel")}
        </Label>
      </div>
    </div>
  );
}
