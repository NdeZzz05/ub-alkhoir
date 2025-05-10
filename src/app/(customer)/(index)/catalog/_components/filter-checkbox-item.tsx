"use client";

import { useFilter } from "@/hooks/useFilter";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterCheckboxItemProps {
  id: string;
  value: string;
}

export default function FilterCheckboxItem({ id, value }: FilterCheckboxItemProps) {
  const { setFilter, draft, setDraft } = useFilter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoriesFromUrl = searchParams.getAll("category");

    setFilter({
      category: categoriesFromUrl.length > 0 ? categoriesFromUrl : null,
    });
  }, [searchParams, setFilter]);

  const onCheckedChange = (checked: boolean) => {
    const currentCategory = draft.category ?? [];
    const updatedCategories = checked ? [...currentCategory, id] : currentCategory.filter((val) => val !== id);

    setDraft({ category: updatedCategories });
  };
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} value={id} checked={draft?.category?.includes(id)} onCheckedChange={onCheckedChange} />
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {value}
      </label>
    </div>
  );
}
