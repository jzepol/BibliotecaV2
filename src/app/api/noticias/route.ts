import { NextResponse } from 'next/server'
import { crearNoticia } from '@/services/noticias'

export async function POST(req: Request) {
  const { titulo, contenido, imagenUrl } = await req.json()

  if (!titulo || !contenido) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  const noticia = await crearNoticia(titulo, contenido, imagenUrl)
  return NextResponse.json(noticia)
}
