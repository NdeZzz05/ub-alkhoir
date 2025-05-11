// app/api/orders/route.ts
import { Prisma } from "@prisma/client";
import { TOrderFilter } from "@/hooks/useOrderFilter";
import prisma from "../../../../lib/prisma";
import { getUser } from "@/lib/auth";

export async function POST(req: Request) {
  const { user } = await getUser();
  try {
    const body = (await req.json()) as TOrderFilter;

    const where: Prisma.OrderWhereInput = {};

    if (user?.role !== "admin") {
      return Response.json({ status: false }, { status: 403 });
    }

    if (body.status) {
      where.status_order = body.status;
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: {
        updated_at: "desc",
      },
      include: {
        user: true,
        order_product: {
          include: {
            product: true,
          },
        },
        order_detail: true,
      },
    });

    const formattedOrders = orders.map((ord) => ({
      id: ord.id,
      code: ord.code,
      customer_name: ord.user.name,
      customer_phone: ord.user.phone_number,
      price: Number(ord.total),
      products: ord.order_product.map((item) => ({
        name: item.product.name,
        image: item.product.image,
        quantity: item.quantity,
      })),
      status_payment: ord.status_payment,
      status_order: ord.status_order,
      type_order: ord.order_detail?.order_type,
      payment_method: ord.order_detail?.payment_method,
    }));

    // Ambil jumlah pesanan per status
    const counts = await prisma.order.groupBy({
      by: ["status_order"],
      _count: {
        _all: true,
      },
    });

    // Ubah ke bentuk objek { processed: 5, shipped: 2, ... }
    const countMap = counts.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.status_order] = curr._count._all;
      return acc;
    }, {});

    return Response.json({
      orders: formattedOrders,
      count_by_status: countMap,
    });
  } catch (error) {
    console.error("Failed to fetch orders", error);
    return Response.json({ status: false }, { status: 500 });
  }
}
