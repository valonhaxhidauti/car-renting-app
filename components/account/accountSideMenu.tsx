import { AccountIcon, LogoutIcon, ReservationIcon } from "@/assets/svgs";
import { useTranslations } from "next-intl";
import { useHandleLogout } from "../hooks/useHandleLogout";
import { Link } from "next-view-transitions";

export default function AccountSideMenu() {
  const t = useTranslations("Account.sideMenu");
  const handleLogout = useHandleLogout();

  return (
    <div className="bg-primary hidden desktop:flex flex-col absolute -top-[60px] right-8 w-64">
      <Link
        href="/account/personal-info"
        className="text-white flex items-center gap-2 p-[18px] text-xs border-b-borderMenu hover:font-medium border-b"
      >
        <AccountIcon />
        {t("personalInformations")}
      </Link>
      <Link
        href="/account/my-reservations"
        className="text-white flex items-center gap-2 p-[18px] text-xs border-b-borderMenu hover:font-medium border-b"
      >
        <ReservationIcon />
        {t("reservations")}
      </Link>
      <div
        onClick={handleLogout}
        className="text-white flex items-center gap-2 p-[18px] text-xs border-b-borderMenu hover:font-medium border-b cursor-pointer"
      >
        <LogoutIcon className="w-6" />
        {t("logOut")}
      </div>
    </div>
  );
}
