/*
  Warnings:

  - You are about to drop the column `fechaCreacion` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `fechaEvento` on the `Evento` table. All the data in the column will be lost.
  - Added the required column `fecha` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "fechaCreacion",
DROP COLUMN "fechaEvento",
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "imagenUrl" TEXT;

-- AlterTable
ALTER TABLE "Noticia" ADD COLUMN     "imagenUrl" TEXT;
