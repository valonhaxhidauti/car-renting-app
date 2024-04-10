"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Header background={false} fixed={false} />
        <Error statusCode={404} />
        <Footer/>
      </body>
    </html>
  );
}
