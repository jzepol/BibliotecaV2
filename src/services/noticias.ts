import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function crearNoticia(
  titulo: string,
  contenido: string,
  imagenUrl?: string
) {
  return await prisma.noticia.create({
    data: {
      titulo,
      contenido,
      imagenUrl,
    },
  })
}

export async function obtenerNoticias() {
  return await prisma.noticia.findMany({
    orderBy: { fecha: 'desc' },
  })
}

export async function obtenerNoticiaPorId(id: number) {
  return await prisma.noticia.findUnique({
    where: { id },
  })
}

export async function actualizarNoticia(
  id: number,
  titulo: string,
  contenido: string,
  imagenUrl?: string
) {
  return await prisma.noticia.update({
    where: { id },
    data: {
      titulo,
      contenido,
      imagenUrl,
    },
  })
}

export async function eliminarNoticia(id: number) {
  return await prisma.noticia.delete({
    where: { id },
  })
}
