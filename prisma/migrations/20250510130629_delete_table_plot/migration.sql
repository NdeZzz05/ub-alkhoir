/*
  Warnings:

  - You are about to drop the column `plot_id` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the `Plot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_plot_id_fkey";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "plot_id";

-- DropTable
DROP TABLE "Plot";
