import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const data = await req.json()

  // Obtener el último valor de st existente
  const ultimo = await prisma.libro.findFirst({
    orderBy: { st: 'desc' },
    where: { st: { not: null } },
  })

  const nuevoSt = (ultimo?.st || 7212) + 1

  const libro = await prisma.libro.create({
    data: {
      ...data,
      st: data.st ?? nuevoSt, // usa el que viene si existe, o autogenera
    },
  })

  return NextResponse.json(libro)
}

export async function GET() {
  const libros = await prisma.libro.findMany({ orderBy: { id: 'desc' } })
  return NextResponse.json(libros)
}
