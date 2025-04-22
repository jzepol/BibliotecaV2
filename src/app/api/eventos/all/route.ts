import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const eventos = await prisma.evento.findMany({
    orderBy: { fecha: 'desc' }
  })

  return NextResponse.json(eventos)
}
