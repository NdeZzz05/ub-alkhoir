"use server";

import prisma from "../../../../../../lib/prisma";
import { formatISO } from "date-fns";

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

export async function getDownloadReport(from: Date, to: Date) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        created_at: {
          gte: from,
          lte: to,
        },
      },
      orderBy: {
        created_at: "asc",
      },
      include: {
        order_detail: true,
        order_product: {
          include: {
            product: true,
          },
        },
      },
    });

    const formattedOrders = orders.map((order) => ({
      order: {
        id: order.id,
        code: order.code,
        status_order: order.status_order,
        status_payment: order.status_payment,
        token_payment: order.token_payment,
        total: order.total.toString(), // Convert BigInt to string
        user_id: order.user_id,
        created_at: formatISO(order.created_at),
        updated_at: formatISO(order.updated_at),
      },
      orderDetail: order.order_detail
        ? {
            id: order.order_detail.id,
            name: order.order_detail.name,
            phone: order.order_detail.phone,
            address: order.order_detail.address,
            notes: order.order_detail.notes,
            order_type: order.order_detail.order_type,
            payment_method: order.order_detail.payment_method,
            created_at: formatISO(order.order_detail.created_at),
            updated_at: formatISO(order.order_detail.updated_at),
          }
        : null,
      orderProducts: order.order_product.map((op) => ({
        id: op.id,
        subtotal: op.subtotal.toString(), // Convert BigInt to string
        quantity: op.quantity,
        product_id: op.product_id,
        created_at: formatISO(op.created_at),
        updated_at: formatISO(op.updated_at),
        product_name: op.product.name,
      })),
    }));

    return formattedOrders;
  } catch (error) {
    console.error("Gagal ambil laporan:", error);
    throw new Error("Gagal ambil laporan");
  }
}
