"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import LoginForm from "@/components/general/logInForm";
import RegisterForm from "@/components/general/registerForm";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const item = window.localStorage.getItem("authenticated");
    if (item) {
      router.push("/account/personal-info");
    }
  }

  return (
    <>
      <Header background={false} fixed={false} />
      <div className="bg-bgSecondary w-full pb-16 pt-8">
        <div className="max-w-[1440px] m-auto px-4 mobile:px-8 flex flex-col desktop:flex-row gap-24 mobile:gap-16 desktop:gap-0">
          <LoginForm />
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
