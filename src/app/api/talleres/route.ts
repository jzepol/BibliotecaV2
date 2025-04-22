import { NextResponse } from 'next/server'
import { crearTaller } from '@/services/talleres'

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.titulo || !body.descripcion || !body.imagenUrl || !body.fecha || !body.hora || !body.facilitador) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  const nuevoTaller = await crearTaller(body)
  return NextResponse.json(nuevoTaller)
}
