import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getDb } from './db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const uri = process.env.MONGODB_URI || null
  const db = await getDb()
  const dbName = uri ? new URL(uri).pathname.replace('/', '') || 'InformxMe' : null

  res.status(200).json({
    ok: true,
    mongodbUriPresent: Boolean(uri),
    mongodbDbName: dbName,
    connected: Boolean(db),
  })
}
