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

  const existingProduct = products.find((p) => p.id === item.id);
  const isOutOfStock = item.stock <= 0;
  const isStockLimitReached = existingProduct ? existingProduct.quantity >= item.stock : false;

  const addToCart = () => {
    if (isOutOfStock) {
      pushAlert("Produk sedang habis stok", "warning");
      return;
    }

    if (existingProduct) {
      if (isStockLimitReached) {
        pushAlert("Stok produk sudah mencapai batas maksimal", "warning");
        return;
      }

      increaseQuantity(item.id);
    } else {
      const newCart: TCart = {
        ...item,
        quantity: 1,
      };
      addProduct(newCart);
    }

    pushAlert("Berhasil menambah produk ke dalam keranjang", "success");
  };

  return (
    <Button variant="default" className={className} onClick={addToCart} disabled={isOutOfStock || isStockLimitReached}>
      {isOutOfStock ? (
        "Habis Terjual"
      ) : isStockLimitReached ? (
        "Stok Maksimal"
      ) : (
        <>
          <ShoppingBasket className="mr-2 h-4 w-4" />
          Keranjang
        </>
      )}
    </Button>
  );
}
