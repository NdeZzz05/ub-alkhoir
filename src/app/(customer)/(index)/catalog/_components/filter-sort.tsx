"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFilter } from "@/hooks/useFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterSort() {
  const { filter, setFilter } = useFilter();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortValue, setSortValue] = useState<string>("");

  useEffect(() => {
    setSortValue(searchParams.get("sortBy") || "");
  }, [searchParams]);

  const handleSortChange = (sortBy: "priceLowest" | "priceHighest") => {
    const params = new URLSearchParams(searchParams);

    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }

    setFilter({ ...filter, sortBy });
    setSortValue(sortBy);
    router.push(`/catalog?${params.toString()}`);
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
