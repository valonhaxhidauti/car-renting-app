import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import { BookingProvider } from "@/components/context/BookingContext";

const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: "Rent TU!",
  description: "Car renting app",
};

export default function RootLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <ViewTransitions>
      <html lang={locale}>
        <body className={font.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <BookingProvider>{children}</BookingProvider>
            <Toaster />
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
