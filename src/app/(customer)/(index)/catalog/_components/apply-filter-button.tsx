"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFilter } from "@/hooks/useFilter";
import { DialogClose } from "@/components/ui/dialog";

export function ApplyFilterButton() {
  const { draft, applyDraft } = useFilter();
  const router = useRouter();

  const handleApply = () => {
    const params = new URLSearchParams();

    draft.category?.forEach((cat) => {
      params.append("category", cat);
    });

    if (draft.sortBy) params.set("sortBy", draft.sortBy);
    if (draft.search) params.set("search", draft.search);
    if (draft.minPrice) params.set("minPrice", String(draft.minPrice));
    if (draft.maxPrice) params.set("maxPrice", String(draft.maxPrice));
    if (draft.promo) params.set("promo", draft.promo);

    applyDraft();
    router.push(`/catalog?${params.toString()}`, { scroll: false });
  };

  return (
    <DialogClose asChild>
      <Button className="w-full" onClick={handleApply}>
        Terapkan
      </Button>
    </DialogClose>
  );
}
