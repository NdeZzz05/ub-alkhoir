"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../lib/data";
import CardProduct from "../../_components/card-product";
import { TFilter, useFilter } from "@/hooks/useFilter";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ListProduct() {
  const { filter } = useFilter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const promoFromUrl = searchParams.get("promo");
  const { setFilter } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["list-product", filter],
    queryFn: () => fetchProduct(filter),
  });

  useEffect(() => {
    const newFilter: Partial<TFilter> = {};

    if (categoryFromUrl) newFilter.category = [categoryFromUrl];
    if (promoFromUrl) newFilter.promo = promoFromUrl;

    if (Object.keys(newFilter).length > 0) {
      setFilter(newFilter);
    }
  }, [categoryFromUrl, setFilter, promoFromUrl]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div id="products" className="flex flex-col p-2">
      <h2 className="font-bold text-base p-1">Produk</h2>
      <div className="grid grid-cols-2 gap-2 p-1 pb-16">
        {data?.map((item) => (
          <CardProduct item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
