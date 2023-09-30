-- AlterTable
ALTER TABLE "BookmarkGroup" ADD COLUMN "depth" INTEGER NOT NULL DEFAULT 0;

WITH RECURSIVE depth_calculator AS (
  SELECT "id", "parentId", 0 AS depth
  FROM "BookmarkGroup"
  WHERE "parentId" IS NULL

  UNION ALL

  SELECT bg."id", bg."parentId", dc.depth + 1
  FROM "BookmarkGroup" AS bg
  JOIN depth_calculator AS dc ON bg."parentId" = dc.id
) UPDATE "BookmarkGroup" SET depth = depth_calculator.depth FROM depth_calculator WHERE "BookmarkGroup"."id" = depth_calculator.id;

