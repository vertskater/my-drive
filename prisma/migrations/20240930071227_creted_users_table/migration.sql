-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "uuid" UUID NOT NULL,
    "forename" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
