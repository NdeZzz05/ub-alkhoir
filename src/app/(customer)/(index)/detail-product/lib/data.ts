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
      },
    });

    if (!product) {
      return redirect("/");
    }

    return {
      ...product,
      image_url: getImageUrl(product.image, "product"),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
