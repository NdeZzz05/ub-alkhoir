"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getImageUrl } from "@/lib/supabase";
import { rupiahFormat } from "@/lib/utils";
import { OrderType, PaymentMethod, StatusOrder, StatusPayment } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";
import OrderActionButton from "./_components/order-action-button";

type TProduct = {
  name: string;
  image: string;
  quantity: number;
};

export type TColumn = {
  id: string;
  code: string;
  products: TProduct[];
  customer_name: string;
  customer_phone: string;
  price: number;
  status_payment: StatusPayment;
  status_order: StatusOrder;
  type_order?: OrderType;
  payment_method?: PaymentMethod;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "products",
    header: "Produk",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Link href={`/dashboard/order/detail/${order.id}`} className="flex flex-col gap-4 justify-start hover:bg-muted p-2 rounded-md transition-colors">
          {order.products.map((item, i) => (
            <div key={`${item.name + i}`} className="inline-flex items-center gap-3">
              <Image src={getImageUrl(item.image, "product")} alt={item.name} width={50} height={50} />
              <span>{item.name}</span>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
            </div>
          ))}
        </Link>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Kode",
  },
  {
    accessorKey: "customer_name",
    header: "Nama Pelanggan",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Link href={`/dashboard/order/detail/${order.id}`}>
          <p className="p-4">{order.customer_name}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "customer_phone",
    header: "Whatsapp",
    cell: ({ row }) => {
      const { customer_phone } = row.original;
      const phone = customer_phone.replace(/^0/, "62");
      return (
        <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:underline">
          <MdWhatsapp className="text-green-500 text-3xl" />
        </a>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Total Harga",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "",
    header: "Detail",
    cell: ({ row }) => {
      const { type_order, payment_method } = row.original;
      return (
        <div className="flex flex-col gap-1">
          <Badge className="w-fit" variant={"outline"}>
            {type_order}
          </Badge>
          <Badge className="w-fit" variant={"outline"}>
            {payment_method}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Aksi",
    cell: ({ row }) => {
      const { id, status_order, status_payment, payment_method, type_order } = row.original;
      return <OrderActionButton id={id} page="list" status_order={status_order} status_payment={status_payment} payment_method={payment_method} type_order={type_order} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
              <MoreVerticalIcon />
              <span className="sr-only">Buka Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <Link href={`/dashboard/order/detail/${order.id}`}>
              <DropdownMenuItem>Detail Pesanan</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
