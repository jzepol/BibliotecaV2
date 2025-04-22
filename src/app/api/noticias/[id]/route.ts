import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// PUT /api/noticias/[id]
export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  const { titulo, contenido, imagenUrl } = await req.json()

  if (!titulo || !contenido) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  try {
    const noticia = await prisma.noticia.update({
      where: { id },
      data: {
        titulo,
        contenido,
        imagenUrl,
      },
    })

    return NextResponse.json(noticia)
  } catch (error) {
    console.error('Error al actualizar noticia:', error)
    return NextResponse.json({ error: 'Error al actualizar la noticia' }, { status: 500 })
  }
}

// DELETE /api/noticias/[id]
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    await prisma.noticia.delete({ where: { id } })
    return NextResponse.json({ mensaje: 'Noticia eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar noticia:', error)
    return NextResponse.json({ error: 'No se pudo eliminar la noticia' }, { status: 500 })
  }
}
