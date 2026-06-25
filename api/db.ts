import type { Db, MongoClient } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI

  console.log('getDb(): starting database connection')
  console.log('MONGODB_URI present:', Boolean(uri))
  console.log('NODE_ENV:', process.env.NODE_ENV)

  if (!uri) {
    console.error('MONGODB_URI is not defined')
    return null
  }

  if (cachedDb) {
    console.log('getDb(): using cached database connection')
    return cachedDb
  }

  try {
    if (cachedClient) {
      cachedDb = cachedClient.db(getDbName(uri))
      return cachedDb
    }

    const { MongoClient } = await import('mongodb')
    const client = new MongoClient(uri)
    await client.connect()
    cachedClient = client
    const dbName = getDbName(uri)
    cachedDb = client.db(dbName)
    console.log(`Connected to MongoDB database: ${dbName}`)
    return cachedDb
  } catch (err: any) {
    console.error('MongoDB connection error:', err)
    if (err.stack) {
      console.error(err.stack)
    }
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
