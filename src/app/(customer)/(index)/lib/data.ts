import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    const response = categories.map((item) => {
      return {
        ...item,
        image_url: getImageUrl(item.image, "category"),
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true,
      },
    });

    const response = products.map((item) => {
      return {
        ...item,
        image_url: getImageUrl(item.image, "product"),
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
