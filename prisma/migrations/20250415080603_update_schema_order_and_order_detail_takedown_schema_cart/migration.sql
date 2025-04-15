/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `OrderDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status_payment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_type` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('pick_up', 'delivery');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_order_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status_order" "StatusOrder" NOT NULL DEFAULT 'processed',
ADD COLUMN     "status_payment" "StatusPayment" NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "order_type" "OrderType" NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Payment";

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetail_order_id_key" ON "OrderDetail"("order_id");
