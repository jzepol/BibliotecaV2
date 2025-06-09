import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop()
    if (!id) {
      return NextResponse.json({ error: 'ID no válido' }, { status: 400 })
    }

    const asociadoId = parseInt(id)

    const pagos = await prisma.pago.findMany({
      where: { asociadoId },
      orderBy: { mes: 'asc' }
    })

    return NextResponse.json(pagos)
  } catch (error) {
    console.error('Error al obtener pagos:', error)
    return NextResponse.json({ error: 'No se pudieron obtener los pagos' }, { status: 500 })
  }
}
