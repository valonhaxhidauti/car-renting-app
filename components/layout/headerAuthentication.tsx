"use client";

import { useEffect, useState } from "react";
import {
  AccountIcon,
  LoginIcon,
  LogoutIcon,
  ReservationIcon,
} from "@/assets/svgs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "../ui/select";
import { useHandleLogout } from "../hooks/useHandleLogout";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";

export default function HeaderAuthentication({isOpen}:{isOpen:boolean}) {
  const t = useTranslations("Header");
  const u = useTranslations("Account.sideMenu");
  const [shown, setShown] = useState(false);

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const handleLogout = useHandleLogout();

  useEffect(() => {
    const authValue = window.localStorage.getItem("authenticated");
    setAuthenticated(authValue === "true");
  }, []);

  function onSelectClicked() {
    setShown(!shown);
  }

  if (authenticated === null) {
    return null;
  }

  return authenticated ? (
    <Select onOpenChange={onSelectClicked}>
      <SelectTrigger
        className={`${
          isOpen
            ? "bg-none hover:opacity-75 text-white border-white hidden tablet:flex"
            : "bg-white hover:bg-slate-50 text-primary border-borderGray hidden laptop:flex"
        } font-bold border py-2 px-6 items-center rounded-full`}
      >
        <LoginIcon className={` ${isOpen ? "text-white" : " text-primary"}`} />
        {t("myAccount")}
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup className="flex flex-col gap-4 p-4">
          <Link
            href="/account/personal-info"
            className="text-grayFont flex items-center gap-2 group hover:text-primary"
          >
            <AccountIcon className="text-gray-font group-hover:text-primary" />
            {u("personalInformations")}
          </Link>
          <Link
            href="#"
            className="text-grayFont flex items-center gap-2 group hover:text-primary"
          >
            <ReservationIcon className="text-gray-font group-hover:text-primary" />
            {u("reservations")}
          </Link>
          <div
            onClick={handleLogout}
            className="text-grayFont flex items-center gap-2 cursor-pointer group hover:text-primary"
          >
            <div className="w-6">
              <LogoutIcon className="text-gray-font group-hover:text-primary" />
            </div>
            {u("logOut")}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <Link
      href="/account"
      className={`${
        isOpen
          ? "bg-none hover:opacity-75 text-white border-white hidden tablet:flex"
          : "bg-white hover:bg-slate-50 text-grayFont border-borderGray hidden laptop:flex"
      } font-bold border py-2 px-6 items-center gap-3 rounded-full`}
    >
      <div className="">
        <LoginIcon className={` ${isOpen ? "text-white" : "text-grayFont"}`} />
      </div>
      {t("loginRegister")}
    </Link>
  );
}
