-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('OWNER', 'ZAMERCHI', 'BRIGADER', 'MANAGER');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "telegramId" BIGINT,
    "phone" TEXT,
    "name" TEXT,
    "role" "public"."UserRole",
    "status" "public"."UserStatus" DEFAULT 'ACTIVE',
    "telegramFirstName" TEXT,
    "telegramLastName" TEXT,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "public"."User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");
