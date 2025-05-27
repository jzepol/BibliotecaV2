import { NextResponse, NextRequest } from 'next/server'
import { crearPrestamo, obtenerPrestamos, obtenerPrestamosActivos } from '@/services/prestamos'
import { EstadoPrestamo } from '@prisma/client'

interface ErrorConMensaje {
  message: string
  code?: string
}

// GET /api/prestamos
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const activos = url.searchParams.get('activos')

    let prestamos
    if (activos === 'true') {
      prestamos = await obtenerPrestamosActivos()
    } else {
      prestamos = await obtenerPrestamos()
    }

    return NextResponse.json(prestamos)
  } catch (error) {
    console.error('Error al obtener préstamos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los préstamos' },
      { status: 500 }
    )
  }
}

// POST /api/prestamos
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { asociadoId, libroId, estado } = body

    if (!asociadoId || !libroId) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    const prestamo = await crearPrestamo(
      Number(asociadoId),
      Number(libroId),
      estado as EstadoPrestamo
    )

    return NextResponse.json(prestamo)
  } catch (error: unknown) {
    console.error('Error al crear préstamo:', error)
    
    const errorConMensaje = error as ErrorConMensaje
    if (errorConMensaje.message === 'Este libro ya está prestado') {
      return NextResponse.json(
        { error: errorConMensaje.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al crear el préstamo' },
      { status: 500 }
    )
  }
}
