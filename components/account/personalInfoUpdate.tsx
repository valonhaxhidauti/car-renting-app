"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { UpdateFormValues } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import UpdateInfoForm from "./updateInfoForm";
import ChangePassword from "./changePassword";
import AccountSideMenu from "./accountSideMenu";
import { Breadcrumbs, HeadingTitle } from "../common/headingParts";

export default function PersonalInfoUpdate() {
  const t = useTranslations("Account.personalInfo");
  const u = useTranslations("Account");
  const locale = useTranslations()("Locale");
  const { toast } = useToast();
  const [internalServerError, setInternalServerError] = useState("");

  const [errors, setErrors] = useState<Partial<UpdateFormValues>>({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [unprocessedErrorMessage, setUnprocessedErrorMessage] = useState("");

  const [formData, setFormData] = useState<UpdateFormValues>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    birthday: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch(
            "https://rent-api.rubik.dev/api/my-profiles",
            {
              method: "GET",
              headers: {
                "Accept-Language": locale,
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const userProfile = data.data.attributes;

            setFormData({
              name: userProfile.first_name || "",
              surname: userProfile.last_name || "",
              email: userProfile.email || "",
              phone: userProfile.phone || "",
              birthday: userProfile.date_of_birth || "",
            });
            setLoading(false);
          } else {
            const errorData = await response.json();
            setInternalServerError(errorData.detail);
            setLoading(false);
          }
        } catch (error) {
          setUnprocessedErrorMessage(u("profileFetchError"));
          setLoading(false);
        }
      } else {
        setUnprocessedErrorMessage(u("profileTokenError"));
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast({
        variant: "success",
        description: successMessage,
      });

      setSuccessMessage("");
    } else if (unprocessedErrorMessage) {
      toast({
        variant: "destructive",
        description: unprocessedErrorMessage,
      });

      setUnprocessedErrorMessage("");
    }
  }, [successMessage, unprocessedErrorMessage, toast]);

  const handleInputChange = (
    fieldName: keyof UpdateFormValues,
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {internalServerError ? (
        <>
          <div className="bg-bgSecondary w-full py-16">
            <div className="max-w-[1440px] m-auto">
              <div className="relative mx-0 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 mobile:px-8 pb-8 flex flex-col">
                <div className="flex flex-col w-full gap-8 mt-16">
                  <h1 className="text-grayFont text-3xl font-bold">
                    {t("heading")}
                  </h1>
                  <div>
                    <p className="text-primary text-lg font-bold">
                      {internalServerError} Please check your email in order to
                      verify it!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <HeadingTitle title={t("breadcrumb.homepage")} />
          <div className="bg-bgSecondary w-full pb-16">
            <Breadcrumbs translations={t} />
            <div className="max-w-[1440px] m-auto">
              <div className="relative mx-0 mobile:mx-8 bigDesktop:mx-0 bg-white px-4 mobile:px-8 pb-8 flex flex-col">
                <AccountSideMenu />
                <div className="flex flex-col w-full gap-8 mt-16">
                  <h1 className="text-grayFont text-3xl font-bold">
                    {t("heading")}
                  </h1>
                  <UpdateInfoForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    setSuccessMessage={setSuccessMessage}
                    setUnprocessedErrorMessage={setUnprocessedErrorMessage}
                    errors={errors}
                    setErrors={setErrors}
                    locale={locale}
                  />
                  <ChangePassword
                    setSuccessMessage={setSuccessMessage}
                    setUnprocessedErrorMessage={setUnprocessedErrorMessage}
                    locale={locale}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
