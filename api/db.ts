import { MongoClient, Db } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

const uri = process.env.MONGODB_URI

export async function getDb(): Promise<Db | null> {
  if (!uri) {
    console.error('MONGODB_URI is not defined')
    return null
  }

  if (cachedDb) {
    return cachedDb
  }

  try {
    const client = new MongoClient(uri)
    await client.connect()
    cachedClient = client
    const dbName = new URL(uri).pathname.replace('/', '') || 'InformxMe'
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
