/*
  Warnings:

  - The primary key for the `plans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `plans` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `threadId` on the `threads` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itinerary` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelers` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripName` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "plans" DROP CONSTRAINT "plans_threadId_fkey";

-- DropForeignKey
ALTER TABLE "plans" DROP CONSTRAINT "plans_userId_fkey";

-- DropIndex
DROP INDEX "threads_threadId_key";

-- AlterTable
ALTER TABLE "plans" DROP CONSTRAINT "plans_pkey",
ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "itinerary" JSONB NOT NULL,
ADD COLUMN     "selectedViber" TEXT[],
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "travelers" JSONB NOT NULL,
ADD COLUMN     "tripName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ADD CONSTRAINT "plans_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "threadId";

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
