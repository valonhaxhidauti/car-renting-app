import { useRef } from "react";
import { Arrow } from "@egjs/flicking-plugins";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { ZoomImageIcon } from "@/assets/svgs";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import Image from "next/image";
import "react-photo-view/dist/react-photo-view.css";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

export default function VehicleGallery({ images }: { images: any }) {
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
          className="w-full"
        >
          {images.map((item: any) => (
            <div key={item} className="mr-4 w-full mobile:w-1/2 laptop:w-1/3">
              <PhotoView src={`${item.attributes.public_url}`}>
                <div className="relative group">
                  <Image
                    src={`${item.attributes.public_url}`}
                    alt={`Gallery_${item}`}
                    width={300}
                    height={200}
                    loading="lazy"
                    className="object-fit mobile:!h-full w-auto h-auto"
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
