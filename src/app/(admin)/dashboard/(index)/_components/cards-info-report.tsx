"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardCardsReport } from "../lib/client-action";
import { rupiahFormat } from "@/lib/utils";
import { DateRange } from "react-day-picker";

type DashboardChartData = {
  totalSales?: number;
  totalBuyers?: number;
  totalOrders?: number;
};

type DownloadReportProps = {
  date?: DateRange | undefined;
};

export function CardsInfoReport({ date }: DownloadReportProps) {
  const from = date?.from;
  const to = date?.to;

  const { data: chartData } = useQuery<DashboardChartData>({
    queryKey: ["analytics-cards-report", from, to],
    queryFn: () => fetchDashboardCardsReport(from, to),
  });

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-3 @5xl/main:grid-cols-3 grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Penjualan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">{rupiahFormat(chartData?.totalSales ?? 0)}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Pembeli</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">{chartData?.totalBuyers ?? 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Pesanan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">{chartData?.totalOrders ?? 0}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
