const { v4: uuid } = require("uuid");
const Order = require("../models/OrderModel");

async function create(req, res) {
  try {
    const { items, total, customerName } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }
    const order = {
      id: uuid(),
      items,
      total: Number(total),
      status: "pending",
      customerName: customerName || "Cliente",
      createdAt: new Date().toISOString(),
    };
    const saved = await Order.create(order);
    res.status(201).json(saved);
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
}

async function list(req, res) {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
}

module.exports = { create, list };
