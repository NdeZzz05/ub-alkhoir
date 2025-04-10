"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { pushAlert } from "@/lib/client";
import { Tcart, Tproduct } from "@/types";
import { ShoppingBasket } from "lucide-react";
import React from "react";

interface ButtonAddCartProps {
  item: Tproduct;
  className?: string;
}
export default function ButtonAddCart({ item, className }: ButtonAddCartProps) {
  const { products, addProduct, increaseQuantity } = useCart();

  const addToCart = () => {
    const existingProduct = products.find((p) => p.id === item.id);

    if (existingProduct) {
      increaseQuantity(item.id);
    } else {
      const newCart: Tcart = {
        ...item,
        quantity: 1,
      };
      addProduct(newCart);
    }

    pushAlert("Berhasil menambah produk ke dalam keranjang", "success");
  };
  return (
    <Button variant={"default"} className={className} onClick={addToCart}>
      <ShoppingBasket />
      Keranjang
    </Button>
  );
}
