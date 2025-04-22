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

  const range = req.nextUrl.searchParams.get("range") || "30d";

  let days = 30;
  if (range === "30d") days = 30;
  if (range === "7d") days = 7;

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  try {
    const result = await prisma.$queryRaw`
    SELECT 
      DATE("created_at") as date,
      SUM(total) as total
    FROM "Order"
    WHERE "created_at" >= ${startDate}
    GROUP BY DATE("created_at")
    ORDER BY DATE("created_at") ASC
  `;

    // Convert BigInt (PostgreSQL SUM result) ke number biasa (biar gak error di frontend)
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
