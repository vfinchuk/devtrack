/*
  Warnings:

  - The `seniority` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `employmentType` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currency` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Seniority" AS ENUM ('junior', 'middle', 'senior', 'lead', 'principal');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('b2b', 'uop', 'contract', 'freelance');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PLN', 'EUR', 'USD', 'GBP');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "seniority",
ADD COLUMN     "seniority" "Seniority" NOT NULL DEFAULT 'middle',
DROP COLUMN "employmentType",
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL DEFAULT 'b2b',
DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'EUR';
