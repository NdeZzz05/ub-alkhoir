"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";
import FormDelete from "./_components/form-delete";
import { PromoWithProducts } from "@/types";

export const columns: ColumnDef<PromoWithProducts>[] = [
  {
    accessorKey: "image",
    header: "Gambar Kategori",
    cell: ({ row }) => {
      const promo = row.original;

      return (
        <div className="">
          <Image loading="eager" className="w-44" src={getImageUrl(promo.image, "promo")} alt={promo.id} width={900} height={2100} />
        </div>
      );
    },
  },
  {
    accessorKey: "discount_percentage",
    header: "Persentase Diskon",
  },
  {
    header: "Produk Promo",
    cell: ({ row }) => {
      const promo = row.original;
      return (
        <ul className="text-sm">
          {promo.products?.map((product) => (
            <li key={product.id} className="flex items-center gap-2 mb-1">
              <Image src={getImageUrl(product.image, "product")} alt={product.name} width={32} height={32} className="w-8 h-8 object-cover rounded" />
              {product.name}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const promo = row.original;
      return (
        <div className="space-x-2 flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/promo/edit/${promo.id}`}>
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          </Button>
          <FormDelete id={promo.id} />
        </div>
      );
    },
  },
];
