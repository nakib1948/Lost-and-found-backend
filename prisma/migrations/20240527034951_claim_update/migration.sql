/*
  Warnings:

  - You are about to drop the column `distinguishingFeatures` on the `claim` table. All the data in the column will be lost.
  - Added the required column `claimRequest` to the `claim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageProf` to the `claim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claim" DROP COLUMN "distinguishingFeatures",
ADD COLUMN     "claimRequest" TEXT NOT NULL,
ADD COLUMN     "imageProf" TEXT NOT NULL;
