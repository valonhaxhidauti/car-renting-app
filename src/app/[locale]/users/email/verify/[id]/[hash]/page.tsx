"use client";

import { Breadcrumbs } from "@/components/common/headingParts";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail({
  params,
}: {
  params: { id: number; hash: string };
}) {
  const t = useTranslations("VerifyEmail");

  const searchParams = useSearchParams();
  const emailParameter = searchParams.get("email") || "";
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const url = new URL(
        `https://rent-api.rubik.dev/api/auth/email/verify/${params.id}/${params.hash}`
      );

      const parameters: { [key: string]: string } = {
        expires: searchParams.get("expires") || "",
        signature: searchParams.get("signature") || "",
      };

      Object.keys(parameters).forEach((key) =>
        url.searchParams.append(key, parameters[key])
      );

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      try {
        const response = await fetch(url.toString(), {
          method: "PUT",
          headers,
        });

        if (response.ok) {
          console.log("Email verified successfully");
        } else {
          console.error("Failed to verify email");
          setVerificationFailed(true);
        }
      } catch (error) {
        console.error("An error occurred while verifying email:", error);
        setVerificationFailed(true);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  return (
    <>
      <Header background={false} fixed={false} />
      <div className="bg-bgSecondary w-full pb-16">
        <Breadcrumbs translations={t} />
        <div className=" max-w-[1440px] m-auto">
          <div className="relative bg-white mx-0 mobile:mx-8 bigDesktop:mx-0 px-4 desktop:px-8 py-8 flex flex-col">
            <div className="flex flex-col w-full items-start">
              <h1 className="mb-6 text-primary text-4xl font-bold">
                {t("emailVerification.title")}
              </h1>
              {loading ? (
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-6 rounded-md w-60" />
                </div>
              ) : (
                <>
                  {verificationFailed ? (
                    <div className="text-red-500 font-bold">
                      {t("emailVerification.verificationFailed")}
                    </div>
                  ) : (
                    <div className="w-60">
                      <p className="text-grayFont">
                        {t("emailVerification.verifiedEmail")}
                      </p>
                      <Input
                        disabled
                        type="email"
                        placeholder={emailParameter}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
