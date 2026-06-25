import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const payload = req.body || {}
  if (!payload.vehicle) {
    res.status(400).json({ error: 'vehicle required' })
    return
  }

  const persistentRoot = process.env.VERCEL ? '/tmp' : process.cwd()
  const dbFile = path.join(persistentRoot, 'submissions.json')
  let all: any[] = []

  try {
    if (fs.existsSync(dbFile)) {
      all = JSON.parse(fs.readFileSync(dbFile, 'utf8') || '[]')
    }
  } catch (err: any) {
    console.error('submit read error', err)
    all = []
  }

  try {
    all.push(payload)
    fs.writeFileSync(dbFile, JSON.stringify(all, null, 2))
    res.status(201).json({ ok: true, fallback: true })
  } catch (err: any) {
    console.error('submit write error', err)
    res.status(500).json({ error: 'Server error', details: err.message })
  }
}

