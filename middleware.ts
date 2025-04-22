// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'biblioteca-super-secreto'
const protectedRoutes = ['/dashboard', '/api/asociados', '/api/eventos', '/api/noticias']

const getToken = (req: NextRequest) => {
  const cookie = req.cookies.get('token')?.value
  const header = req.headers.get('authorization')?.replace('Bearer ', '')
  return cookie || header || ''
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  if (!isProtected) return NextResponse.next()

  const token = getToken(request)
  if (!token) {
    const isApiRequest = request.headers.get('accept')?.includes('application/json')
    return isApiRequest
      ? new NextResponse(JSON.stringify({ error: 'No autorizado' }), { status: 401 })
      : NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    jwt.verify(token, SECRET)
    return NextResponse.next()
  } catch (err) {
    console.error('Token inválido:', err)
    const isApiRequest = request.headers.get('accept')?.includes('application/json')
    return isApiRequest
      ? new NextResponse(JSON.stringify({ error: 'Token inválido' }), { status: 401 })
      : NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/asociados/:path*',
    '/api/eventos/:path*',
    '/api/noticias/:path*'
  ],
}
