"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CloseMenuIcon,
  HamburgerIcon,
  LoginIcon,
  Logo,
  LogoLight,
  LogoMenu,
} from "@/assets/svgs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSelector from "../ui/languageSelector";

export default function Header({
  background,
  fixed,
}: {
  background: boolean;
  fixed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const t = useTranslations("Header");

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
          <Link
            href="/"
            className="text-white border-white flex mb-3 tablet:mb-0 tablet:hidden font-bold border items-center gap-3 rounded-full h-6 p-4 text-sm"
          >
            <LoginIcon className="text-white" />
            {t("loginRegister")}
          </Link>
          <div className="flex gap-4 mb-3 tablet:mb-0">
            <Select>
              <SelectTrigger className="flex tablet:hidden border-white text-white w-[96px] border rounded-full h-6 py-4 px-2 g-2">
                {t("currencies.usd")}
                <ChevronDown className="text-white h-4 w-4" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>{t("currencies.label")}</SelectLabel>
                  <SelectItem value="usd">{t("currencies.usd")}</SelectItem>
                  <SelectItem value="eur">{t("currencies.eur")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <LanguageSelector
              isOpen={isOpen}
              triggerClass="border-white text-white flex tablet:hidden w-[65px] border rounded-full h-6 py-4 px-2 g-2"
            />
          </div>
          <Link href="/" className="flex group items-center gap-12">
            <p className="group-hover:font-bold">{t("homepage")}</p>
            <div className="hidden tablet:block rotate-180">
              <div className="w-40 h-1"></div>
              <div className="transition-all w-0 h-0.5 group-hover:w-40 bg-white"></div>
            </div>
          </Link>
          <Link href="/" className="flex group items-center gap-12">
            <p className="group-hover:font-bold">{t("exploreVehicles")}</p>
            <div className="hidden tablet:block rotate-180">
              <div className="w-40 h-1"></div>
              <div className="transition-all w-0 h-0.5 group-hover:w-40 bg-white"></div>
            </div>
          </Link>
          <Link href="/about" className="flex group items-center gap-12">
            <p className="group-hover:font-bold">{t("aboutUs")}</p>
            <div className="hidden tablet:block rotate-180">
              <div className="w-40 h-1"></div>
              <div className="transition-all w-0 h-0.5 group-hover:w-40 bg-white"></div>
            </div>
          </Link>
          <Link href="/faq" className="flex group items-center gap-12">
            <p className="group-hover:font-bold">{t("faq")}</p>
            <div className="hidden tablet:block rotate-180">
              <div className="w-40 h-1"></div>
              <div className="transition-all w-0 h-0.5 group-hover:w-40 bg-white"></div>
            </div>
          </Link>
          <Link href="/" className="flex group items-center gap-12">
            <p className="group-hover:font-bold">{t("rentalTerms")}</p>
            <div className="hidden tablet:block rotate-180">
              <div className="w-40 h-1"></div>
              <div className="transition-all w-0 h-0.5 group-hover:w-40 bg-white"></div>
            </div>
          </Link>
          <Link href="/policy" className="flex group items-center gap-12">
            <p className="group-hover:font-bold">{t("privacyPolicy")}</p>
            <div className="hidden tablet:block rotate-180">
              <div className="w-40 h-1"></div>
              <div className="transition-all w-0 h-0.5 group-hover:w-40 bg-white"></div>
            </div>
          </Link>
          <Link href="/contact" className="flex group items-center gap-12">
            <p className="group-hover:font-bold">{t("contact")}</p>
            <div className="hidden tablet:block rotate-180">
              <div className="w-40 h-1"></div>
              <div className="transition-all w-0 h-0.5 group-hover:w-40 bg-white"></div>
            </div>
          </Link>
          <div className="absolute bottom-10 left-4 tablet:left-8">
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
          } px-4 mobile:px-8 pt-14 pb-4 flex justify-between w-full max-w-[1440px] m-auto`}
        >
          <div className="flex justify-start gap-8 items-center ">
            {isOpen ? (
              <Link href="/">
                <LogoMenu />
              </Link>
            ) : (
              <Link href="/">{background ? <LogoLight /> : <Logo />}</Link>
            )}
            <div
              className={
                isOpen ? "hidden" : "flex justify-start gap-8 items-center"
              }
            >
              <Link
                href="/"
                className={`hidden desktop:flex px-1 font-bold hover:scale-105 transition-transform ${
                  background ? "text-white" : "text-gray"
                }`}
              >
                {t("homepage")}
              </Link>
              <Link
                href="/"
                className={`hidden desktop:inline px-1 font-bold hover:scale-105 transition-transform ${
                  background ? "text-white" : "text-gray"
                }`}
              >
                {t("exploreVehicles")}
              </Link>
              <Link
                href="/contact"
                className={`hidden desktop:inline px-1 font-bold hover:scale-105 transition-transform ${
                  background ? "text-white" : "text-gray"
                }`}
              >
                {t("contact")}
              </Link>
            </div>
          </div>
          <div className="flex justify-end gap-8 items-center">
            {isOpen && (
              <Select>
                <SelectTrigger className="hidden tablet:flex border-white hover:opacity-75 text-white w-[96px] border rounded-full ">
                  {t("currencies.usd")}
                  <ChevronDown
                    className={`${isOpen ? "text-white" : ""} h-4 w-4`}
                  />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>{t("currencies.label")}</SelectLabel>
                    <SelectItem value="usd">{t("currencies.usd")}</SelectItem>
                    <SelectItem value="eur">{t("currencies.eur")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <Link
              href="/"
              className={`${
                isOpen
                  ? "bg-none hover:opacity-75 text-white border-white hidden tablet:flex"
                  : "bg-white hover:bg-slate-50 text-gray border-gray hidden laptop:flex"
              } font-bold border py-2 px-6 items-center gap-3 rounded-full`}
            >
              <LoginIcon className={`${isOpen ? "text-white" : "text-gray"}`} />
              {t("loginRegister")}
            </Link>
            <LanguageSelector
              isOpen={isOpen}
              triggerClass={`${
                isOpen
                  ? "bg-none hover:opacity-75 border-white text-white hidden tablet:flex"
                  : "bg-white hover:bg-slate-50 border-gray hidden laptop:flex"
              } w-[65px] border rounded-full`}
            />
            <div
              className="cursor-pointer w-7 h-5 relative"
              onClick={toggleMenu}
            >
              <HamburgerIcon
                className={`${
                  isOpen ? "opacity-0" : "opacity-100 z-10"
                } transition-opacity text-gray hover:text-slate-900 duration-150 absolute right-0 top-0`}
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
