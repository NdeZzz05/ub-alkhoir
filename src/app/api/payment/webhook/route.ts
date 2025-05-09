// app/api/payment/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { order_id, transaction_status } = body;

  if (transaction_status === "capture" || transaction_status === "settlement") {
    // Berhasil dibayar
    await prisma.order.update({
      where: { code: order_id },
      data: {
        status_payment: "paid",
      },
    });
  } else if (transaction_status === "expire" || transaction_status === "cancel") {
    // Gagal dibayar
    await prisma.order.update({
      where: { code: order_id },
      data: {
        status_payment: "failed",
      },
    });
  }

  return NextResponse.json({ received: true });
}
