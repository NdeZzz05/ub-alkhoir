import { Header } from "../_components/header";
import * as React from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./column";
import { getProduct } from "./lib/data";
import { DataTable } from "@/components/ui/data-table";

export default async function ProductPage() {
  const dataProduct = await getProduct();
  return (
    <>
      <Header page={"Produk"} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Katalog Produk</h1>
          <Button size="sm" className="gap-1 ml-auto" asChild>
            <Link href="/dashboard/product/create">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Tambah Produk</span>
            </Link>
          </Button>
        </div>
        <div className="w-full bg-muted/50 p-4">
          <DataTable columns={columns} data={dataProduct} />
        </div>
      </div>
    </>
  );
}
