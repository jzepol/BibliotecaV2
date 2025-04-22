import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'biblioteca-super-secreto'

export async function getUserFromToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, SECRET) as { email: string; id: number }
    return decoded
  } catch {
    return null
  }
}
