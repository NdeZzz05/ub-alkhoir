import { TOrderFilter } from "@/hooks/useOrderFilter";
import { TColumn } from "../_components/list-order";

export async function fetchOrders(filter?: TOrderFilter): Promise<{
  orders: TColumn[];
  count_by_status: Record<string, number>;
}> {
  const res = await fetch("/api/order/user", {
    method: "POST",
    body: JSON.stringify(filter ?? {}),
  });

  const data = await res.json();
  return data ?? { orders: [], count_by_status: {} };
}
