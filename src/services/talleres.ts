import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function crearTaller(data: {
  titulo: string
  descripcion: string
  imagenUrl: string
  fecha: string 
  hora: string
  facilitador: string
}) {
  // Asegurarnos de que la fecha sea un objeto Date válido
  const fechaObj = new Date(data.fecha)
  if (isNaN(fechaObj.getTime())) {
    throw new Error('Fecha inválida')
  }

  return await prisma.taller.create({
    data: {
      ...data,
      fecha: fechaObj
    }
  })
}

export async function obtenerTalleres() {
  const talleres = await prisma.taller.findMany({
    orderBy: { fecha: 'desc' },
  })
  
  // Convertir las fechas a strings ISO para el frontend
  return talleres.map(taller => ({
    ...taller,
    fecha: taller.fecha.toISOString()
  }))
}

export async function obtenerTallerPorId(id: number) {
  const taller = await prisma.taller.findUnique({
    where: { id },
  })

  if (!taller) return null

  // Convertir la fecha a string ISO para el frontend
  return {
    ...taller,
    fecha: taller.fecha.toISOString()
  }
}

export async function actualizarTaller(id: number, data: {
  titulo: string
  descripcion: string
  imagenUrl: string
  fecha: string  
  hora: string
  facilitador: string
}) {
  // Asegurarnos de que la fecha sea un objeto Date válido
  const fechaObj = new Date(data.fecha)
  if (isNaN(fechaObj.getTime())) {
    throw new Error('Fecha inválida')
  }

  const taller = await prisma.taller.update({
    where: { id },
    data: {
      ...data,
      fecha: fechaObj
    }
  })

  // Convertir la fecha a string ISO para el frontend
  return {
    ...taller,
    fecha: taller.fecha.toISOString()
  }
}

export async function eliminarTaller(id: number) {
  return await prisma.taller.delete({
    where: { id },
  })
}

export async function obtenerTalleresProximos() {
  const hoy = new Date()
  const talleres = await prisma.taller.findMany({
    where: {
      fecha: {
        gte: hoy,
      },
    },
    orderBy: { fecha: 'asc' },
  })

  // Convertir las fechas a strings ISO para el frontend
  return talleres.map(taller => ({
    ...taller,
    fecha: taller.fecha.toISOString()
  }))
}

