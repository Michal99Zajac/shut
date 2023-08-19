/*
  Warnings:

  - You are about to drop the `_BookmarkToBookmarkGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookmarkGroupId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "BookmarkGroup" DROP CONSTRAINT "BookmarkGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BookmarkToBookmarkGroup" DROP CONSTRAINT "_BookmarkToBookmarkGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookmarkToBookmarkGroup" DROP CONSTRAINT "_BookmarkToBookmarkGroup_B_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "bookmarkGroupId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BookmarkToBookmarkGroup";

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_bookmarkGroupId_fkey" FOREIGN KEY ("bookmarkGroupId") REFERENCES "BookmarkGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkGroup" ADD CONSTRAINT "BookmarkGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
