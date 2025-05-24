import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const asociados = await prisma.asociado.findMany({
      orderBy: { fechaInscripcion: 'desc' },
    })

    // Convertimos telefono a string si existe
    const asociadosSerializados = asociados.map((a) => ({
      ...a,
      telefono: a.telefono !== null ? a.telefono.toString() : null,
    }))

    return NextResponse.json(asociadosSerializados)
  } catch {
    return NextResponse.json({ error: 'Error al obtener asociados' }, { status: 500 })
  }
}
