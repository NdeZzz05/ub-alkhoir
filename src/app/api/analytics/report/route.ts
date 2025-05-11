import { getUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const { user } = await getUser();

  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fromStr = req.nextUrl.searchParams.get("from");
  const toStr = req.nextUrl.searchParams.get("to");

  const from = fromStr ? new Date(fromStr) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // default 30 hari terakhir
  const to = toStr ? new Date(toStr) : new Date();

  try {
    const [salesAggregate, uniqueBuyers, ordersCount] = await Promise.all([
      prisma.order.aggregate({
        _sum: { total: true },
        where: {
          created_at: {
            gte: from,
            lte: to,
          },
        },
      }),
      prisma.order.findMany({
        where: {
          created_at: {
            gte: from,
            lte: to,
          },
        },
        select: {
          user_id: true,
        },
        distinct: ["user_id"],
      }),
      prisma.order.count({
        where: {
          created_at: {
            gte: from,
            lte: to,
          },
        },
      }),
    ]);

    return NextResponse.json({
      totalSales: Number(salesAggregate._sum.total ?? 0),
      totalBuyers: uniqueBuyers.length,
      totalOrders: ordersCount,
    });
  } catch (error) {
    console.error("Gagal ambil data dashboard", error);
    return NextResponse.json({ error: "Gagal ambil data dashboard" }, { status: 500 });
  }
}
