/*
  Warnings:

  - You are about to drop the column `ItemCategory` on the `LostItem` table. All the data in the column will be lost.
  - Added the required column `itemCategory` to the `LostItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "LostItem" DROP COLUMN "ItemCategory",
ADD COLUMN     "itemCategory" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
