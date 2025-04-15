import { redirect } from "next/navigation";
import prisma from "../../../../../../lib/prisma";
import { getImageUrl } from "@/lib/supabase";

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            order_product: true,
          },
        },
        image: true,
        description: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
        promo: {
          select: {
            discount_percentage: true,
          },
        },
      },
    });

    if (!product) {
      return redirect("/");
    }

    const discount = product.promo?.discount_percentage ?? 0;
    const discounted_price = Math.floor(product.price - (product.price * discount) / 100);

    return {
      ...product,
      image_url: getImageUrl(product.image, "product"),
      price: discounted_price,
      original_price: Number(product.price),
      discount_percentage: discount,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
