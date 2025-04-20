import React from "react";
import BackButton from "../_components/back-button";
import ListOrderByUser from "./_components/list-order";

export default function OrderPage() {
  return (
    <>
      <header className="bg-gray-50 w-full p-2">
        <BackButton />
      </header>
      <section id="" className="w-full p-3 pb-20">
        <ListOrderByUser />
      </section>
    </>
  );
}
