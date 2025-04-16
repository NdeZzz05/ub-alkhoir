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
        order_detail: true,
      },
    });

    const response: TColumn[] = orders.map((ord) => {
      return {
        id: ord.id,
        customer_name: ord.user.name,
        customer_phone: ord.user.phone_number,
        price: Number(ord.total),
        products: ord.order_product?.map((item) => {
          return {
            name: item.product.name,
            image: item.product.image,
            quantity: item.quantity,
          };
        }),
        status_payment: ord.status_payment,
        status_order: ord.status_order,
        type_order: ord.order_detail?.order_type,
        payment_method: ord.order_detail?.payment_method,
      };
    });

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: id,
      },
    });
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
}
