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

    const orderBy: Prisma.ProductOrderByWithRelationInput = res.sortBy === "priceLowest" ? { price: "asc" } : res.sortBy === "priceHighest" ? { price: "desc" } : {};

    const product = await prisma.product.findMany({
      where: {
        OR: ORQuery.length > 0 ? ORQuery : undefined,
      },
      orderBy,
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
      },
    });

    const response: TProduct[] = product.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: getImageUrl(product.image, "product"),
        category: product.category,
      };
    });

    return Response.json(response);
  } catch (error) {
    console.log(error);
    return Response.json({ status: false }, { status: 500 });
  }
}
