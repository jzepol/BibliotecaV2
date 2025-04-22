import { ReactNode } from 'react'
import { getUserFromToken } from '../../../lib/getUserFromToken'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUserFromToken()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <div className="bg-violeta text-white py-4 px-6 text-center font-bold">
        Bienvenido, {user.email} 👋
      </div>
      {children}
    </div>
  )
}
