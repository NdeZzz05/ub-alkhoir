"use client";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardCards } from "../lib/client-action";
import { rupiahFormat } from "@/lib/utils";

type DashboardChartData = {
  totalSales?: number;
  salesChange?: number;
  totalBuyers?: number;
  buyersChange?: number;
  totalOrders?: number;
  ordersChange?: number;
};

const renderChangeBadge = (change: number) => {
  const isPositive = change > 0;
  const isNegative = change < 0;

  const formattedChange = `${isPositive ? "+" : ""}${change.toFixed(1)}%`;

  let colorClass = "";
  let Icon = null;

  if (isPositive) {
    colorClass = "text-green-600 border-green-600";
    Icon = TrendingUpIcon;
  } else if (isNegative) {
    colorClass = "text-red-600 border-red-600";
    Icon = TrendingDownIcon;
  } else {
    colorClass = "text-gray-500 border-gray-500";
  }

  return (
    <Badge variant="outline" className={`flex gap-1 rounded-lg text-xs ${colorClass}`}>
      {Icon && <Icon className="size-3" />}
      {formattedChange}
    </Badge>
  );
};

const renderFooterInfo = (change: number, type: string) => {
  const isPositive = change > 0;
  const isNegative = change < 0;

  let colorClass = "";
  let message = "";
  let Icon = null;

  if (isPositive) {
    colorClass = "text-green-600";
    Icon = TrendingUpIcon;
    message = `${type} meningkat periode ini`;
  } else if (isNegative) {
    colorClass = "text-red-600";
    Icon = TrendingDownIcon;
    message = `${type} menurun periode ini`;
  } else {
    colorClass = "text-gray-500";
    message = `${type} stabil periode ini`;
  }

  return (
    <>
      <div className={`line-clamp-1 flex gap-2 font-medium ${colorClass}`}>
        {message} {Icon && <Icon className="size-4" />}
      </div>
      <div className="text-muted-foreground">Dibandingkan dengan 1 bulan terakhir</div>
    </>
  );
};

export function CardsInfo() {
  const { data: chartData } = useQuery<DashboardChartData>({
    queryKey: ["analytics-cards"],
    queryFn: () => fetchDashboardCards(),
  });

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-3 @5xl/main:grid-cols-3 grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Penjualan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">{rupiahFormat(chartData?.totalSales ?? 0)}</CardTitle>
          <div className="absolute right-4 top-4">{renderChangeBadge(chartData?.salesChange ?? 0)}</div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">{renderFooterInfo(chartData?.salesChange ?? 0, "Penjualan")}</CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Pembeli</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">{chartData?.totalBuyers ?? 0}</CardTitle>
          <div className="absolute right-4 top-4">{renderChangeBadge(chartData?.buyersChange ?? 0)}</div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">{renderFooterInfo(chartData?.buyersChange ?? 0, "Pembeli")}</CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Pesanan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">{chartData?.totalOrders ?? 0}</CardTitle>
          <div className="absolute right-4 top-4">{renderChangeBadge(chartData?.ordersChange ?? 0)}</div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">{renderFooterInfo(chartData?.ordersChange ?? 0, "Pesanan")}</CardFooter>
      </Card>
    </div>
  );
}
