import { NextRequest, NextResponse } from 'next/server'
import {
  actualizarTaller,
  eliminarTaller
} from '@/services/talleres'

// PUT /api/talleres/[id]
export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '', 10)
  const data = await req.json()

  try {
    const actualizado = await actualizarTaller(id, data)
    return NextResponse.json(actualizado)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'No se pudo actualizar el taller' }, { status: 500 })
  }
}

// DELETE /api/talleres/[id]
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '', 10)

  try {
    await eliminarTaller(id)
    return NextResponse.json({ mensaje: 'Taller eliminado' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'No se pudo eliminar el taller' }, { status: 500 })
  }
}
