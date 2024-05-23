-- CreateEnum
CREATE TYPE "FoundStatus" AS ENUM ('FOUND', 'NOTFOUND');

-- CreateTable
CREATE TABLE "LostItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ItemCategory" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "Location" TEXT NOT NULL,
    "foundStatus" "FoundStatus" NOT NULL DEFAULT 'NOTFOUND',
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "LostItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LostItem" ADD CONSTRAINT "LostItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
