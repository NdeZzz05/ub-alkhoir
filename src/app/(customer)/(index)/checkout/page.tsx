import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import BackButton from "../_components/back-button";
import CheckoutProduct from "./_components/checkout-product";
import FormOrder from "./_components/form-order";

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
        <CheckoutProduct />
        <FormOrder />
      </section>
    </>
  );
}
