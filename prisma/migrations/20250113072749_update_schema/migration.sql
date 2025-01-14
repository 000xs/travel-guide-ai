/*
  Warnings:

  - You are about to drop the column `userId` on the `plans` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "plans" DROP CONSTRAINT "plans_userId_fkey";

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
