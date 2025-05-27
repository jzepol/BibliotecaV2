import { NextRequest, NextResponse } from 'next/server'
import { obtenerPrestamoPorId, eliminarPrestamo } from '@/services/prestamos'

// GET /api/prestamos/[id]
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const prestamo = await obtenerPrestamoPorId(id)
    
    if (!prestamo) {
      return NextResponse.json(
        { error: 'Préstamo no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(prestamo)
  } catch (error) {
    console.error('Error al obtener préstamo:', error)
    return NextResponse.json(
      { error: 'Error al obtener el préstamo' },
      { status: 500 }
    )
  }
}

// DELETE /api/prestamos/[id]
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    await eliminarPrestamo(id)
    return NextResponse.json({ message: 'Préstamo eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar préstamo:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el préstamo' },
      { status: 500 }
    )
  }
}
