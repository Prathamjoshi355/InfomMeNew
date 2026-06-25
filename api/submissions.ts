import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'InformxMeAdmin123'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const pwd = req.query.pwd
  if (pwd !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized' })
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

  res.status(200).json(all)
}
