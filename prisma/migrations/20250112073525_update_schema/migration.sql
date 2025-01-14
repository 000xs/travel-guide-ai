/*
  Warnings:

  - You are about to drop the `planned_places` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trip_plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "planned_places" DROP CONSTRAINT "planned_places_tripPlanId_fkey";

-- DropTable
DROP TABLE "planned_places";

-- DropTable
DROP TABLE "trip_plans";

-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "threads_threadId_key" ON "threads"("threadId");

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
