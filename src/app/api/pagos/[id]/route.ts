// app/api/pagos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, Mes, EstadoPago } from '@prisma/client'

const prisma = new PrismaClient()

// PUT /api/pagos/[id]
export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  const { mes, año, estado, comentario, comprobanteUrl } = await req.json()

  // Validar que mes y estado sean valores válidos del enum
  if (!Object.values(Mes).includes(mes)) {
    return NextResponse.json(
      { error: 'Mes inválido' },
      { status: 400 }
    )
  }

  if (!Object.values(EstadoPago).includes(estado)) {
    return NextResponse.json(
      { error: 'Estado inválido' },
      { status: 400 }
    )
  }

  try {
    const pagoActualizado = await prisma.pago.update({
      where: { id },
      data: {
        mes: mes as Mes,
        año,
        estado: estado as EstadoPago,
        comentario: comentario || '',
        comprobanteUrl: comprobanteUrl || null,
      },
    })

    return NextResponse.json(pagoActualizado)
  } catch (error) {
    console.error('Error al actualizar pago:', error)
    return NextResponse.json(
      { error: 'No se pudo actualizar el pago' },
      { status: 500 }
    )
  }
}

// DELETE /api/pagos/[id]
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    await prisma.pago.delete({
      where: { id },
    })

    return NextResponse.json({ mensaje: 'Pago eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar pago:', error)
    return NextResponse.json(
      { error: 'No se pudo eliminar el pago' },
      { status: 500 }
    )
  }
}
