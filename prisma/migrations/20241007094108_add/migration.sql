/*
  Warnings:

  - You are about to drop the column `cloudlink` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cloudId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cloudPath` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "cloudlink",
ADD COLUMN     "cloudId" TEXT NOT NULL,
ADD COLUMN     "cloudPath" TEXT NOT NULL,
ALTER COLUMN "folderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_uuid_key" ON "Folder"("uuid");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
