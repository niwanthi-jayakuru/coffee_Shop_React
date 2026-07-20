import "dotenv/config";
import { createApp } from "./app.js";

const port = Number(process.env.PORT || 8080);
const corsOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const app = createApp({ corsOrigins });

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}`);
});

server.on("error", (err) => {
  if (err?.code === "EADDRINUSE") {
    // eslint-disable-next-line no-console
    console.error(
      `Port ${port} is already in use. Stop the other process or set PORT in backend/.env (example: PORT=8081).`,
    );
    process.exitCode = 1;
    return;
  }
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

