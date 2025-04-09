import { TFilter } from "@/hooks/useFilter";
import { Tproduct } from "@/types";

export async function fetchProduct(body?: TFilter): Promise<Tproduct[]> {
  const res = await fetch("/api/catalog", {
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });

  const data = await res.json();

  return data ?? [];
}
