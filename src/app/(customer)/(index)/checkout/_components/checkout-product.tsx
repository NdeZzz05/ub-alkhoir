"use client";

import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CheckoutProduct() {
  const { products } = useCart();
  return (
    <>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 gap-4 text-gray-600">
          <div>
            <p className="text-lg font-semibold">Oops, keranjangmu masih kosong</p>
            <p className="text-sm max-w-sm mx-auto text-gray-500">Yuk, cari produk favoritmu dan mulai belanja sekarang!</p>
          </div>
          <Link href="/" className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        products.map((item) => (
          <div key={item.id} className="bg-white flex rounded-md ring-1 ring-[#E5E5E5] mb-2">
            <Image src={item.image_url} alt={item.name} loading="lazy" className="aspect-[1/1] h-fit w-fit object-cover rounded-t-md p-2" width={40} height={40} />
            <div className="w-full">
              <div className="p-2 flex flex-col justify-between h-full">
                <p className="font-medium text-sm">{item.name}</p>
                <div className="flex justify-between items-center">
                  {item.discount_percentage && item.discount_percentage > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="text-red-600 font-bold text-base">{rupiahFormat(item.price)}</div>
                      <div className="line-through text-sm text-muted-foreground">{rupiahFormat(item.original_price!)}</div>
                    </div>
                  ) : (
                    <div className="font-bold text-base text-primary">{rupiahFormat(item.price)}</div>
                  )}
                  <p className="font-normal text-center text-sm">{item.quantity} Pcs</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
