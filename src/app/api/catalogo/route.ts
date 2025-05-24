import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const data = await req.json()
  const libro = await prisma.libro.create({ data })
  return NextResponse.json(libro)
}

export async function GET() {
  const libros = await prisma.libro.findMany({ orderBy: { id: 'desc' } })
  return NextResponse.json(libros)
}
