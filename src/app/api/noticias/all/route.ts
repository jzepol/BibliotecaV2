import { NextResponse } from 'next/server'
import { obtenerNoticias } from '@/services/noticias'

export async function GET() {
  const noticias = await obtenerNoticias()
  return NextResponse.json(noticias)
}
