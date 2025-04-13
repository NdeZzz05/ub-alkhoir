/*
  Warnings:

  - Added the required column `plot_id` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "plot_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Plot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "Plot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
