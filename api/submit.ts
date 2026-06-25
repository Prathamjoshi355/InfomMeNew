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

  const dbFile = path.join(process.cwd(), 'submissions.json')
  let all: any[] = []
  try {
    if (fs.existsSync(dbFile)) {
      all = JSON.parse(fs.readFileSync(dbFile, 'utf8') || '[]')
    }
  } catch (e) {
    all = []
  }

  all.push(payload)
  fs.writeFileSync(dbFile, JSON.stringify(all, null, 2))
  res.status(201).json({ ok: true, fallback: true })
}
