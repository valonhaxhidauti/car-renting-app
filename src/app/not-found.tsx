"use client";

import Header from "@/components/layout/header";
import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Header background={false} />
        <Error statusCode={404} />
      </body>
    </html>
  );
}
