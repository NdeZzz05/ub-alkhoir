"use client";

import * as React from "react";

import { VersionSwitcher } from "./version-switcher";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { FormLogout } from "./form-logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  versions: ["1.0.1"],
  navMain: [
    {
      title: "Produk",
      url: "/dashboard",
      items: [
        {
          title: "Produk Saya",
          url: "/dashboard/product",
          emoji: "🧃",
        },
        {
          title: "Kategori",
          url: "/dashboard/category",
          emoji: "🧺",
        },
        {
          title: "Promo Produk",
          url: "/dashboard/promo",
          emoji: "💯",
        },
      ],
    },
    {
      title: "Pesanan",
      url: "/dashboard",
      items: [
        {
          title: "Kelola Pesanan",
          url: "/dashboard/order",
          emoji: "🛒",
        },
      ],
    },
    {
      title: "Pelanggan",
      url: "/dashboard",
      items: [
        {
          title: "Data Pelanggan",
          url: "/dashboard/customer",
          emoji: "🙍‍♂️",
        },
      ],
    },
  ],
  navLogout: {
    title: "Logout",
    url: "/login",
    emoji: "🏃",
  },
};

function NavItem({ item }: { item: { title: string; url: string; emoji: string } }) {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  return (
    <SidebarMenuItem className="sidebar-menu-item">
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={item.url} className={isActive ? "active" : ""}>
          {item.emoji}
          <span className="font-normal">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <NavItem key={item.title} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <FormLogout items={data.navLogout} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
