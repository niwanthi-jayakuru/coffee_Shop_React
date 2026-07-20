import { Router } from "express";
import { menuItems } from "../data/menu.js";

export const menuRouter = Router();

menuRouter.get("/menu", (req, res) => {
  res.json({ items: menuItems });
});

