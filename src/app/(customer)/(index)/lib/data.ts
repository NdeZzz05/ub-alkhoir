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
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        image: true,
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

    const response = products.map((item) => {
      const discount = item.promo?.discount_percentage ?? 0;
      const discounted_price = Math.floor(item.price - (item.price * discount) / 100);
      return {
        ...item,
        image_url: getImageUrl(item.image, "product"),
        price: discounted_price,
        original_price: Number(item.price),
        discount_percentage: discount,
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getBannerPromo() {
  try {
    const promos = await prisma.promo.findMany({});

    const response = promos.map((item) => {
      return {
        ...item,
        image_url: getImageUrl(item.image, "promo"),
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
