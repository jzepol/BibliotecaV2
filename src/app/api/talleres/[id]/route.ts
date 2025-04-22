import { NextResponse } from 'next/server'
import {
  actualizarTaller,
  eliminarTaller
} from '@/services/talleres'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)
  const data = await req.json()

  try {
    const actualizado = await actualizarTaller(id, data)
    return NextResponse.json(actualizado)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'No se pudo actualizar el taller' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)

  try {
    await eliminarTaller(id)
    return NextResponse.json({ mensaje: 'Taller eliminado' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'No se pudo eliminar el taller' }, { status: 500 })
  }
}
