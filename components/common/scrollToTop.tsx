import { ChevronUp } from "lucide-react";
import React from "react";

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="hidden laptop:block bg-white cursor-pointer rounded-full p-3 border-borderGray border-2 absolute bottom-16 right-8"
      onClick={scrollToTop}
    >
      <ChevronUp size={32} className="text-grayFont" />
    </div>
  );
}
