import React from "react";
import PromoCarousel from "./promo-carousel";
import { getBannerPromo } from "../lib/data";

export default async function ServerPromoCarousel() {
  const banner = await getBannerPromo();
  return (
    <>
      <PromoCarousel bannerPromo={banner} />
    </>
  );
}
