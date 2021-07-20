/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `PatreonInfo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `index` on table `Achievement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gameId` on table `Achievement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Achievement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `historyId` on table `Achievement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gameId` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `History` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gameId` on table `History` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `History` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tier` on table `PatreonInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `PatreonInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `patreonId` on table `PatreonInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `PatreonInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `googleId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_patreonInfoId_fkey";

-- DropIndex
DROP INDEX "User_patreonInfoId_unique";

-- AlterTable
ALTER TABLE "Achievement" ALTER COLUMN "index" SET NOT NULL,
ALTER COLUMN "gameId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "historyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "gameId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "History" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "gameId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PatreonInfo" ALTER COLUMN "tier" SET NOT NULL,
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "patreonId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "googleId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game.userId_gameId_unique" ON "Game"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "PatreonInfo_userId_unique" ON "PatreonInfo"("userId");

-- AddForeignKey
ALTER TABLE "PatreonInfo" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
