import { getDb } from './db'

export default async function handler(req: any, res: any) {
  try {
    console.log('api/submit invoked', req.method)
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)

    if (req.method === 'GET') {
      res.status(200).json({
        ok: true,
        route: '/api/submit',
        allowedMethods: ['POST'],
      })
      return
    }

    if (req.method === 'OPTIONS') {
      res.setHeader('Allow', 'GET, POST, OPTIONS')
      res.status(204).end()
      return
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST, OPTIONS')
      res.status(405).json({ error: 'Method Not Allowed' })
      return
    }

    const payload = parseBody(req.body)
    console.log('submit payload', payload)
    if (!payload.vehicle) {
      res.status(400).json({ error: 'vehicle required' })
      return
    }

    const db = await getDb()
    console.log('submit db connected:', Boolean(db))
    if (!db) {
      res.status(500).json({ error: 'Database connection failed' })
      return
    }

    const coll = db.collection('submissions')
    await coll.insertOne(payload)
    res.status(201).json({ ok: true })
  } catch (err: any) {
    console.error('submit error', err)
    res.status(500).json({ error: 'Submit failed', details: err?.message })
  }
}

function parseBody(body: any) {
  if (!body) return {}
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return typeof body === 'object' ? body : {}
}
