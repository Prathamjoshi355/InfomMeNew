import { MongoClient, Db } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

const uri = process.env.MONGODB_URI

export async function getDb(): Promise<Db | null> {
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
