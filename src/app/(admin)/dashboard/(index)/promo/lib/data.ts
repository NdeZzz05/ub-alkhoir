import prisma from "../../../../../../../lib/prisma";

export async function getProductPromo() {
  try {
    const products = await prisma.product.findMany({
      where: {
        promo_id: null,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getPromo() {
  try {
    const promo = await prisma.promo.findMany({
      include: {
        products: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return promo;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPromoById(id: string) {
  try {
    const promo = await prisma.promo.findFirst({
      where: {
        id: id,
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return promo;
  } catch (error) {
    console.log(error);
    return null;
  }
}
