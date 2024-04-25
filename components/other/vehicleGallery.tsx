"use client";

import { useRef } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import { ZoomImageIcon } from "@/assets/svgs";

export default function VehicleGallery() {
  const flickingRef = useRef<Flicking | null>(null);
  const plugins = [new Arrow()];

  return (
    <>
      <PhotoProvider maskOpacity={0.8}>
        <Flicking
          ref={flickingRef}
          align="prev"
          bound={true}
          preventDefaultOnDrag
          plugins={plugins}
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="mr-4 w-full max-h-48 mobile:w-1/2 laptop:w-1/3"
            >
              <PhotoView src={`/carSwiperPhoto${item}.png`}>
                <div className="relative group">
                  <Image
                    src={`/carSwiperPhoto${item}.png`}
                    alt={`Gallery_${item}`}
                    width={300}
                    height={200}
                    loading="lazy"
                    className="object-cover w-full group-hover:opacity-95 group-hover:cursor-pointer transition-opacity duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 cursor-pointer transition-opacity duration-300 ease-in-out"></div>
                  <ZoomImageIcon className="hidden group-hover:block group-hover:cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                </div>
              </PhotoView>
            </div>
          ))}
          <ViewportSlot>
            <span className="flicking-arrow-prev is-thin"></span>
            <span className="flicking-arrow-next is-thin"></span>
          </ViewportSlot>
        </Flicking>
      </PhotoProvider>
    </>
  );
}
