import { Header } from "../_components/header";
import * as React from "react";
import { columns } from "./column";

import { DataTable } from "@/components/ui/data-table";
import { getOrders } from "./lib/data";
import { Button } from "@/components/ui/button";

export default async function OrderPage() {
  const orders = await getOrders();
  return (
    <>
      <Header page={"Pesanan"} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Kelola Pesanan</h1>
        </div>
        <div className="border rounded-md p-2 w-fit">
          <Button variant={"default"} className="gap-1 ml-auto w-fit" asChild>
            <span className="">Semua</span>
          </Button>
          <Button variant={"ghost"} className="gap-1 ml-auto rounded-md" asChild>
            <span className="">Proses</span>
          </Button>
          <Button variant={"ghost"} className="gap-1 ml-auto rounded-md" asChild>
            <span className="">Pengiriman</span>
          </Button>
          <Button variant={"ghost"} className="gap-1 ml-auto rounded-md" asChild>
            <span className="">Selesai</span>
          </Button>
          <Button variant={"ghost"} className="gap-1 ml-auto rounded-md" asChild>
            <span className="">Batal</span>
          </Button>
        </div>

        <div className="w-full bg-muted/50 p-4">
          <DataTable columns={columns} data={orders} />
        </div>
      </div>
    </>
  );
}
