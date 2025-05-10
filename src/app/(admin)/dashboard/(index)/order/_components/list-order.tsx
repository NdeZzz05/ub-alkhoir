"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useOrderFilter } from "@/hooks/useOrderFilter";
import { fetchOrders } from "../lib/data";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../column";
import { StatusOrder } from "@prisma/client";
import Loading from "../../_components/loading";

export default function ListOrder() {
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
    router.push(`/dashboard/order?${params.toString()}`);
  };

  const getButtonVariant = (status?: string) => {
    if (!statusParam && !status) return "default";
    return status === statusParam ? "default" : "outline";
  };

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        <Button variant={getButtonVariant()} onClick={() => handleStatusClick()}>
          Semua ({Object.values(count).reduce((a, b) => a + b, 0)})
        </Button>
        <Button variant={getButtonVariant("processed")} onClick={() => handleStatusClick("processed")}>
          Proses ({count["processed"] ?? 0})
        </Button>
        <Button variant={getButtonVariant("shipped")} onClick={() => handleStatusClick("shipped")}>
          Pengiriman ({count["shipped"] ?? 0})
        </Button>
        <Button variant={getButtonVariant("completed")} onClick={() => handleStatusClick("completed")}>
          Selesai ({count["completed"] ?? 0})
        </Button>
        <Button variant={getButtonVariant("canceled")} onClick={() => handleStatusClick("canceled")}>
          Batal ({count["canceled"] ?? 0})
        </Button>
      </div>

      {isLoading ? <Loading /> : <DataTable columns={columns} data={orders} />}
    </>
  );
}
