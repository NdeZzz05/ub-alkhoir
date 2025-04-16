import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const code = body.data.reference_id;

    await prisma.order.update({
      where: {
        code: code,
      },
      data: {
        status_payment: body.data.status === "SUCCEEDED" ? "paid" : "failed",
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ status: true });
}
