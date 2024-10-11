/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "size" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "uploadTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "File_uuid_key" ON "File"("uuid");
