import { NextResponse } from 'next/server'
import { obtenerTalleresProximos } from '@/services/talleres'

export async function GET() {
  try {
    const talleres = await obtenerTalleresProximos()
    return NextResponse.json(talleres)
  } catch (error) {
    console.error('Error al obtener talleres próximos:', error)
    return NextResponse.json({ error: 'Error al obtener talleres' }, { status: 500 })
  }
}
