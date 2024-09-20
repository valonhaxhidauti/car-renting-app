"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const CookieConsent = () => {
    const t = useTranslations("CookieConsent");
    const [isConsentGiven, setIsConsentGiven] = useState<boolean>(true);

    useEffect(() => {
        const consent = sessionStorage.getItem("cookie-consent");
        setIsConsentGiven(consent === "true");
    }, []);

    const handleAccept = () => {
        sessionStorage.setItem("cookie-consent", "true");
        setIsConsentGiven(true);
    };

    if (isConsentGiven) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
            <p className="text-sm">
                {t("message")}{" "}
                <a href="/policy" className="underline text-blue-400">
                    {t("learnMore")}
                </a>
            </p>
            <button
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded ml-4"
            >
                {t("accept")}
            </button>
        </div>
    );
};

export default CookieConsent;
