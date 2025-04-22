/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesAnalytic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SalesAnalytic" DROP CONSTRAINT "SalesAnalytic_top_selling_product_id_fkey";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "SalesAnalytic";
