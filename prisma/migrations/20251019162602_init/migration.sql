-- CreateTable
CREATE TABLE "gift_wishes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "giftWish" TEXT NOT NULL,
    "giftLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gift_wishes_pkey" PRIMARY KEY ("id")
);
