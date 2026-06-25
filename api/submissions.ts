import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getDb } from './db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'InformxMeAdmin123'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('api/submissions invoked', req.method)
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const pwd = req.query.pwd
  console.log('submissions query pwd present:', typeof pwd === 'string' ? pwd.length > 0 : false)
  if (pwd !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const db = await getDb()
  console.log('submissions db connected:', Boolean(db))
  if (!db) {
    res.status(500).json({ error: 'Database connection failed' })
    return
  }

  try {
    const coll = db.collection('submissions')
    const rows = await coll.find().toArray()
    res.status(200).json(rows)
  } catch (err: any) {
    console.error('submissions read error', err)
    res.status(500).json({ error: 'Read failed', details: err.message })
  }
}
