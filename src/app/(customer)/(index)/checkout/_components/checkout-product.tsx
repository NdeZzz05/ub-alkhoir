"use client";

import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function CheckoutProduct() {
  const { products } = useCart();
  return (
    <>
      {products.map((item) => (
        <div key={item.id} className="bg-white flex rounded-md ring-1 ring-[#E5E5E5] mb-2">
          <Image src={item.image_url} alt={item.name} loading="lazy" className="aspect-[1/1] h-fit w-fit object-cover rounded-t-md p-2" width={40} height={40} />
          <div className="w-full">
            <div className="p-2 flex flex-col justify-between h-full">
              <p className="font-medium text-sm truncate">{item.name}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold text-base text-primary pb-1">{rupiahFormat(item.price)}</p>
                <p className="font-normal text-center text-sm">{item.quantity} Pcs</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
