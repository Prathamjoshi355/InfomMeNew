import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy-loaded MongoDB helper
  let cachedClient: any = null;
  let cachedDb: any = null;

  async function getMongoDb() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) return null;
    
    if (cachedClient && cachedDb) {
      return cachedDb;
    }
    
    try {
      // Import dynamically so it doesn't fail at startup if mongodb is not installed
      const { MongoClient } = await import('mongodb');
      const client = new MongoClient(mongoUri);
      await client.connect();
      cachedClient = client;
      const dbName = new URL(mongoUri).pathname.replace('/', '') || 'InformxMe';
      cachedDb = client.db(dbName);
      return cachedDb;
    } catch (err) {
      console.error('Failed to connect to MongoDB, falling back to local file storage:', err);
      return null;
    }
  }

  // API Routes
  app.post('/api/submit', async (req, res) => {
    try {
      const payload = req.body || {};
      if (!payload.vehicle) {
        return res.status(400).json({ error: 'vehicle required' });
      }

      const db = await getMongoDb();
      if (db) {
        const coll = db.collection('submissions');
        await coll.insertOne(payload);
        return res.status(201).json({ ok: true });
      }

      // Fallback: write to local file
      const dbFile = path.join(process.cwd(), 'submissions.json');
      let all: any[] = [];
      try {
        if (fs.existsSync(dbFile)) {
          all = JSON.parse(fs.readFileSync(dbFile, 'utf8') || '[]');
        }
      } catch (e) {
        all = [];
      }
      all.push(payload);
      fs.writeFileSync(dbFile, JSON.stringify(all, null, 2));
      return res.status(201).json({ ok: true, fallback: true });
    } catch (err) {
      console.error('submit error', err);
      return res.status(500).json({ error: 'server error' });
    }
  });

  app.get('/api/submissions', async (req, res) => {
    try {
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'InformxMeAdmin123';
      const pwd = req.query.pwd;
      if (pwd !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const db = await getMongoDb();
      if (db) {
        const coll = db.collection('submissions');
        const rows = await coll.find().toArray();
        return res.json(rows);
      }

      // Fallback to local file
      const dbFile = path.join(process.cwd(), 'submissions.json');
      let all: any[] = [];
      try {
        if (fs.existsSync(dbFile)) {
          all = JSON.parse(fs.readFileSync(dbFile, 'utf8') || '[]');
        }
      } catch (e) {
        all = [];
      }
      return res.json(all);
    } catch (err) {
      console.error('submissions error', err);
      return res.status(500).json({ error: 'server error' });
    }
  });

  // Serve frontend assets
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
