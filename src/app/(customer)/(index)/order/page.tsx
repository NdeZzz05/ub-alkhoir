import React from "react";
import BackButton from "../_components/back-button";
import ListOrderByUser from "./_components/list-order";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OrderPage() {
  const { session } = await getUser();

  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <header className="bg-gray-50 w-full p-2">
        <BackButton />
      </header>
      <section className="w-full p-3 pb-20">
        <ListOrderByUser />
      </section>
    </>
  );
}
