import prisma from "../../../../../../lib/prisma";

export async function getPlot() {
  try {
    const plot = await prisma.plot.findMany({});

    return plot;
  } catch (error) {
    console.log(error);
    return [];
  }
}
