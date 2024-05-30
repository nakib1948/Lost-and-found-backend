/*
  Warnings:

  - Added the required column `phone` to the `claim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claim" ADD COLUMN     "phone" TEXT NOT NULL;
