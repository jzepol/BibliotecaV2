// src/app/api/eventos/proximos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function GET() {
  try {
    const eventos = await prisma.evento.findMany({
      where: {
        estado: {
          in: ['PROXIMAMENTE', 'EN_CURSO'],
        },
      },
      orderBy: { fecha: 'asc' },
    })

    return NextResponse.json(eventos)
  } catch (error) {
    console.error('Error al obtener eventos:', error)
    return NextResponse.json({ error: 'Error al obtener eventos' }, { status: 500 })
  }
}
