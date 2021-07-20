/*
  Warnings:

  - A unique constraint covering the columns `[patreonInfoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PatreonInfo" ADD COLUMN     "patreonId" TEXT,
ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_patreonInfoId_unique" ON "User"("patreonInfoId");
