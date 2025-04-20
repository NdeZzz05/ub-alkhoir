import { Badge } from "@/components/ui/badge";
import { StatusOrder, StatusPayment, PaymentMethod, OrderType } from "@prisma/client";

type Props = {
  status_order?: StatusOrder;
  status_payment?: StatusPayment;
  payment_method?: PaymentMethod;
  type_order?: OrderType;
};

export default function OrderStatusBadge({ status_order, status_payment, payment_method, type_order }: Props) {
  if (!status_order) return null;

  const isTransferPending = status_payment === "pending" && payment_method === "transfer";

  if (status_order === "processed") {
    if (isTransferPending) {
      return <Badge className="bg-gray-400 text-white text-xs hover:bg-gray-500">Belum Dibayar</Badge>;
    }

    return <Badge className="bg-blue-500 text-white text-xs hover:bg-blue-600">Diproses</Badge>;
  }

  if (status_order === "shipped") {
    return <Badge className="bg-yellow-500 text-white text-xs hover:bg-yellow-600">{type_order === "pick_up" ? "Siap Diambil" : "Sedang Dikirim"}</Badge>;
  }

  if (status_order === "completed") {
    return <Badge className="bg-green-500 text-white text-xs hover:bg-green-600">Selesai</Badge>;
  }

  if (status_order === "canceled") {
    return (
      <Badge variant="destructive" className="text-xs">
        Dibatalkan
      </Badge>
    );
  }

  return null;
}
