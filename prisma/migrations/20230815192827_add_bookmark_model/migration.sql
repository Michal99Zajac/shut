-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "frindlyName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);
