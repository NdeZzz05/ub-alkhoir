"use client";

import { Search } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarInput } from "@/components/ui/sidebar";
import { useFilter } from "@/hooks/useFilter";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const { setFilter } = useFilter();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(`/catalog?${params.toString()}`);
    setFilter({
      search: query,
    });
  };
  return (
    <div className="sticky top-0 z-20 w-full">
      <form {...props} onSubmit={handleSubmit}>
        <SidebarGroup className="py-2 px-3 bg-primary w-full min-w-sm">
          <SidebarGroupContent className="relative">
            <SidebarInput
              id="search"
              placeholder="Kamu lagi cari produk apa?"
              className="pl-8 h-10"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </SidebarGroupContent>
        </SidebarGroup>
      </form>
    </div>
  );
}
