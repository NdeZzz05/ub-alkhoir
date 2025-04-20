// /app/api/order/update/route.ts
import { getUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { Prisma, StatusOrder } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { id, currentStatus, paymentMethod, statusPayment } = await req.json();
  const { user } = await getUser();

  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let nextStatus: StatusOrder;
    switch (currentStatus) {
      case "processed":
        nextStatus = "shipped";
        break;
      case "shipped":
        nextStatus = "completed";
        break;
      default:
        return NextResponse.json({ error: "Status tidak valid" });
    }

    const updateData: Prisma.OrderUpdateInput = { status_order: nextStatus };

    if (nextStatus === "completed" && paymentMethod === "cod" && statusPayment === "pending") {
      updateData.status_payment = "paid";
    }

    await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, nextStatus });
  } catch (error) {
    console.error("Failed to update status orders", error);
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}
