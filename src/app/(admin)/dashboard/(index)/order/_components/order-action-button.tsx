"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderType, PaymentMethod, StatusOrder, StatusPayment } from "@prisma/client";

type Props = {
  status_order?: StatusOrder;
  status_payment?: StatusPayment;
  payment_method?: PaymentMethod;
  type_order?: OrderType;
};

export default function OrderActionButton({ status_order, status_payment, payment_method, type_order }: Props) {
  const isTransferPending = status_payment === "pending" && payment_method === "transfer";

  if (status_order === "processed") {
    if (isTransferPending) {
      return (
        <Button size="sm" variant="secondary" disabled className="p-2 text-xs bg-gray-400 text-white cursor-not-allowed">
          Belum Dibayar
        </Button>
      );
    }

    if (type_order === "pick_up") {
      return (
        <Button size="sm" className="p-2 text-xs bg-emerald-500 hover:bg-emerald-600 text-white">
          Pesanan Siap
        </Button>
      );
    }

    return (
      <Button size="sm" className="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white">
        Kirim Pesanan
      </Button>
    );
  }

  if (status_order === "shipped") {
    return (
      <Button size="sm" variant="outline" className="p-2 text-xs bg-yellow-500 hover:bg-yellow-600 text-white">
        Pesanan Diterima
      </Button>
    );
  }

  if (status_order === "completed") {
    return (
      <Badge variant="default" className="bg-green-500 text-white">
        Selesai
      </Badge>
    );
  }

  if (status_order === "canceled") {
    return <Badge variant="destructive">Batal</Badge>;
  }

  return null;
}
