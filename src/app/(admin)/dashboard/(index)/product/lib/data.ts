import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../column";
// import { TColumn } from "../column";

export async function getProduct() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        stock: true,
        description: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const response_product: TColumn[] = products.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image,
        price: Number(item.price),
        description: item.description,
        stock: Number(item.stock),
        category_name: item.category.name,
      };
    });
    return response_product;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
