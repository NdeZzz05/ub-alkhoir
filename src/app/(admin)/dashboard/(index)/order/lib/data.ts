import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../column";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        order_product: {
          include: {
            product: true,
          },
        },
      },
    });

    const response: TColumn[] = orders.map((ord) => {
      return {
        id: ord.id,
        customer_name: ord.user.name,
        price: Number(ord.total),
        products: ord.order_product?.map((item) => {
          return {
            name: item.product.name,
            image: getImageUrl(item.product.image[0]),
          };
        }),
        status: ord.status,
      };
    });

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}
