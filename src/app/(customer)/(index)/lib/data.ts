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
        price: true,
        stock: true,
        order_product: {
          select: {
            quantity: true,
          },
        },
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

    const response = products
      .map((item) => {
        const totalSold = item.order_product.reduce((acc, cur) => acc + cur.quantity, 0);
        const hasPromo = !!item.promo;
        const discount = item.promo?.discount_percentage ?? 0;
        const discounted_price = Math.floor(item.price - (item.price * discount) / 100);

        return {
          ...item,
          totalSold,
          hasPromo,
          image_url: getImageUrl(item.image, "product"),
          price: discounted_price,
          original_price: Number(item.price),
          discount_percentage: discount,
        };
      })
      .sort((a, b) => {
        // 1. Stok tersedia dulu
        if (a.stock > 0 && b.stock === 0) return -1;
        if (a.stock === 0 && b.stock > 0) return 1;

        // 2. Produk promo dulu
        if (a.hasPromo && !b.hasPromo) return -1;
        if (!a.hasPromo && b.hasPromo) return 1;

        // 3. Urutkan berdasarkan penjualan
        return b.totalSold - a.totalSold;
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
