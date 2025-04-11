import { TDetailProduct } from "@/types";
import Image from "next/image";
import React from "react";
import { getProductById } from "../lib/data";
import { redirect } from "next/navigation";
import { rupiahFormat } from "@/lib/utils";
import ButtonAddCart from "../../_components/button-add-cart";
import BackButton from "../../_components/back-button";

export default async function DetailProductPage({ params }: TDetailProduct) {
  const { id } = await Promise.resolve(params);
  const product = await getProductById(id);

  if (!product) {
    return redirect("/");
  }
  return (
    <>
      <header className="bg-gray-50 w-full p-2">
        <BackButton />
      </header>
      <section id="detailProduct" className="w-full p-2">
        <Image src={product.image_url} alt={product.name} loading="lazy" className="aspect-[1/1] h-fit w-full object-cover rounded-t-md border" width={500} height={500} />
        <div className="flex justify-between items-center py-2">
          <p className="font-bold text-2xl text-primary">{rupiahFormat(Number(product.price))}</p>
          <p className="text-sm">{product._count.order_product} Terjual</p>
        </div>
        <div className="py-2">
          <h2 className="font-bold text-xl">{product.name}</h2>
        </div>
        <hr className="border-gray-100" />
        <div className="py-2 flex justify-end">
          <ButtonAddCart
            item={{
              id: product.id,
              name: product.name,
              price: product.price,
              image_url: product.image_url,
              category: product.category,
            }}
            className=""
          />
        </div>
        <hr className="border-gray-100" />
        <div className="py-2 pb-14">
          <h3 className="text-sm font-semibold">Deskripsi Produk</h3>
          <p className="text-gray-500">{product.description}</p>
        </div>
      </section>
    </>
  );
}
