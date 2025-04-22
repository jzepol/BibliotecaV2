import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../../../lib/prisma'

const SECRET = process.env.JWT_SECRET || 'biblioteca-super-secreto'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.usuario.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  if (!SECRET) {
    return NextResponse.json({ error: 'JWT_SECRET no definido' }, { status: 500 })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' })

  const response = NextResponse.json({ message: 'Login exitoso' })
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 día
    path: '/',
  })

  return response
}
