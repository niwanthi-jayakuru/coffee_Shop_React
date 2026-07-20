import { Router } from "express";
import { services } from "../data/services.js";

export const servicesRouter = Router();

servicesRouter.get("/services", (req, res) => {
  res.json({ services });
});

