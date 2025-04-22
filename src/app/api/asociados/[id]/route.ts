import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: NextRequest) {
  const url = new URL(request.url)
  const id = Number(url.pathname.split('/').pop())

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID no proporcionado o inválido' }, { status: 400 })
  }

  const data = await request.json()

  try {
    const asociadoActualizado = await prisma.asociado.update({
      where: { id },
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
      },
    })

    return NextResponse.json(asociadoActualizado)
  } catch (err) {
    console.error('Error actualizando asociado:', err)
    return NextResponse.json(
      { error: 'No se pudo actualizar el asociado' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url)
  const id = Number(url.pathname.split('/').pop())

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID no proporcionado o inválido' }, { status: 400 })
  }

  try {
    await prisma.asociado.delete({
      where: { id },
    })

    return NextResponse.json({ mensaje: 'Asociado eliminado correctamente' })
  } catch (err) {
    console.error('Error eliminando asociado:', err)
    return NextResponse.json(
      { error: 'No se pudo eliminar el asociado' },
      { status: 500 }
    )
  }
}
