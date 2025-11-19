/*
  Warnings:

  - The values [applied,screening,interview,offer,rejected,on_hold,withdrawn] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [resume,other] on the enum `AttachmentKind` will be removed. If these variants are still used in the database, this will fail.
  - The values [b2b,uop,contract,freelance] on the enum `EmploymentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [screening,tech,system_design,manager,hr,offer_call,other] on the enum `InterviewStage` will be removed. If these variants are still used in the database, this will fail.
  - The values [phone,video,onsite,task] on the enum `InterviewType` will be removed. If these variants are still used in the database, this will fail.
  - The values [junior,middle,senior,lead,principal] on the enum `Seniority` will be removed. If these variants are still used in the database, this will fail.
  - The values [linkedin,justjoin,nofluff,company_site,referral,other] on the enum `Source` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'ON_HOLD', 'WITHDRAWN');
ALTER TABLE "Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "ApplicationStatus_old";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'APPLIED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "AttachmentKind_new" AS ENUM ('RESUME', 'OTHER');
ALTER TABLE "Attachment" ALTER COLUMN "kind" DROP DEFAULT;
ALTER TABLE "Attachment" ALTER COLUMN "kind" TYPE "AttachmentKind_new" USING ("kind"::text::"AttachmentKind_new");
ALTER TYPE "AttachmentKind" RENAME TO "AttachmentKind_old";
ALTER TYPE "AttachmentKind_new" RENAME TO "AttachmentKind";
DROP TYPE "AttachmentKind_old";
ALTER TABLE "Attachment" ALTER COLUMN "kind" SET DEFAULT 'OTHER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EmploymentType_new" AS ENUM ('B2B', 'UOP', 'CONTRACT', 'FREELANCE');
ALTER TABLE "Application" ALTER COLUMN "employmentType" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "employmentType" TYPE "EmploymentType_new" USING ("employmentType"::text::"EmploymentType_new");
ALTER TYPE "EmploymentType" RENAME TO "EmploymentType_old";
ALTER TYPE "EmploymentType_new" RENAME TO "EmploymentType";
DROP TYPE "EmploymentType_old";
ALTER TABLE "Application" ALTER COLUMN "employmentType" SET DEFAULT 'B2B';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "InterviewStage_new" AS ENUM ('SCREENING', 'TECH', 'SYSTEM_DESIGN', 'MANAGER', 'HR', 'OFFER_CALL', 'OTHER');
ALTER TABLE "Interview" ALTER COLUMN "stage" TYPE "InterviewStage_new" USING ("stage"::text::"InterviewStage_new");
ALTER TYPE "InterviewStage" RENAME TO "InterviewStage_old";
ALTER TYPE "InterviewStage_new" RENAME TO "InterviewStage";
DROP TYPE "InterviewStage_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "InterviewType_new" AS ENUM ('PHONE', 'VIDEO', 'ONSITE', 'TASK');
ALTER TABLE "Interview" ALTER COLUMN "type" TYPE "InterviewType_new" USING ("type"::text::"InterviewType_new");
ALTER TYPE "InterviewType" RENAME TO "InterviewType_old";
ALTER TYPE "InterviewType_new" RENAME TO "InterviewType";
DROP TYPE "InterviewType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Seniority_new" AS ENUM ('JUNIOR', 'MIDDLE', 'SENIOR', 'LEAD', 'PRINCIPAL');
ALTER TABLE "Application" ALTER COLUMN "seniority" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "seniority" TYPE "Seniority_new" USING ("seniority"::text::"Seniority_new");
ALTER TYPE "Seniority" RENAME TO "Seniority_old";
ALTER TYPE "Seniority_new" RENAME TO "Seniority";
DROP TYPE "Seniority_old";
ALTER TABLE "Application" ALTER COLUMN "seniority" SET DEFAULT 'MIDDLE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Source_new" AS ENUM ('LINKEDIN', 'JUSTJOIN', 'NOFLUFF', 'COMPANY_SITE', 'REFERRAL', 'OTHER');
ALTER TABLE "Application" ALTER COLUMN "source" TYPE "Source_new" USING ("source"::text::"Source_new");
ALTER TYPE "Source" RENAME TO "Source_old";
ALTER TYPE "Source_new" RENAME TO "Source";
DROP TYPE "Source_old";
COMMIT;

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'APPLIED',
ALTER COLUMN "seniority" SET DEFAULT 'MIDDLE',
ALTER COLUMN "employmentType" SET DEFAULT 'B2B';

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "kind" SET DEFAULT 'OTHER';
