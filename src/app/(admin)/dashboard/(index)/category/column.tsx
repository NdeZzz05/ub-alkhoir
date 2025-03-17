"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "Gambar Kategori",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="">
          <Image loading="eager" className="w-16 h-16 object-cover" src={getImageUrl(category.image)} alt={category.name} width={100} height={100} />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama Kategori",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="space-x-2 flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/category/edit/${category.id}`}>
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          </Button>
          <FormDelete id={category.id} />
        </div>
      );
    },
  },
];
