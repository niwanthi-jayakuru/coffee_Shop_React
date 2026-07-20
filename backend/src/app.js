import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { healthRouter } from "./routes/health.js";
import { menuRouter } from "./routes/menu.js";
import { servicesRouter } from "./routes/services.js";
import { ordersRouter } from "./routes/orders.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export function createApp({ corsOrigins }) {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  const allowLocalhostInDev =
    (process.env.NODE_ENV || "development") !== "production";
  const isLocalhostOrigin = (origin) =>
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

  app.use(
    cors({
      origin(origin, cb) {
        if (!origin) return cb(null, true);
        if (!corsOrigins?.length) return cb(null, true);
        if (corsOrigins.includes(origin)) return cb(null, true);
        if (allowLocalhostInDev && isLocalhostOrigin(origin)) return cb(null, true);
        return cb(new Error(`CORS blocked origin: ${origin}`));
      },
      credentials: false,
    }),
  );

  app.use(healthRouter);

  app.use("/api", menuRouter);
  app.use("/api", servicesRouter);
  app.use("/api", ordersRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

