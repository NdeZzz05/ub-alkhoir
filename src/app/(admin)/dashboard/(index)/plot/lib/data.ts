// import prisma from "../../../../../../../lib/prisma";

// export async function getPlot() {
//   try {
//     const plot = await prisma.plot.findMany({});

//     return plot;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// export async function getPlotById(id: string) {
//   try {
//     const plot = await prisma.plot.findFirst({
//       where: {
//         id: id,
//       },
//     });
//     return plot;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
