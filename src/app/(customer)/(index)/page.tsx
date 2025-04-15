import { Suspense } from "react";
import ListCategory from "./_components/list-category";
import ListProduct from "./_components/list-product";
import { SearchForm } from "./_components/search-form";
import ServerPromoCarousel from "./_components/server-promo-carouel";

export default function Page() {
  return (
    <>
      <SearchForm />
      <header>
        <Suspense fallback={<span>Loading...</span>}>
          <ServerPromoCarousel />
        </Suspense>
      </header>
      <section id="content-category">
        <Suspense fallback={<span>Loading...</span>}>
          <ListCategory />
        </Suspense>
      </section>
      <section id="content-product">
        <Suspense fallback={<span>Loading...</span>}>
          <ListProduct />
        </Suspense>
      </section>
    </>
  );
}
