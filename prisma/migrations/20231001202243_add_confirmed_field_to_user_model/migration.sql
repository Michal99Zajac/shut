-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;

-- UpdateTable
UPDATE "User" SET "confirmed" = true WHERE "confirmed" IS FALSE;
