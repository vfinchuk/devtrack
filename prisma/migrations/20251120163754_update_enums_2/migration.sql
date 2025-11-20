/*
  Warnings:

  - The `source` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `seniority` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ApplicationSource" AS ENUM ('LINKEDIN', 'JUSTJOIN', 'NOFLUFF', 'COMPANY_SITE', 'REFERRAL', 'OTHER');

-- CreateEnum
CREATE TYPE "ApplicationSeniority" AS ENUM ('JUNIOR', 'MIDDLE', 'SENIOR', 'LEAD', 'PRINCIPAL');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "source",
ADD COLUMN     "source" "ApplicationSource",
DROP COLUMN "seniority",
ADD COLUMN     "seniority" "ApplicationSeniority" NOT NULL DEFAULT 'MIDDLE';

-- DropEnum
DROP TYPE "Seniority";

-- DropEnum
DROP TYPE "Source";
