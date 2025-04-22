import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardClientLayout from "./_components/dashboard-client-layout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { session, user } = await getUser();

  if (!session || user.role !== "admin") {
    redirect("/login");
  }

  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
