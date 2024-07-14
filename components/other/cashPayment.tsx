import { useTranslations } from "next-intl";

export default function CashPayment() {
  const t = useTranslations("vehiclePayment.payment");
  return (
    <div>
      <p className="text-grayFont font-medium">{t("payWithCash")}</p>
      <div>
        <input
          type="checkbox"
          id="terms"
          name="terms"
          className="cursor-pointer"
          required
        />
        <label
          htmlFor="terms"
          className="text-sm text-grayFont ml-2 cursor-pointer"
        >
          {t("termsLabel")}
        </label>
      </div>
    </div>
  );
}
