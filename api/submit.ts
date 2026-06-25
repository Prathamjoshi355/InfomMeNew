let cachedClient: any = null
let cachedDb: any = null

export default async function handler(req: any, res: any) {
  try {
    console.log('api/submit invoked', req.method)
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.log('MONGODB_URI present:', Boolean(process.env.MONGODB_URI))

    if (req.method === 'GET') {
      return sendJson(res, 200, {
        ok: true,
        route: '/api/submit',
        allowedMethods: ['POST'],
      })
    }

    if (req.method === 'OPTIONS') {
      res.setHeader('Allow', 'GET, POST, OPTIONS')
      res.statusCode = 204
      return res.end()
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST, OPTIONS')
      return sendJson(res, 405, { error: 'Method Not Allowed' })
    }

    const payload = parseBody(req.body)
    console.log('submit payload keys:', Object.keys(payload))

    if (!payload.vehicle) {
      return sendJson(res, 400, { error: 'vehicle required' })
    }

    const db = await getSubmitDb()
    console.log('submit db connected:', Boolean(db))

    if (!db) {
      return sendJson(res, 500, { error: 'Database connection failed' })
    }

    const coll = db.collection('submissions')
    await coll.insertOne(payload)
    return sendJson(res, 201, { ok: true })
  } catch (err: any) {
    console.error('submit error', err)
    return sendJson(res, 500, {
      error: 'Submit failed',
      details: err?.message || String(err),
    })
  }
}

async function getSubmitDb() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.error('MONGODB_URI is not defined')
    return null
  }

  if (cachedDb) {
    return cachedDb
  }

  try {
    if (!cachedClient) {
      const mongodb = await import('mongodb')
      cachedClient = new mongodb.MongoClient(uri)
      await cachedClient.connect()
    }

    const dbName = getDbName(uri)
    cachedDb = cachedClient.db(dbName)
    console.log(`Connected to MongoDB database: ${dbName}`)
    return cachedDb
  } catch (err: any) {
    console.error('MongoDB connection error:', err)
    if (err?.stack) console.error(err.stack)
    return null
  }
}

function getDbName(uri: string): string {
  try {
    return new URL(uri).pathname.replace('/', '') || 'InformxMe'
  } catch {
    return 'InformxMe'
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

function sendJson(res: any, statusCode: number, body: any) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify(body))
}
