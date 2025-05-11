import { PrismaClient, EstadoEvento } from '@prisma/client'

const prisma = new PrismaClient()

export async function crearEvento(
  titulo: string,
  descripcion: string,
  fechaEvento: string,
  estado: string,
  imagenUrl?: string 
) {
  return await prisma.evento.create({
    data: {
      titulo,
      descripcion,
      fecha: new Date(fechaEvento),
      estado: estado as EstadoEvento, 
      imagenUrl: imagenUrl ?? '',
    },
  })
}

export async function obtenerEventos() {
  return await prisma.evento.findMany({
    orderBy: { fecha: 'asc' },
  })
}
