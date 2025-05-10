"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFilter } from "@/hooks/useFilter";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SortBy = "priceLowest" | "priceHighest";

export default function FilterSort() {
  const { draft, setDraft } = useFilter();
  const searchParams = useSearchParams();
  const [sortValue, setSortValue] = useState<string>("");

  useEffect(() => {
    setSortValue(searchParams.get("sortBy") || "");
  }, [searchParams]);

  const handleSortChange = (sortBy: SortBy) => {
    setDraft({ ...draft, sortBy });
    setSortValue(sortBy);
  };

  return (
    <>
      <DialogTitle className="text-sm">Urutkan</DialogTitle>
      <RadioGroup value={sortValue} onValueChange={handleSortChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="priceLowest" id="priceLowest" />
          <Label htmlFor="priceLowest">Dari Harga Terendah</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="priceHighest" id="priceHighest" />
          <Label htmlFor="priceHighest">Dari Harga Tertinggi</Label>
        </div>
      </RadioGroup>
    </>
  );
}
