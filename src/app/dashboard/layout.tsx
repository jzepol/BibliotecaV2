import { ReactNode } from 'react'
import { getUserFromToken } from '../../../lib/getUserFromToken'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import '@/styles/Dashboard.css'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUserFromToken()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <div className="bg-violeta text-white py-4 px-6 flex justify-between items-center">
        <div className="font-bold">
          Bienvenido, {user.email} 👋
        </div>
        <nav className="dashboard-nav">
          <Link href="/dashboard" className="dashboard-nav-link">
            Inicio
          </Link>
          <Link href="/dashboard/asociados" className="dashboard-nav-link">
            Asociados
          </Link>
          <Link href="/dashboard/catalogo" className="dashboard-nav-link">
            Catalogo
          </Link>

        </nav>
      </div>
      {children}
    </div>
  )
}
