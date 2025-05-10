import { Suspense } from "react";
import ListCategory from "./_components/list-category";
import ListProduct from "./_components/list-product";
import { SearchForm } from "./_components/search-form";
import ServerPromoCarousel from "./_components/server-promo-carousel";
import Loading from "./_components/loading";

export default function Page() {
  return (
    <>
      <SearchForm />
      <Suspense fallback={<Loading />}>
        <header>
          <ServerPromoCarousel />
        </header>
        <section id="content-category">
          <ListCategory />
        </section>
        <section id="content-product">
          <ListProduct />
        </section>
      </Suspense>
    </>
  );
}
