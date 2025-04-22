-- CreateTable
CREATE TABLE "Taller" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "facilitador" TEXT NOT NULL,
    "imagenUrl" TEXT NOT NULL,

    CONSTRAINT "Taller_pkey" PRIMARY KEY ("id")
);
