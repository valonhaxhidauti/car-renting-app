import Image from "next/image";
import Link from "next/link";
import {
  HamburgerIcon,
  LoginIcon,
  Logo,
  LogoLight,
  UkIcon,
} from "@/assets/svgs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";

export default function Header({ background }: { background: boolean }) {
  return (
    <header className="px-16 pt-14 fixed top-0 z-10 w-full">
      <div className="flex justify-between w-full max-w-[1440px] m-auto">
        <div className="flex justify-start gap-8 items-center ">
          <Link href="/">
            {background ? (
              <>
              <LogoLight className="hidden desktop:block" />
              <Logo className="block desktop:hidden"/>
              </>
            ) : (
              <Logo />
            )}
          </Link>
          <Link
            href="/"
            className={`hidden desktop:flex px-1 font-bold hover:scale-105 transition-transform ${
              background ? "text-white" : "text-[#5a5a5a]"
            }`}
          >
            Homepage
          </Link>
          <Link
            href="/"
            className={`hidden desktop:inline px-1 font-bold hover:scale-105 transition-transform ${
              background ? "text-white" : "text-[#5a5a5a]"
            }`}
          >
            Explore Vehicles
          </Link>
          <Link
            href="/contact"
            className={`hidden desktop:inline px-1 font-bold hover:scale-105 transition-transform ${
              background ? "text-white" : "text-[#5a5a5a]"
            }`}
          >
            Contact
          </Link>
        </div>
        <div className="flex justify-end gap-8 items-center bg-white">
          <Link
            href="/"
            className="hidden desktop:flex font-bold text-[#5a5a5a] border border-[#5a5a5a] py-2 px-6 items-center gap-3 rounded-full"
          >
            <LoginIcon />
            LOGIN or REGISTER
          </Link>
          <Select>
            <SelectTrigger className="hidden desktop:flex w-[65px] border border-[#5a5a5a] rounded-full">
              <UkIcon />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <HamburgerIcon />
        </div>
      </div>
    </header>
  );
}
