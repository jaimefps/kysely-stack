-- CreateTable
CREATE TABLE "Happening" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "source" TEXT,
    "title" TEXT NOT NULL,

    CONSTRAINT "Happening_pkey" PRIMARY KEY ("id")
);
