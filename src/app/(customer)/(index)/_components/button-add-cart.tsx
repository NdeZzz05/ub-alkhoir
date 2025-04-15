"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { pushAlert } from "@/lib/client";
import { TCart, TProduct } from "@/types";
import { ShoppingBasket } from "lucide-react";
import React from "react";

interface ButtonAddCartProps {
  item: TProduct;
  className?: string;
}
export default function ButtonAddCart({ item, className }: ButtonAddCartProps) {
  const { products, addProduct, increaseQuantity } = useCart();

  const addToCart = () => {
    const existingProduct = products.find((p) => p.id === item.id);

    if (existingProduct) {
      if (existingProduct.quantity >= item.stock) {
        pushAlert("Stok produk sudah mencapai batas maksimal", "warning");
        return;
      }

      increaseQuantity(item.id);
    } else {
      if (item.stock <= 0) {
        pushAlert("Produk sedang habis stok", "warning");
        return;
      }

      const newCart: TCart = {
        ...item,
        quantity: 1,
      };
      addProduct(newCart);
    }

    pushAlert("Berhasil menambah produk ke dalam keranjang", "success");
  };
  return (
    <Button variant={"default"} className={className} onClick={addToCart} disabled={item.stock <= 0}>
      <ShoppingBasket />
      Keranjang
    </Button>
  );
}
