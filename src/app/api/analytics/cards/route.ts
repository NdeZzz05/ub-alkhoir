import { startOfMonth, subMonths } from "date-fns";
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  const now = new Date();
  const startThisMonth = startOfMonth(now);
  const startLastMonth = startOfMonth(subMonths(now, 1));

  // 🔸 This Month
  const thisMonthOrders = await prisma.order.findMany({
    where: {
      created_at: {
        gte: startThisMonth,
      },
    },
  });

  const totalSalesThisMonth = thisMonthOrders.reduce((sum, order) => sum + Number(order.total), 0);
  const totalBuyersThisMonth = new Set(thisMonthOrders.map((order) => order.user_id)).size;
  const totalOrdersThisMonth = thisMonthOrders.length;

  // 🔹 Last Month
  const lastMonthOrders = await prisma.order.findMany({
    where: {
      created_at: {
        gte: startLastMonth,
        lt: startThisMonth,
      },
    },
  });

  const totalSalesLastMonth = lastMonthOrders.reduce((sum, order) => sum + Number(order.total), 0);
  const totalBuyersLastMonth = new Set(lastMonthOrders.map((order) => order.user_id)).size;
  const totalOrdersLastMonth = lastMonthOrders.length;

  // 📊 Percentage Change
  const calcChange = (current: number, prev: number): number => {
    if (prev === 0) return current > 0 ? 100 : 0;
    return +(((current - prev) / prev) * 100).toFixed(1);
  };

  return NextResponse.json({
    totalSales: totalSalesThisMonth,
    salesChange: calcChange(totalSalesThisMonth, totalSalesLastMonth),
    totalBuyers: totalBuyersThisMonth,
    buyersChange: calcChange(totalBuyersThisMonth, totalBuyersLastMonth),
    totalOrders: totalOrdersThisMonth,
    ordersChange: calcChange(totalOrdersThisMonth, totalOrdersLastMonth),
  });
}
