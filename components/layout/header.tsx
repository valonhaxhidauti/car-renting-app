"use client";

import {
  CloseMenuIcon,
  HamburgerIcon,
  Logo,
  LogoLight,
  LogoMenu,
} from "@/assets/svgs";
import { useState } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { clearAppliedFilters } from "@/lib/utils";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSelector from "../common/languageSelector";
import HeaderAuthentication from "./headerAuthentication";

export default function Header({
  background,
  fixed,
}: {
  background: boolean;
  fixed: boolean;
}) {
  const t = useTranslations("Header");

  const [isOpen, setIsOpen] = useState(false);

  const { params, filters } = useCustomSearchParams();
  const pathname = usePathname();
  const isExplorePage =
    pathname === "/en/explore" || pathname === "/de/explore";

  const clearFilters = () => {
    if (!isExplorePage) {
      clearAppliedFilters();
    } else return;
  };

  const currentYear = new Date().getFullYear();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: "/", label: t("homepage") },
    {
      href: `/explore?rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}&sort=${filters.sort}&filter[carClass]=${filters.carClass}&filter[carType]=${filters.carType}&filter[gearType]=${filters.gearType}&filter[fuelType]=${filters.fuelType}`,
      label: t("exploreVehicles"),
      onClick: clearFilters,
    },
    { href: "/about", label: t("aboutUs") },
    { href: "/faq", label: t("faq") },
    { href: "/terms", label: t("rentalTerms") },
    { href: "/policy", label: t("privacyPolicy") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <nav
        className={`${
          isOpen
            ? "left-0 top-0 tablet:top-0 transition-[left] tablet:transition-[top] tablet:duration-300 "
            : "-left-[105%] tablet:-top-full transition-none"
        } fixed z-10 w-screen h-screen bg-primary`}
      >
        <Image
          alt="Menu Background Image"
          src="/menuBackground.png"
          fill
          sizes="100%"
          className="object-cover"
        />
        <div className="flex flex-col text-white justify-center relative items-center tablet:items-end w-full h-full gap-2 tablet:gap-4 max-w-[1440px] m-auto">
          <HeaderAuthentication
            isOpen={isOpen}
            triggerClassName="text-white border-borderGray border w-fit gap-4 flex tablet:hidden font-bold h-[34px] px-6 items-center rounded-full mb-2 tablet:mb-0"
            linkClassName="text-white border-white flex mb-2 tablet:mb-0 tablet:hidden font-bold border items-center gap-3 rounded-full h-6 p-4 text-sm"
          />
          <LanguageSelector
            isOpen={isOpen}
            triggerClass="border-white text-white flex mb-2 tablet:mb-0 tablet:hidden w-[65px] border rounded-full h-6 py-4 px-2"
          />
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={link.onClick}
              className="flex group items-center gap-12"
            >
              <p className="group-hover:font-bold">{link.label}</p>
              <div className="hidden tablet:block rotate-180">
                <div className="w-40 h-1"></div>
                <div className="transition-all w-0 h-0.5 group-hover:w-40 bg-white"></div>
              </div>
            </Link>
          ))}
          <div className="absolute bottom-10 left-4 mobile:left-8 bigDesktop:left-0">
            <p>{t("copyright", { currentYear: currentYear })}</p>
          </div>
        </div>
      </nav>
      <header
        className={`${
          fixed
            ? "fixed"
            : isOpen
            ? "sticky"
            : "sticky bg-white border-b border-border"
        } top-0 left-0 z-10 w-full `}
      >
        <div
          className={`${
            isOpen ? "opacity-95" : ""
          } px-4 mobile:px-8 bigDesktop:px-0 pt-14 pb-4 flex justify-between w-full max-w-[1440px] m-auto`}
        >
          <div className="flex justify-start gap-8 items-center ">
            {isOpen ? (
              <Link href="/">
                <LogoMenu />
              </Link>
            ) : (
              <Link aria-label="homepage" href="/">
                {background ? <LogoLight /> : <Logo />}
              </Link>
            )}
            <div
              className={
                isOpen ? "hidden" : "flex justify-start gap-8 items-center"
              }
            >
              <Link
                href="/"
                className={`hidden desktop:flex px-1 font-bold hover:scale-105 transition-transform ${
                  background ? "text-white" : "text-grayFont"
                }`}
              >
                {t("homepage")}
              </Link>
              <Link
                onClick={clearFilters}
                href={`/explore?rentLocation=${params.rentLocation}&returnLocation=${params.returnLocation}&pickupDate=${params.pickupDate}&dropOffDate=${params.dropOffDate}&sort=${filters.sort}&filter[carClass]=${filters.carClass}&filter[carType]=${filters.carType}&filter[gearType]=${filters.gearType}&filter[fuelType]=${filters.fuelType}`}
                className={`cursor-pointer hidden desktop:inline px-1 font-bold hover:scale-105 transition-transform ${
                  background ? "text-white" : "text-grayFont"
                }`}
              >
                {t("exploreVehicles")}
              </Link>
              <Link
                href="/contact"
                className={`hidden desktop:inline px-1 font-bold hover:scale-105 transition-transform ${
                  background ? "text-white" : "text-grayFont"
                }`}
              >
                {t("contact")}
              </Link>
            </div>
          </div>
          <div className="flex justify-end gap-8 items-center">
            <HeaderAuthentication
              isOpen={isOpen}
              triggerClassName={`${
                isOpen
                  ? "bg-none hover:opacity-75 text-white border-white hidden tablet:flex"
                  : "bg-white hover:bg-slate-50 text-primary border-borderGray hidden laptop:flex"
              } font-bold border py-2 px-6 items-center rounded-full`}
              linkClassName={`${
                isOpen
                  ? "bg-none hover:opacity-75 text-white border-white hidden tablet:flex"
                  : "bg-white hover:bg-slate-50 text-grayFont border-borderGray hidden laptop:flex"
              } font-bold border py-2 px-6 items-center gap-3 rounded-full`}
            />
            <LanguageSelector
              isOpen={isOpen}
              triggerClass={`${
                isOpen
                  ? "bg-none hover:opacity-75 border-white text-white hidden tablet:flex"
                  : "bg-white hover:bg-slate-50 border-borderGray hidden laptop:flex"
              } w-[65px] border rounded-full`}
            />
            <div
              className="cursor-pointer w-7 h-5 relative"
              onClick={toggleMenu}
            >
              <HamburgerIcon
                className={`${
                  isOpen ? "opacity-0" : "opacity-100 z-10"
                } transition-opacity text-grayFont hover:text-slate-900 duration-150 absolute right-0 top-0`}
              />
              <CloseMenuIcon
                className={`${
                  isOpen ? "opacity-100 z-20" : "opacity-0"
                } transition-opacity text-white hover:text-slate-200 duration-150 absolute right-0 top-0`}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
