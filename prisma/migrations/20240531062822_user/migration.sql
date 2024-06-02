-- CreateEnum
CREATE TYPE "Isdeleted" AS ENUM ('block', 'unblock');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isDeleted" "Isdeleted" NOT NULL DEFAULT 'unblock';
