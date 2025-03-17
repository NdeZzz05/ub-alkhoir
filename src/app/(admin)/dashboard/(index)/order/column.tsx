"use client";

import { Badge } from "@/components/ui/badge";
import { rupiahFormat } from "@/lib/utils";
import { StatusOrder } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: string;
  products: TProduct[];
  customer_name: string;
  price: number;
  status: StatusOrder;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "products",
    header: "Produk",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-4 justify-start">
          {order.products.map((item, i) => (
            <div key={`${item.name + i}`} className="inline-flex items-center gap-5">
              <Image src={item.image} alt={item.name} width={80} height={80} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "customer_name",
    header: "Nama Pelanggan",
    // cell: ({ row }) => row.original.customer_name,
  },
  {
    accessorKey: "price",
    header: "Total Harga",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status Pesanan",
    cell: ({ row }) => {
      const { status } = row.original;
      return <Badge variant={status === "canceled" ? "destructive" : "default"}>{status}</Badge>;
    },
  },
];
