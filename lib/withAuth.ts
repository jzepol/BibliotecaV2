/* import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'biblioteca-super-secreto'

export function withAuth(handler: (req: NextRequest, decodedToken: any) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Token requerido' }, { status: 401 })
    }

    try {
      const decoded = jwt.verify(token, SECRET)
      return await handler(req, decoded)
    } catch (error) {
      console.error('Error al verificar token:', error)
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 403 })
    }
  }
}
 */