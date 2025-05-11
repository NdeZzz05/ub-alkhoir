import { getUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

type SalesData = {
  date: Date;
  total: bigint;
};

export async function GET(req: NextRequest) {
  const { user } = await getUser();

  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fromStr = req.nextUrl.searchParams.get("from");
  const toStr = req.nextUrl.searchParams.get("to");

  const from = fromStr ? new Date(fromStr) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const to = toStr ? new Date(toStr) : new Date();

  try {
    const result = await prisma.$queryRaw`
      SELECT 
        DATE("created_at") as date,
        SUM(total) as total
      FROM "Order"
      WHERE "created_at" BETWEEN ${from} AND ${to}
      GROUP BY DATE("created_at")
      ORDER BY DATE("created_at") ASC
    `;

    const formatted = (result as SalesData[]).map((item) => ({
      date: item.date.toISOString().split("T")[0],
      total: Number(item.total),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Gagal ambil data chart", error);
    return NextResponse.json({ error: "Gagal ambil data chart" }, { status: 500 });
  }
}
