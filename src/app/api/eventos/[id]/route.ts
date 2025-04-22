import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// DELETE /api/eventos/[id]
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    await prisma.evento.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar el evento:', error)
    return NextResponse.json({ error: 'Error al eliminar el evento' }, { status: 500 })
  }
}

// PUT /api/eventos/[id]
export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  const body = await req.json()
  const { titulo, descripcion, fecha, estado, imagenUrl } = body

  if (!titulo || !descripcion || !fecha || !estado) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  try {
    const evento = await prisma.evento.update({
      where: { id },
      data: {
        titulo,
        descripcion,
        fecha: new Date(fecha),
        estado,
        imagenUrl,
      },
    })

    return NextResponse.json(evento)
  } catch (error) {
    console.error('Error al editar evento:', error)
    return NextResponse.json({ error: 'Error al editar el evento' }, { status: 500 })
  }
}
