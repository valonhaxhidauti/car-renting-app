import Image from "next/image";
import React from "react";
import Header from "@/components/layout/header";

export default function Homepage() {
  return (
    <div className="relative h-screen">
      <Header background={true}/>
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative">
          <Image
            alt="homepage"
            src="/homepageBg.png"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        </div>
        <div className="w-1/2 p-8 flex items-center justify-center">
          <div className="text-center">
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
          </div>
        </div>
      </div>
    </div>
  );
}
