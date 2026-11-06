import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

// Health check endpoints for Cloud Run & Google Cloud infrastructure
app.get(['/health', '/_ah/health', '/api/health'], (_req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist
app.use(express.static(distDir, {
  maxAge: '1h',
  index: 'index.html'
}));

// SPA Fallback for client-side routing
app.get('*', (_req, res) => {
  if (fs.existsSync(indexHtmlPath)) {
    res.sendFile(indexHtmlPath);
  } else {
    res.status(200).send('<!doctype html><html><head><title>Loading...</title></head><body>Application building or starting up...</body></html>');
  }
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`[Cloud Run] Server started and listening on 0.0.0.0:${port}`);
});

// Graceful shutdown on SIGTERM (Cloud Run rollout signal)
process.on('SIGTERM', () => {
  console.log('[Cloud Run] SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('[Cloud Run] Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});
