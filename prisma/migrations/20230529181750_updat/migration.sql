/*
  Warnings:

  - You are about to drop the column `userId` on the `Goal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_userId_fkey";

-- DropIndex
DROP INDEX "Goal_userId_key";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "goalId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
