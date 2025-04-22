// /app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const userExists = await prisma.usuario.findUnique({ where: { email } })
  if (userExists) return NextResponse.json({ error: 'Usuario ya registrado' }, { status: 400 })

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.usuario.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ user: newUser })
}
