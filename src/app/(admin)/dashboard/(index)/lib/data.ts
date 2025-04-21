"use server";

import prisma from "../../../../../../lib/prisma";

export async function getTotalOrder() {
  try {
    const totalOrders = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status_payment: "paid",
      },
    });

    return totalOrders;
  } catch (error) {
    console.log(error);
  }
}
