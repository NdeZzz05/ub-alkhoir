import { Header } from "../_components/header";
import * as React from "react";
import ListOrder from "./_components/list-order";

export default async function OrderPage() {
  return (
    <>
      <Header page={"Pesanan"} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Kelola Pesanan</h1>
        </div>
        <ListOrder />
      </div>
    </>
  );
}
