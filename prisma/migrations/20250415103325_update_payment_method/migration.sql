/*
  Warnings:

  - Added the required column `payment_method` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cod', 'transfer');

-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL;

-- DropEnum
DROP TYPE "MethodPayment";
