import { useTranslations } from "next-intl";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Link } from "next-view-transitions";

export default function TwintPayment() {
  const t = useTranslations("vehiclePayment.payment");
  return (
    <div>
      <p className="text-grayFont font-medium">{t("payWithTwint")}</p>
      <div className="flex flex-col mt-8">
        <div className="flex items-center">
          <Checkbox id="terms" className="mr-2" required />
          <Label
            htmlFor="terms"
            className="text-sm text-grayFont cursor-pointer"
          >
            {t("termsLabel")}
          </Label>
        </div>

        <Link href="/terms" className="ml-6 text-blue-500 underline text-sm">
          {t("readTerms")}
        </Link>
      </div>
    </div>
  );
}
