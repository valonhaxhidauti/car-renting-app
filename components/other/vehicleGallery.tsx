"use client";

import { useRef } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

export default function VehicleGallery() {
  const flickingRef = useRef<Flicking | null>(null);
  const plugins = [new Arrow()];

  return (
    <>
      <PhotoProvider maskOpacity={0.8}>
        <Flicking
          ref={flickingRef}
          align="prev"
          circular={true}
          preventDefaultOnDrag
          plugins={plugins}
        >
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="mr-4 w-full mobile:w-1/2 laptop:w-1/3">
              <PhotoView src={`/carSwiperPhoto${item}.png`}>
                <Image
                  src={`/carSwiperPhoto${item}.png`}
                  alt={`Swiper ${item}`}
                  width={300}
                  height={200}
                  loading="lazy"
                  className="object-cover w-full"
                />
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
