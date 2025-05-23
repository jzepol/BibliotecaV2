import { useEffect, useState } from 'react'

interface Evento {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  estado: string
  imagenUrl?: string
}

interface Taller {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  imagenUrl?: string
  facilitador: string
}

export default function useHeroData() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [talleres, setTalleres] = useState<Taller[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true)
      try {
        const [resEventos, resTalleres] = await Promise.all([
          fetch('/api/eventos/proximos'),
          fetch('/api/talleres/all')
        ])
        if (!resEventos.ok || !resTalleres.ok) throw new Error('Respuesta no válida del servidor')
        const dataEventos = await resEventos.json()
        const dataTalleres = await resTalleres.json()
        setEventos(dataEventos)
        setTalleres(dataTalleres)
        setError(null)
      } catch {
        setError('Error cargando datos')
      } finally {
        setLoading(false)
      }
    }
    cargarDatos()
  }, [])

  return { eventos, talleres, loading, error }
} 