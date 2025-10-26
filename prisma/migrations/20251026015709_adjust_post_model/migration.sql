/*
  Warnings:

  - Added the required column `originalPrice` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotionalPrice` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "promotionalPrice" DOUBLE PRECISION NOT NULL;
