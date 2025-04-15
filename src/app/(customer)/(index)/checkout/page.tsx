import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import BackButton from "../_components/back-button";
import CheckoutProduct from "./_components/checkout-product";
import { Button } from "@/components/ui/button";
import TypeOrder from "./_components/type-order";

export default async function CheckoutPage() {
  const { session } = await getUser();

  if (!session) {
    return redirect("/login");
  }

  return (
    <>
      <header className="bg-gray-50 w-full p-2">
        <BackButton />
      </header>
      <section id="" className="w-full p-3 pb-20">
        <TypeOrder />
        <CheckoutProduct />
        <div className="bg-gray-100 flex rounded-md ring-1 ring-[#E5E5E5] p-1 mb-2">
          <p>Metode Pembayaran</p>
        </div>
        <div className="bg-gray-100 flex rounded-md ring-1 ring-[#E5E5E5] p-1 mb-2">
          <p>Ringkasan Belanja</p>
        </div>
        <Button>Beli</Button>
      </section>
    </>
  );
}
