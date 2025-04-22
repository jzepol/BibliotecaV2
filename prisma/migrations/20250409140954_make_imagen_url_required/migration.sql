/*
  Warnings:

  - Made the column `imagenUrl` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagenUrl` on table `Noticia` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Evento" ALTER COLUMN "imagenUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "Noticia" ALTER COLUMN "imagenUrl" SET NOT NULL;
