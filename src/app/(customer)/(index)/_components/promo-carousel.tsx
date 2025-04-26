"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "./embla-carousel-dotbutton";
import Image from "next/image";
import Link from "next/link";

interface PromoCarouselProps {
  bannerPromo: {
    id: string;
    image_url: string;
  }[];
}
export default function PromoCarousel({ bannerPromo }: PromoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <>
      <div className="embla mx-auto relative" ref={emblaRef}>
        <div className="embla__container w-full">
          {bannerPromo.map((banner) => (
            <Link key={banner.id} href={`/catalog?promo=${banner.id}`} className="flex-[0_0_100%]">
              <Image src={banner.image_url} width={1000} height={1000} alt="promo banner" className="aspect-[21/9] border h-fit w-fit object-cover" />
            </Link>
          ))}
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
