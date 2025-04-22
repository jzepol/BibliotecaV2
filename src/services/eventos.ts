import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function crearEvento(
  titulo: string,
  descripcion: string,
  fechaEvento: string,
  estado: string,
  imagenUrl?: string // <-- agregar este parámetro opcional
) {
  return await prisma.evento.create({
    data: {
      titulo,
      descripcion,
      fecha: new Date(fechaEvento),
      estado,
      imagenUrl, // <-- solo se guardará si está definido
    },
  })
}


export async function obtenerEventos() {
  return await prisma.evento.findMany({
    orderBy: { fecha: 'asc' },
  })
}
