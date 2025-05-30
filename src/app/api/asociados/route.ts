import { NextResponse } from 'next/server'
import { crearAsociado } from '@/services/asociados'
import { Categoria } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      email,
      apellido,
      nombre,
      dni,
      fechaNacimiento,
      direccion,
      categoria,
      escuela,
      curso,
      comentario,
      telefono
    } = body

    // Validaciones básicas
    if (!email || !apellido || !nombre || !dni || !fechaNacimiento || !direccion || !categoria) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    if (isNaN(parseInt(dni)) || dni.toString().length < 7) {
      return NextResponse.json({ error: 'DNI inválido' }, { status: 400 })
    }

    const nuevoAsociado = await crearAsociado({
      email,
      apellido,
      nombre,
      dni: parseInt(dni),
      fechaNacimiento,
      direccion,
      categoria: categoria as Categoria,
      escuela,
      curso,
      comentario,
      telefono: telefono ? BigInt(telefono) : null
    })

    return NextResponse.json({
      ...nuevoAsociado,
      telefono: nuevoAsociado.telefono?.toString() ?? null
    }, { status: 201 })

  } catch (error) {
    console.error('Error al crear asociado:', error)
    return NextResponse.json({ error: 'Error al procesar el formulario' }, { status: 500 })
  }
}
