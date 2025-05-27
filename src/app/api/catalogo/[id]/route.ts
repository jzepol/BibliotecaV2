import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// DELETE /api/catalogo/[id]
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    await prisma.libro.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el libro:', error)
    return NextResponse.json({ error: 'Error al eliminar el libro' }, { status: 500 })
  }
}

// PUT /api/catalogo/[id]
export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const data = await req.json()
    const libro = await prisma.libro.update({
      where: { id },
      data
    })

    return NextResponse.json(libro)
  } catch (error) {
    console.error('Error al actualizar el libro:', error)
    return NextResponse.json({ error: 'Error al actualizar el libro' }, { status: 500 })
  }
}
