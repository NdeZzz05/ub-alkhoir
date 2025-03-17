import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

interface HeaderProps {
  page?: "Kategori" | "Promo" | "Produk" | "Pesanan" | "Pelanggan" | null;
}
export const Header: React.FC<HeaderProps> = ({ page }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="ml-1" title="Tutup atau Buka Sidebar" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/dashboard">Beranda</Link>
          </BreadcrumbItem>
          {page && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{page}</BreadcrumbPage>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
