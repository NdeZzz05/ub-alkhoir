import React from "react";
import BackButton from "../_components/back-button";
import { getUser } from "@/lib/auth";
import CheckoutForm from "./_components/checkout-form";
import CartProduct from "./_components/cart-product";

export default async function CartsPage() {
  const { session } = await getUser();

  return (
    <>
      <header className="bg-gray-50 w-full p-2">
        <BackButton />
      </header>
      <section id="cart-products" className="w-full p-3">
        <CartProduct />
        <CheckoutForm id={session?.id} />
      </section>
    </>
  );
}
