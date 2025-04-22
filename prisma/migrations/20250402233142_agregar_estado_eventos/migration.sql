-- CreateEnum
CREATE TYPE "EstadoEvento" AS ENUM ('PROXIMAMENTE', 'EN_CURSO', 'FINALIZADO');

-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "estado" "EstadoEvento" NOT NULL DEFAULT 'PROXIMAMENTE';
