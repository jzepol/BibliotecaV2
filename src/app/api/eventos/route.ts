import { NextResponse } from 'next/server'
import { crearEvento } from '@/services/eventos'

export async function POST(req: Request) {
  const { titulo, descripcion, fecha, estado, imagenUrl } = await req.json()

  if (!titulo || !descripcion || !fecha || !estado) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  const evento = await crearEvento(titulo, descripcion, fecha, estado, imagenUrl)
  return NextResponse.json(evento)
}
