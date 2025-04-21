"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
const chartData = [
  { date: "2024-04-01", total: 150 },
  { date: "2024-04-02", total: 180 },
  { date: "2024-04-03", total: 120 },
  { date: "2024-04-04", total: 260 },
  { date: "2024-04-05", total: 290 },
  { date: "2024-04-06", total: 340 },
  { date: "2024-04-07", total: 180 },
  { date: "2024-04-08", total: 320 },
  { date: "2024-04-09", total: 110 },
  { date: "2024-04-10", total: 190 },
  { date: "2024-04-11", total: 350 },
  { date: "2024-04-12", total: 210 },
  { date: "2024-04-13", total: 380 },
  { date: "2024-04-14", total: 220 },
  { date: "2024-04-15", total: 170 },
  { date: "2024-04-16", total: 190 },
  { date: "2024-04-17", total: 360 },
  { date: "2024-04-18", total: 410 },
  { date: "2024-04-19", total: 180 },
  { date: "2024-04-20", total: 150 },
  { date: "2024-04-21", total: 200 },
  { date: "2024-04-22", total: 170 },
  { date: "2024-04-23", total: 230 },
  { date: "2024-04-24", total: 290 },
  { date: "2024-04-25", total: 250 },
  { date: "2024-04-26", total: 130 },
  { date: "2024-04-27", total: 420 },
  { date: "2024-04-28", total: 180 },
  { date: "2024-04-29", total: 240 },
  { date: "2024-04-30", total: 380 },
  { date: "2024-05-01", total: 220 },
  { date: "2024-05-02", total: 310 },
  { date: "2024-05-03", total: 190 },
  { date: "2024-05-04", total: 420 },
  { date: "2024-05-05", total: 390 },
  { date: "2024-05-06", total: 520 },
  { date: "2024-05-07", total: 300 },
  { date: "2024-05-08", total: 210 },
  { date: "2024-05-09", total: 180 },
  { date: "2024-05-10", total: 330 },
  { date: "2024-05-11", total: 270 },
  { date: "2024-05-12", total: 240 },
  { date: "2024-05-13", total: 160 },
  { date: "2024-05-14", total: 490 },
  { date: "2024-05-15", total: 380 },
  { date: "2024-05-16", total: 400 },
  { date: "2024-05-17", total: 420 },
  { date: "2024-05-18", total: 350 },
  { date: "2024-05-19", total: 180 },
  { date: "2024-05-20", total: 230 },
  { date: "2024-05-21", total: 140 },
  { date: "2024-05-22", total: 120 },
  { date: "2024-05-23", total: 290 },
  { date: "2024-05-24", total: 220 },
  { date: "2024-05-25", total: 250 },
  { date: "2024-05-26", total: 170 },
  { date: "2024-05-27", total: 460 },
  { date: "2024-05-28", total: 190 },
  { date: "2024-05-29", total: 130 },
  { date: "2024-05-30", total: 280 },
  { date: "2024-05-31", total: 230 },
  { date: "2024-06-01", total: 200 },
  { date: "2024-06-02", total: 410 },
  { date: "2024-06-03", total: 160 },
  { date: "2024-06-04", total: 380 },
  { date: "2024-06-05", total: 140 },
  { date: "2024-06-06", total: 250 },
  { date: "2024-06-07", total: 370 },
  { date: "2024-06-08", total: 320 },
  { date: "2024-06-09", total: 480 },
  { date: "2024-06-10", total: 200 },
  { date: "2024-06-11", total: 150 },
  { date: "2024-06-12", total: 420 },
  { date: "2024-06-13", total: 130 },
  { date: "2024-06-14", total: 380 },
  { date: "2024-06-15", total: 350 },
  { date: "2024-06-16", total: 310 },
  { date: "2024-06-17", total: 520 },
  { date: "2024-06-18", total: 170 },
  { date: "2024-06-19", total: 290 },
  { date: "2024-06-20", total: 450 },
  { date: "2024-06-21", total: 210 },
  { date: "2024-06-22", total: 270 },
  { date: "2024-06-23", total: 530 },
  { date: "2024-06-24", total: 180 },
  { date: "2024-06-25", total: 190 },
  { date: "2024-06-26", total: 380 },
  { date: "2024-06-27", total: 490 },
  { date: "2024-06-28", total: 200 },
  { date: "2024-06-29", total: 160 },
  { date: "2024-06-30", total: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartInfoInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total Penjualan</CardTitle>

        <div className="absolute right-4 top-4">
          <ToggleGroup type="single" value={timeRange} onValueChange={setTimeRange} variant="outline" className="@[767px]/card:flex hidden">
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={5} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="total" type="natural" fill="url(#fillTotal)" stroke="var(--color-total)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
