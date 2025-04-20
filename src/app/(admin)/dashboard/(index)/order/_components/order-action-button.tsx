"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderType, PaymentMethod, StatusOrder, StatusPayment } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { pushAlert } from "@/lib/client";
import { updateOrderStatus } from "../lib/action";

type Props = {
  id?: string;
  page?: "list" | "detail";
  status_order?: StatusOrder;
  status_payment?: StatusPayment;
  payment_method?: PaymentMethod;
  type_order?: OrderType;
};

export default function OrderActionButton({ id, status_order, payment_method, status_payment, type_order }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const isTransferPending = status_payment === "pending" && payment_method === "transfer";

  const mutation = useMutation({
    mutationFn: () =>
      updateOrderStatus({
        id: id ?? "",
        currentStatus: status_order ?? "",
        paymentMethod: payment_method ?? "",
        statusPayment: status_payment ?? "",
      }),
    onMutate: () => setIsPending(true),
    onSettled: () => setIsPending(false),
    onSuccess: () => {
      pushAlert("Berhasil merubah status pesanan", "success");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err: Error) => {
      pushAlert(err.message, "danger");
    },
  });

  if (!id) return null;

  if (status_order === "processed") {
    if (isTransferPending) {
      return (
        <Button disabled className="p-2 text-xs bg-gray-400 text-white cursor-not-allowed">
          Belum Dibayar
        </Button>
      );
    }

    const label = type_order === "pick_up" ? "Pesanan Siap" : "Kirim Pesanan";
    const className = `p-2 text-xs text-white ${type_order === "pick_up" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-orange-500 hover:bg-orange-600"}`;

    return (
      <Button size="sm" onClick={() => mutation.mutate()} disabled={isPending} className={isPending ? "p-2 text-xs bg-gray-400 text-white" : className}>
        {isPending ? "Loading..." : label}
      </Button>
    );
  }

  if (status_order === "shipped") {
    return (
      <Button size="sm" onClick={() => mutation.mutate()} disabled={isPending} className="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white">
        {isPending ? "Loading..." : "Pesanan Diterima"}
      </Button>
    );
  }

  if (status_order === "completed") {
    return <Badge className="bg-green-500 text-white">Selesai</Badge>;
  }

  if (status_order === "canceled") {
    return <Badge variant="destructive">Batal</Badge>;
  }

  return null;
}
