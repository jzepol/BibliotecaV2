import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const asociados = await prisma.asociado.findMany({
      orderBy: { fechaInscripcion: 'desc' },
    })
    return NextResponse.json(asociados)
  } catch {
    return NextResponse.json({ error: 'Error al obtener asociados' }, { status: 500 })
  }
}
