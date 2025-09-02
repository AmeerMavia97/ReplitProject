import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  const server = await registerRoutes(app);

  const port = parseInt(process.env.PORT || "5000");
  const host = process.env.HOST || "0.0.0.0";

  // ✅ Serve frontend statically only in production
  if (process.env.NODE_ENV === "production") {
    const staticPath = path.resolve(__dirname, "../public");
    app.use(express.static(staticPath));

    // Fallback to index.html for SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  } else {
    // In dev, run Vite middleware
    await setupVite(app, server);
  }

  server.listen(port, host, () => {
    log(`serving on port ${port}`);
  });
}

startServer().catch(console.error);
