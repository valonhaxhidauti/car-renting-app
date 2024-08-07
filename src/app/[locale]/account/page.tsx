"use client";

import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import LoginForm from "@/components/account/loginForm";
import RegisterForm from "@/components/account/registerForm";

export default function Account() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/account/personal-info");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return null;
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
