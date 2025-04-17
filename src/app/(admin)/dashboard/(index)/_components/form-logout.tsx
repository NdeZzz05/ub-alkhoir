"use client";

import * as React from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useActionState } from "react";
import { Logout } from "../lib/action";
import { ActionResult } from "@/types";
import { pushAlert } from "@/lib/client";
import { redirect } from "next/navigation";

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

  React.useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }
    if (state.success && state.redirectURL) {
      pushAlert(state.success, "success");
      redirect(state.redirectURL);
    }
  }, [state]);
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
