import { Suspense } from "react";
import ListCategory from "./_components/list-category";
import PromoCarousel from "./_components/promo-carousel";
import ListProduct from "./_components/list-product";
import { SearchForm } from "./_components/search-form";

export default function Page() {
  return (
    <>
      <SearchForm />
      <header>
        <PromoCarousel />
      </header>
      <section id="content">
        <Suspense fallback={<span>Loading...</span>}>
          <ListCategory />
        </Suspense>
        <Suspense fallback={<span>Loading...</span>}>
          <ListProduct />
        </Suspense>
      </section>
    </>
  );
}
