import '@/styles/main.css'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import HorarioDesplegable from '@/components/horarios/HorarioDesplegable'
import { AuthProvider } from '@/context/AuthContext'

import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Biblioteca Popular Aguero',
  description: 'Biblioteca Popular Aguero - Espacio cultural y educativo',
  keywords: [
    'Biblioteca Villa Mercedes',
    'Antonio Esteban Agüero',
    'biblioteca popular',
    'eventos culturales Villa Mercedes',
    'lectura autogestiva',
    'biblioteca pública',
    'cultura San Luis'
  ],
  authors: [{ name: 'Biblioteca Popular Antonio Esteban Agüero' }],
  creator: 'Biblioteca Esteban Agüero',
  generator: 'Next.js',
  openGraph: {
    title: 'Biblioteca Popular Antonio Esteban Agüero',
    description:
      'Promoviendo la lectura y la cultura en Villa Mercedes, San Luis. Conocé nuestros talleres, eventos, convocatorias y más.',
    url: 'https://biblioaguero.com.ar',
    siteName: 'Biblioteca Esteban Agüero',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: 'https://biblioaguero.com.ar/logo.png', 
        width: 800,
        height: 600,
        alt: 'Logo Biblioteca Esteban Agüero',
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <div className="layout-body">
            <Header />
            <main className="layout-main">{children}</main>
            <HorarioDesplegable />
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
