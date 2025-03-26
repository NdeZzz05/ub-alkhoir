"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "./embla-carousel-dotbutton";
import Image from "next/image";
import imageMinyak from "../../../../../public/promo-minyak.png";
import imageMie from "../../../../../public/promomie.png";
export default function PromoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <>
      <div className="embla mx-auto relative" ref={emblaRef}>
        <div className="embla__container w-full">
          <Image src={imageMinyak} width={1000} height={1000} alt="a" className="aspect-[21/9] border h-fit w-fit object-cover" />
          <Image src={imageMie} width={1000} height={1000} alt="a" className="aspect-[21/9] border h-fit w-fit object-cover" />
        </div>
        <div className="flex justify-center items-center absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="embla__dots gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton key={index} onClick={() => onDotButtonClick(index)} className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
