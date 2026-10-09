import express from 'express';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  const connected = db.readyState === 1;

  response.status(connected ? 200 : 503).json({
    api: 'ok',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});