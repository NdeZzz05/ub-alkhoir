import { Suspense } from "react";
import ListCategory from "./_components/list-category";
import ListProduct from "./_components/list-product";
import { SearchForm } from "./_components/search-form";
import ServerPromoCarousel from "./_components/server-promo-carouel";
import { SkeletonLoading } from "./_components/sceleton-loading";

export default function Page() {
  return (
    <>
      <SearchForm />
      <header>
        <Suspense fallback={<SkeletonLoading width="w-[22rem]" height="h-[10rem]" />}>
          <ServerPromoCarousel />
        </Suspense>
      </header>
      <section id="content-category">
        <Suspense fallback={<SkeletonLoading width="w-[22rem]" height="h-[4rem]" />}>
          <ListCategory />
        </Suspense>
      </section>
      <section id="content-product">
        <Suspense fallback={<SkeletonLoading width="w-[22rem]" height="h-[15rem]" />}>
          <ListProduct />
        </Suspense>
      </section>
    </>
  );
}
