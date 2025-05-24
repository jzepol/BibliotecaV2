import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const prestamos = await prisma.prestamo.findMany({
      orderBy: { fechaInicio: 'desc' },
      include: {
        asociado: {
          select: {
            id: true,
            nombre: true,
            apellido: true
          }
        },
        libro: {
          select: {
            id: true,
            titulo: true,
            autor: true
          }
        }
      }
    })

    return NextResponse.json(prestamos)
  } catch (error) {
    console.error('[GET_PRESTAMOS]', error)
    return NextResponse.json({ error: 'Error al obtener los préstamos' }, { status: 500 })
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { asociadoId, libroId } = body

    if (!asociadoId || !libroId) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 })
    }

    // Verificar si el asociado ya tiene 2 préstamos activos
    const prestamosActivos = await prisma.prestamo.count({
      where: {
        asociadoId,
        estado: 'ACTIVO',
      },
    })

    if (prestamosActivos >= 2) {
      return NextResponse.json({ error: 'El asociado ya tiene 2 préstamos activos' }, { status: 400 })
    }

    // Verificar si el libro ya está prestado
    const libroEnUso = await prisma.prestamo.findFirst({
      where: {
        libroId,
        estado: 'ACTIVO',
      },
    })

    if (libroEnUso) {
      return NextResponse.json({ error: 'Este libro ya está prestado' }, { status: 400 })
    }

    // Crear el préstamo
    const nuevoPrestamo = await prisma.prestamo.create({
      data: {
        asociadoId,
        libroId,
        estado: 'ACTIVO',
      },
    })

    return NextResponse.json(nuevoPrestamo, { status: 201 })
  } catch (error) {
    console.error('[POST_PRESTAMO]', error)
    return NextResponse.json({ error: 'Error al registrar el préstamo' }, { status: 500 })
  }
}
