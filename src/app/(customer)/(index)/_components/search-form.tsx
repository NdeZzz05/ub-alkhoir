import { Search } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarInput } from "@/components/ui/sidebar";
export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <div className="sticky top-0 z-10">
      <form {...props}>
        <SidebarGroup className="py-2 px-3 bg-primary">
          <SidebarGroupContent className="relative">
            <SidebarInput id="search" placeholder="Kamu lagi cari produk apa?" className="pl-8 h-10" />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </SidebarGroupContent>
        </SidebarGroup>
      </form>
    </div>
  );
}
