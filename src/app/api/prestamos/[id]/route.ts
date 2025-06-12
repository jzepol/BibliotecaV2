import { NextRequest, NextResponse } from 'next/server'
import { obtenerPrestamoPorId, eliminarPrestamo } from '@/services/prestamos'
import { PrismaClient, EstadoPrestamo } from '@prisma/client'

const prisma = new PrismaClient()

// Función para convertir BigInt a string
function convertirBigInt<T>(data: T): T {
  if (data === null || data === undefined) {
    return data
  }

  if (typeof data === 'bigint') {
    return data.toString() as unknown as T
  }

  if (Array.isArray(data)) {
    return data.map(convertirBigInt) as unknown as T
  }

  if (typeof data === 'object') {
    const result = {} as Record<string, unknown>
    for (const key in data) {
      result[key] = convertirBigInt((data as Record<string, unknown>)[key])
    }
    return result as unknown as T
  }

  return data
}

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

// PATCH /api/prestamos/[id]
export async function PATCH(req: NextRequest) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split('/').pop() || '')

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { estado } = body

    if (!estado || !Object.values(EstadoPrestamo).includes(estado)) {
      return NextResponse.json(
        { error: 'Estado inválido' },
        { status: 400 }
      )
    }

    const prestamo = await prisma.prestamo.update({
      where: { id },
      data: { estado },
      include: {
        asociado: true,
        libro: true,
      },
    })

    // Si el préstamo se devuelve, registrarlo en el historial
    if (prestamo.estado === EstadoPrestamo.DEVUELTO) {
      await prisma.historialPrestamo.create({
        data: {
          asociadoId: prestamo.asociadoId,
          libroId: prestamo.libroId,
          fechaInicio: prestamo.fechaInicio,
          fechaFin: prestamo.fechaFin || new Date(), // Usar fechaFin si existe, si no, la fecha actual
          estadoFinal: EstadoPrestamo.DEVUELTO,
        },
      })
    }

    return NextResponse.json(convertirBigInt(prestamo))
  } catch (error) {
    console.error('Error al actualizar préstamo:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el préstamo' },
      { status: 500 }
    )
  }
}
