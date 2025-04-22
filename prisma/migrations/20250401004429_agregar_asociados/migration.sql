-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('ACTIVO', 'JUVENIL', 'CONTRIBUYENTE');

-- CreateTable
CREATE TABLE "Asociado" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "direccion" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "escuela" TEXT,
    "curso" TEXT,
    "comentario" TEXT,
    "fechaInscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asociado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asociado_email_key" ON "Asociado"("email");
