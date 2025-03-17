"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TColumn = {
  id: string;
  name: string;
  email: string;
  total_transactions: number;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "total_transactions",
    header: "Total Transaksi",
  },
];
