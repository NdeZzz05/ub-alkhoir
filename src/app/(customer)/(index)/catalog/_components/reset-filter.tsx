"use client";

import { Button } from "@/components/ui/button";
import { useFilter } from "@/hooks/useFilter";
import { useRouter } from "next/navigation";

export default function ResetFilter() {
  const router = useRouter();
  const { setFilter } = useFilter();

  const handleReset = () => {
    setFilter({
      search: "",
      minPrice: 0,
      maxPrice: 0,
      sortBy: null,
      category: null,
    });
    router.push("/catalog");
  };
  return (
    <div className="pt-2">
      <Button variant={"destructive"} onClick={handleReset} className="w-full">
        Reset Filter
      </Button>
    </div>
  );
}
