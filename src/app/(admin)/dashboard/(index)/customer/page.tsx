import { Header } from "../_components/header";
import * as React from "react";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { getCustomer } from "./lib/data";

export default async function OrderPage() {
  const customers = await getCustomer();
  return (
    <>
      <Header page={"Pelanggan"} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Data Pelanggan</h1>
        </div>
        <div className="w-full bg-muted/50 p-4">
          <DataTable columns={columns} data={customers} />
        </div>
      </div>
    </>
  );
}
