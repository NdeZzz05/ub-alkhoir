export type TUpdateOrderInput = {
  id: string;
  currentStatus: string;
  paymentMethod: string;
  statusPayment: string;
};

export async function updateOrderStatus(data: TUpdateOrderInput) {
  const res = await fetch("/api/order/update", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}
