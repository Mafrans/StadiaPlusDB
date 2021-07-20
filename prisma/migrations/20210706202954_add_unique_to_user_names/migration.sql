/*
  Warnings:

  - A unique constraint covering the columns `[names]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[searchNames]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.names_unique" ON "User"("names");

-- CreateIndex
CREATE UNIQUE INDEX "User.searchNames_unique" ON "User"("searchNames");
