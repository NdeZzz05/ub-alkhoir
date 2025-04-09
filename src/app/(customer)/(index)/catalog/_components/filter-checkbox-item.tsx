"use client";

import { useFilter } from "@/hooks/useFilter";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterCheckboxItemProps {
  id: string;
  value: string;
}

export default function FilterCheckboxItem({ id, value }: FilterCheckboxItemProps) {
  const { filter, setFilter } = useFilter();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sinkronisasi kategori dari URL ke state filter saat komponen dimuat
  useEffect(() => {
    const categoriesFromUrl = searchParams.getAll("category");
    if (categoriesFromUrl.length > 0) {
      setFilter({ category: categoriesFromUrl });
    }
  }, [searchParams, setFilter]);

  const updateUrl = (categories: string[]) => {
    const params = new URLSearchParams(searchParams);

    // Hapus kategori lama
    params.delete("category");

    // Tambahkan kategori baru
    categories.forEach((cat) => params.append("category", cat));

    router.push(`/catalog?${params.toString()}`, { scroll: false });
  };

  const onCheckedChange = (checked: boolean) => {
    const updatedCategories = checked ? [...(filter?.category ?? []), id] : filter?.category?.filter((val) => val !== id) ?? [];

    setFilter({ category: updatedCategories });
    updateUrl(updatedCategories);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} value={id} checked={filter?.category?.includes(id)} onCheckedChange={onCheckedChange} />
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {value}
      </label>
    </div>
  );
}
