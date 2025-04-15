import { TFilter } from "@/hooks/useFilter";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { getImageUrl } from "@/lib/supabase";
import { TProduct } from "@/types";

export async function POST(request: Request) {
  try {
    const res = (await request.json()) as TFilter;

    const ORQuery: Prisma.ProductWhereInput[] = [];

    if (res.search && res.search !== "") {
      ORQuery.push({
        name: { contains: res.search, mode: "insensitive" },
      });
    }

    if (res.minPrice && res.minPrice > 0) {
      ORQuery.push({ price: { gte: res.minPrice } });
    }

    if (res.maxPrice && res.maxPrice > 0) {
      ORQuery.push({ price: { lte: res.maxPrice } });
    }

    if (res.category && res.category.length > 0) {
      ORQuery.push({
        category: {
          id: {
            in: res.category,
          },
        },
      });
    }

    if (res.promo && res.promo !== "") {
      ORQuery.push({
        promo_id: res.promo,
      });
    }

    const product = await prisma.product.findMany({
      where: {
        OR: ORQuery.length > 0 ? ORQuery : undefined,
      },
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
        stock: true,
      },
    });

    const response: TProduct[] = product.map((product) => {
      const discount = product.promo?.discount_percentage ?? 0;
      const discounted_price = Math.floor(product.price - (product.price * discount) / 100);
      return {
        id: product.id,
        name: product.name,
        price: discounted_price,
        image_url: getImageUrl(product.image, "product"),
        category: product.category,
        original_price: Number(product.price),
        discount_percentage: discount,
        stock: product.stock,
      };
    });

    if (res.sortBy === "priceLowest") {
      response.sort((a, b) => a.price - b.price);
    } else if (res.sortBy === "priceHighest") {
      response.sort((a, b) => b.price - a.price);
    }

    return Response.json(response);
  } catch (error) {
    console.log(error);
    return Response.json({ status: false }, { status: 500 });
  }
}
