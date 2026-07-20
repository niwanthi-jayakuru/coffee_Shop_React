import { Router } from "express";
import { z } from "zod";
import { menuItems } from "../data/menu.js";

export const ordersRouter = Router();

const orderItemSchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
});

const createOrderSchema = z.object({
  name: z.string().min(1).max(80),
  phone: z.string().min(5).max(30).optional(),
  address: z.string().min(1).max(200).optional(),
  notes: z.string().max(300).optional(),
  items: z.array(orderItemSchema).min(1).max(20),
});

const orders = [];

function computeTotal(items) {
  let total = 0;
  for (const it of items) {
    const menu = menuItems.find((m) => m.id === it.itemId);
    if (!menu) {
      const err = new Error(`Unknown menu item: ${it.itemId}`);
      err.status = 400;
      err.code = "INVALID_ITEM";
      throw err;
    }
    total += menu.price * it.quantity;
  }
  return total;
}

ordersRouter.get("/orders", (req, res) => {
  res.json({ orders });
});

ordersRouter.post("/orders", (req, res, next) => {
  try {
    const parsed = createOrderSchema.parse(req.body);
    const total = computeTotal(parsed.items);

    const order = {
      id: `ord_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      status: "received",
      ...parsed,
      total,
      currency: "INR",
    };

    orders.unshift(order);
    res.status(201).json({ order });
  } catch (err) {
    if (err?.name === "ZodError") {
      const e = new Error("Invalid order payload");
      e.status = 400;
      e.code = "VALIDATION_ERROR";
      e.details = err.issues;
      return next(e);
    }
    return next(err);
  }
});

