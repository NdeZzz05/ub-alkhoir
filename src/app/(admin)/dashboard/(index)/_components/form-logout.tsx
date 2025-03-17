"use client";

import * as React from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useActionState } from "react";
import { Logout } from "../lib/action";
import { ActionResult } from "@/types";

const initialState: ActionResult = {
  error: "",
};
export function FormLogout({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    emoji: string;
  };
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [state, formAction] = useActionState(Logout, initialState);
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={formAction}>
              <SidebarMenuButton size="lg">
                {items.emoji}
                <span className="font-normal text-danger">{items.title}</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
