// app/api/pagos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const body = await req.json()
    const { mes, año, estado, comentario, comprobanteUrl } = body

    const pagoActualizado = await prisma.pago.update({
      where: { id },
      data: {
        mes,
        año,
        estado,
        comentario: comentario || '',
        comprobanteUrl: comprobanteUrl || null,
      },
    })

    return NextResponse.json(pagoActualizado)
  } catch (error) {
    console.error('Error al actualizar pago:', error)
    return NextResponse.json({ error: 'No se pudo actualizar el pago' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)

    await prisma.pago.delete({
      where: { id },
    })

    return NextResponse.json({ mensaje: 'Pago eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar pago:', error)
    return NextResponse.json({ error: 'No se pudo eliminar el pago' }, { status: 500 })
  }
}
