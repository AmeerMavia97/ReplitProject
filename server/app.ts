// server/app.ts
import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In production, serve the Vite-built client
const clientDir = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDir));
app.get('*', (_req, res) => res.sendFile(path.join(clientDir, 'index.html')));

export default app;
