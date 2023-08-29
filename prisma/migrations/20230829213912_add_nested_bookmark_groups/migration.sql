-- AlterTable
ALTER TABLE "BookmarkGroup" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "BookmarkGroup" ADD CONSTRAINT "BookmarkGroup_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "BookmarkGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
