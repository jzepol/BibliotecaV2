import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const libro = await prisma.libro.update({
    where: { id: parseInt(params.id) },
    data
  })
  return NextResponse.json(libro)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.libro.delete({
    where: { id: parseInt(params.id) }
  })
  return NextResponse.json({ message: 'Eliminado correctamente' })
}
