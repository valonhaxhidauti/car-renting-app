import {
  AccountIcon,
  EditIcon,
  LogoutIcon,
  ReservationIcon,
} from "@/assets/svgs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function AccountSideMenu() {
  const t = useTranslations("Account.sideMenu");

  return (
    <div className="bg-primary hidden desktop:flex flex-col absolute -top-[60px] right-8 w-64">
      <div className="text-white flex justify-between items-center px-4 py-2 text-xs border-b-borderMenu border-b">
        <p>Benjamin Evans</p>
        <div className="relative">
          <Image src="/avatarImg.png" alt="avatar" width={45} height={45} />
          <div className="w-3 h-3 cursor-pointer bg-white flex items-center justify-center rounded-full absolute top-0 right-0">
            <EditIcon />
          </div>
        </div>
      </div>
      <Link
        href="/account/personal-info"
        className="text-white flex items-center gap-2 p-4 text-xs border-b-borderMenu hover:font-medium border-b"
      >
        <AccountIcon />
        {t("personalInformations")}
      </Link>
      <Link
        href="#"
        className="text-white flex items-center gap-2 p-4 text-xs border-b-borderMenu hover:font-medium border-b"
      >
        <ReservationIcon />
        {t("reservations")}
      </Link>
      <Link
        href="#"
        className="text-white flex items-center gap-2 p-4 text-xs border-b-borderMenu hover:font-medium border-b"
      >
        <LogoutIcon className="w-6" />
        {t("logOut")}
      </Link>
    </div>
  );
}
