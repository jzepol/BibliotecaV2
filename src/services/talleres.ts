import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function crearTaller(data: {
  titulo: string
  descripcion: string
  imagenUrl: string
  fecha: Date
  hora: string
  facilitador: string
}) {
  return await prisma.taller.create({ data })
}

export async function obtenerTalleres() {
  return await prisma.taller.findMany({
    orderBy: { fecha: 'desc' },
  })
}

export async function obtenerTallerPorId(id: number) {
  return await prisma.taller.findUnique({
    where: { id },
  })
}

export async function actualizarTaller(id: number, data: {
  titulo: string
  descripcion: string
  imagenUrl: string
  fecha: Date
  hora: string
  facilitador: string
}) {
  return await prisma.taller.update({
    where: { id },
    data,
  })
}

export async function eliminarTaller(id: number) {
  return await prisma.taller.delete({
    where: { id },
  })
}
