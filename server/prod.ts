// server/prod.ts
import 'dotenv/config';
import http from 'http';
import app from './app';
import { registerRoutes } from './routes';

async function start() {
  // Attach your API routes here (same ones you use in dev)
  if (typeof registerRoutes === 'function') {
    await registerRoutes(app); // ok if it returns void or a Promise
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  const host = process.env.HOST || '0.0.0.0';
  const server = http.createServer(app);

  server.listen(port, host, () => {
    console.log(`[prod] server listening on ${host}:${port}`);
  });
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
