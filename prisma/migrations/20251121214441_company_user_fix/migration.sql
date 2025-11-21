/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerId_fkey";

-- DropIndex
DROP INDEX "Company_ownerId_name_idx";

-- DropIndex
DROP INDEX "Company_ownerId_name_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Company_userId_name_idx" ON "Company"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_name_key" ON "Company"("userId", "name");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
