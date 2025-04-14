/*
  Warnings:

  - You are about to drop the column `end_date` on the `Promo` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Promo` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Promo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Promo" DROP CONSTRAINT "Promo_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "promo_id" TEXT;

-- AlterTable
ALTER TABLE "Promo" DROP COLUMN "end_date",
DROP COLUMN "product_id",
DROP COLUMN "start_date";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
