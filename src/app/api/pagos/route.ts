import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { asociadoId, mes, año, estado, comentario, comprobanteUrl } = body

    if (!asociadoId || !mes || !año || !estado) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 })
    }

    // Verificar si ya existe el pago
    const existente = await prisma.pago.findFirst({
      where: { asociadoId, mes, año }
    })

    if (existente) {
      // Actualizar si ya existe
      const actualizado = await prisma.pago.update({
        where: { id: existente.id },
        data: {
          estado,
          comentario: comentario ?? '',
          comprobanteUrl: comprobanteUrl ?? null,
        },
      })
      return NextResponse.json(actualizado)
    }

  
    const nuevoPago = await prisma.pago.create({
      data: {
        asociadoId,
        mes,
        año,
        estado,
        comentario: comentario ?? '',
        comprobanteUrl: comprobanteUrl ?? null
      }
    })

    return NextResponse.json(nuevoPago)
  } catch (error) {
    console.error('Error al registrar pago:', error)
    return NextResponse.json({ error: 'No se pudo registrar el pago' }, { status: 500 })
  }
}
