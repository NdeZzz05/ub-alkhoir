"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";
import { rupiahFormat } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import FormDelete from "./_components/form-delete";

export type TColumn = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  stock: number;
  category_name: string;
  original_price?: number;
  discount_percentage?: number;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "image",
    header: "Gambar Produk",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="">
          <Image className="w-16 h-16 object-cover" src={getImageUrl(product.image, "product")} alt={product.name} width={100} height={100} />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama Produk",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div>
          {product.discount_percentage && product.discount_percentage > 0 ? (
            <div>
              <div className="text-red-600 font-semibold">{rupiahFormat(product.price)}</div>
              <div className="line-through text-sm text-muted-foreground">{rupiahFormat(product.original_price!)}</div>
            </div>
          ) : (
            <div>{rupiahFormat(product.price)}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "discount_percentage",
    header: "Diskon",
    cell: ({ row }) => {
      const product = row.original;
      return <p>{product.discount_percentage}%</p>;
    },
  },
  {
    accessorKey: "category_name",
    header: "Kategori",
    cell: ({ row }) => {
      const product = row.original;
      return <Badge variant={"outline"}>{product.category_name}</Badge>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stok",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="space-x-2 flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/product/edit/${product.id}`}>
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          </Button>
          <FormDelete id={product.id} />
        </div>
      );
    },
  },
];
