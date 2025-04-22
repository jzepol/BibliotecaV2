import { prisma } from '../../lib/prisma'
import { Categoria } from '@prisma/client'

export async function crearAsociado(data: {
  email: string
  apellido: string
  nombre: string
  dni: number
  fechaNacimiento: string
  direccion: string
  categoria: Categoria
  escuela?: string
  curso?: string
  comentario?: string
}) {
  return await prisma.asociado.create({
    data: {
      ...data,
      fechaNacimiento: new Date(data.fechaNacimiento),
    },
  })
}
