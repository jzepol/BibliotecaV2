import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '../../../../lib/cloudinary'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No se encontró el archivo' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const upload = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'biblioteca' }, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })

    stream.end(buffer)
  })

  return NextResponse.json(upload)
}
