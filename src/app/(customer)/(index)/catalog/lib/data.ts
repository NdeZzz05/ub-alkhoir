import { TFilter } from "@/hooks/useFilter";
import { TProduct } from "@/types";

export async function fetchProduct(body?: TFilter): Promise<TProduct[]> {
  const res = await fetch("/api/catalog", {
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });

  const data = await res.json();

  return data ?? [];
}
