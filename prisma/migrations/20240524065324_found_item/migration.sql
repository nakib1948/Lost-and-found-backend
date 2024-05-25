/*
  Warnings:

  - You are about to drop the column `categoryId` on the `foundItem` table. All the data in the column will be lost.
  - Added the required column `date` to the `foundItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `foundItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `foundItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemCategory` to the `foundItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `foundItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "foundItem" DROP CONSTRAINT "foundItem_categoryId_fkey";

-- AlterTable
ALTER TABLE "foundItem" DROP COLUMN "categoryId",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "foundItemCategoryId" TEXT,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "itemCategory" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "foundItem" ADD CONSTRAINT "foundItem_foundItemCategoryId_fkey" FOREIGN KEY ("foundItemCategoryId") REFERENCES "foundItemCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
