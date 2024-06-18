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
import { useEffect, useState } from "react";
import { useOverflowControl } from "../hooks/useOverflowControl";
import { useHandleLogout } from "../hooks/useHandleLogout";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";

interface HeaderAuthenticationProps {
  isOpen: boolean;
  triggerClassName: string;
  linkClassName: string;
}

export default function HeaderAuthentication({
  isOpen,
  triggerClassName,
  linkClassName,
}: HeaderAuthenticationProps) {
  const t = useTranslations("Header");
  const u = useTranslations("Account.sideMenu");

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const toggleShown = useOverflowControl(false);
  const handleLogout = useHandleLogout();

  useEffect(() => {
    const authValue = window.localStorage.getItem("authenticated");
    setAuthenticated(authValue === "true");
  }, []);

  function onSelectClicked() {
    toggleShown();
  }

  if (authenticated === null) {
    return null;
  }

  return authenticated ? (
    <Select onOpenChange={onSelectClicked}>
      <SelectTrigger className={triggerClassName}>
        <LoginIcon className={` ${isOpen ? "text-white" : "text-primary"}`} />
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
            href="/account/my-reservations"
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
    <Link href="/account" className={linkClassName}>
      <LoginIcon className={` ${isOpen ? "text-white" : "text-grayFont"}`} />
      {t("loginRegister")}
    </Link>
  );
}
