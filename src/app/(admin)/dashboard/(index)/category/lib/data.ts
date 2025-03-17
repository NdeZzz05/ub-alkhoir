import prisma from "../../../../../../../lib/prisma";

export async function getCategory() {
  try {
    const category = await prisma.category.findMany({});

    return category;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: id,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}
