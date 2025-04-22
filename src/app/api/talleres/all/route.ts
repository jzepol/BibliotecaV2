import { NextResponse } from 'next/server'
import { obtenerTalleres } from '@/services/talleres'

export async function GET() {
  const talleres = await obtenerTalleres()
  return NextResponse.json(talleres)
}
