import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getDb } from './db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const payload = req.body || {}
  if (!payload.vehicle) {
    res.status(400).json({ error: 'vehicle required' })
    return
  }

  const db = await getDb()
  if (!db) {
    res.status(500).json({ error: 'Database connection failed' })
    return
  }

  try {
    const coll = db.collection('submissions')
    await coll.insertOne(payload)
    res.status(201).json({ ok: true })
  } catch (err: any) {
    console.error('submit insert error', err)
    res.status(500).json({ error: 'Insert failed', details: err.message })
  }
}

