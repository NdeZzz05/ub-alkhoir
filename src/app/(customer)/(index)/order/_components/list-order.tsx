"use client";

import React from "react";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../lib/data";
import { Button } from "@/components/ui/button";
import { OrderType, PaymentMethod, StatusOrder, StatusPayment } from "@prisma/client";
import { useOrderFilter } from "@/hooks/useOrderFilter";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { rupiahFormat } from "@/lib/utils";
import OrderStatusBadge from "./order-status-badge";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SkeletonLoading } from "../../_components/skeleton-loading";

type TProduct = {
  name: string;
  image: string;
  quantity: number;
  price_product: number;
};
export type TColumn = {
  id: string;
  code: string;
  products: TProduct[];
  customer_name: string;
  customer_phone: string;
  price: number;
  token_payment: string;
  status_payment: StatusPayment;
  status_order: StatusOrder;
  type_order?: OrderType;
  payment_method?: PaymentMethod;
};

export default function ListOrderByUser() {
  const { filter, setFilter } = useOrderFilter();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isValidStatus = (value: string): value is StatusOrder => {
    return Object.values(StatusOrder).includes(value as StatusOrder);
  };
  const statusParam = searchParams.get("status");

  useEffect(() => {
    if (statusParam && isValidStatus(statusParam)) {
      setFilter({ status: statusParam as StatusOrder });
    } else {
      setFilter({ status: null });
    }
  }, [statusParam, setFilter]);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", filter],
    queryFn: () => fetchOrders(filter),
  });

  const orders = data?.orders ?? [];
  const count = data?.count_by_status ?? {};

  const handleStatusClick = (status?: string) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    router.push(`/order?${params.toString()}`);
  };

  const getButtonVariant = (status?: string) => {
    if (!statusParam && !status) return "default";
    return status === statusParam ? "default" : "outline";
  };

  return (
    <>
      <div className="flex gap-2 overflow-x-scroll mb-4">
        <Button variant={getButtonVariant()} onClick={() => handleStatusClick()}>
          Semua ({Object.values(count).reduce((a, b) => a + b, 0)})
        </Button>
        <Button variant={getButtonVariant("processed")} onClick={() => handleStatusClick("processed")}>
          Proses ({count["processed"] ?? 0})
        </Button>
        <Button variant={getButtonVariant("shipped")} onClick={() => handleStatusClick("shipped")}>
          Ambil/Kirim ({count["shipped"] ?? 0})
        </Button>
        <Button variant={getButtonVariant("completed")} onClick={() => handleStatusClick("completed")}>
          Selesai ({count["completed"] ?? 0})
        </Button>
        <Button variant={getButtonVariant("canceled")} onClick={() => handleStatusClick("canceled")}>
          Batal ({count["canceled"] ?? 0})
        </Button>
      </div>
      {isLoading ? (
        <SkeletonLoading width="w-[22rem]" height="h-[8rem]" />
      ) : (
        orders.map((item) => (
          <div key={item.id} className="bg-white rounded-md ring-1 ring-[#E5E5E5] mb-2">
            <div className="p-2 flex justify-between items-center bg-gray-300">
              <p className="font-medium text-sm text-gray-500">#{item.code}</p>
              <div>
                <Badge className="bg-orange-500 hover:bg-orange-600">{item.payment_method}</Badge>
                <OrderStatusBadge status_order={item.status_order} status_payment={item.status_payment} payment_method={item.payment_method} type_order={item.type_order} />
              </div>
            </div>
            {item.products.map((product) => (
              <div key={product.name + 1} className="flex">
                <Image key={product.name + 1} src={getImageUrl(product.image, "product")} alt={product.name} width={60} height={60} className="aspect-[1/1] h-fit w-fit object-cover rounded-t-md p-2" loading="lazy" />
                <div className="w-full p-2">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-sm w-full font-bold text-end">x{product.quantity}</p>
                  <p className="font-bold text-sm text-primary text-end">{rupiahFormat(product.price_product)}</p>
                </div>
              </div>
            ))}
            <div className="bg-gray-100 text-sm flex justify-between p-2">
              <p className="text-gray-600">
                <span className="font-bold text-primary">{item.products.reduce((total, p) => total + p.quantity, 0)} </span>Produk
              </p>
              <p className="text-gray-600">
                Total Pesanan: <span className="text-primary font-bold">{rupiahFormat(item.price)}</span>
              </p>
            </div>

            {item.payment_method === "transfer" && item.status_payment === "pending" && item.token_payment && (
              <div className="flex justify-end p-2">
                <Link
                  href={`https://ewallet-mock-connector.xendit.co/v1/ewallet_connector/checkouts?token=${item.token_payment}`}
                  target="_blank"
                  className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-primary/80 transition"
                >
                  Lanjutkan Pembayaran
                </Link>
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
}
