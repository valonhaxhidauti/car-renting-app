import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/context/authContext";
import { BookingProvider } from "@/components/context/bookingContext";
import "../globals.css";
import { unstable_setRequestLocale } from 'next-intl/server';
import CookieConsent from "@/components/other/cookieConsent";

const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: "Abag Rent!",
  description: "Car renting app",
};

export default function RootLayout({ children, params: { locale } }: Props) {

  // Set locale statically
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
      <ViewTransitions>
        <html lang={locale}>
        <body className={font.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BookingProvider>
            <AuthProvider>{children}</AuthProvider>
          </BookingProvider>
          <Toaster />

          {/* Include your custom Cookie Consent component */}
          <CookieConsent />

        </NextIntlClientProvider>
        </body>
        </html>
      </ViewTransitions>
  );
}
