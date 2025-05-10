"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../lib/data";
import CardProduct from "../../_components/card-product";
import { TFilter, useFilter } from "@/hooks/useFilter";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "../../_components/loading";

export default function ListProduct() {
  const { filter } = useFilter();
  const searchParams = useSearchParams();
  const { setFilter } = useFilter();
  const promoFromUrl = searchParams.get("promo");
  const categoryFromUrl = searchParams.getAll("category");
  const initialized = useRef(false);

  const { data, isLoading } = useQuery({
    queryKey: ["list-product", filter],
    queryFn: () => fetchProduct(filter),
  });

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const newFilter: Partial<TFilter> = {};

    if (categoryFromUrl.length > 0) newFilter.category = categoryFromUrl;
    if (promoFromUrl) newFilter.promo = promoFromUrl;

    if (Object.keys(newFilter).length > 0) {
      setFilter({
        ...filter,
        ...newFilter,
      });
    }
  }, []);

  if (isLoading)
    return (
      <div className="w-96">
        <Loading />
      </div>
    );

  return (
    <div id="products" className="flex flex-col p-2">
      <h2 className="font-bold text-base p-1">Produk</h2>
      {data?.length === 0 ? (
        <div className="w-96 flex flex-col items-center justify-center text-center py-10 gap-2 text-gray-600 ">
          <p className="text-lg font-semibold">Oops, produk tidak ditemukan</p>
          <p className="text-sm">Coba gunakan kata kunci atau filter yang lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-1 pb-16">{data?.map((item) => <CardProduct item={item} key={item.id} />)}</div>
      )}
    </div>
  );
}
