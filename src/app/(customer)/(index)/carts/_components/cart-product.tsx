"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CartProduct() {
  const { products, decreaseQuantity, increaseQuantity, removeProduct } = useCart();
  return (
    <>
      {products.map((item) => (
        <div key={item.id} className="bg-white flex rounded-md ring-1 ring-[#E5E5E5] mb-2">
          <Image src={item.image_url} alt={item.name} loading="lazy" className="aspect-[1/1] h-fit w-fit object-cover rounded-t-md p-2" width={60} height={60} />
          <div className="w-full">
            <div className="p-2">
              <p className="font-medium text-base truncate">{item.name}</p>
              <p className="font-bold text-base text-primary pb-1">{rupiahFormat(item.price)}</p>
            </div>
            <div className="flex items-center justify-end w-full p-2">
              <Button variant={"ghost"} onClick={() => removeProduct(item.id)} className="w-4 h-6 rounded-md text-center text-sm font-semibold border border-[#E5E5E5] mr-2">
                <Trash />
              </Button>
              <div className="flex items-center gap-0">
                <Button variant={"outline"} onClick={() => decreaseQuantity(item.id)} className="w-4 h-6 px-4">
                  <Minus width={18} />
                </Button>
                <p className="text-primary font-semibold text-center w-12 border-y rounded-md">{item.quantity}</p>
                <Button variant={"default"} onClick={() => increaseQuantity(item.id)} className="w-4 h-6 px-4">
                  <Plus width={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
