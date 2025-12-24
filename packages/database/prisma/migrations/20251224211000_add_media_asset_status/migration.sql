-- CreateEnum
CREATE TYPE "MediaAssetStatus" AS ENUM ('PROCESSING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "MediaAsset" ADD COLUMN "status" "MediaAssetStatus" NOT NULL DEFAULT 'READY';
ALTER TABLE "MediaAsset" ADD COLUMN "errorReason" TEXT;
