"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { pushAlert } from "@/lib/client";
import { rupiahFormat } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useMemo } from "react";

interface CheckoutFormProps {
  id?: string;
}
export default function CheckoutForm({ id }: CheckoutFormProps) {
  const { products } = useCart();

  const grandTotal = useMemo(() => {
    return products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  }, [products]);

  const handleRedirect = () => {
    if (!id) {
      pushAlert("kamu harus masuk ke akunmu terlebih dahulu", "warning");
      return redirect("/login");
    } else {
      return redirect("/checkout");
    }
  };

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
        <div className="w-full rounded-md bg-gray-100 p-2 flex items-center justify-between mb-14">
          <div className="">
            <span className="text-black font-normal text-sm">Total</span>
            <p className="font-bold text-base text-primary">{rupiahFormat(grandTotal)}</p>
          </div>
          <Button onClick={handleRedirect} disabled={grandTotal === 0}>
            Checkout
          </Button>
        </div>
      )}
    </>
  );
}
