import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'biblioteca/pagos' }, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }).end(buffer)
    })

    return NextResponse.json(res)
  } catch (error) {
    console.error('Error al subir comprobante:', error)
    return NextResponse.json({ error: 'Error al subir el archivo' }, { status: 500 })
  }
}
