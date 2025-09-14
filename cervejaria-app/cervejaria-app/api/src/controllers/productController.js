const { v4: uuid } = require("uuid");
const Product = require("../models/ProductModel");

async function list(req, res) {
  const all = await Product.findAll();
  res.json(all);
}

async function getById(req, res) {
  const item = await Product.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Produto não encontrado" });
  res.json(item);
}

async function create(req, res) {
  const {
    name,
    description,
    price,
    ingredients = [],
    category = "Geral",
    imageUrl = "",
  } = req.body || {};
  if (!name || price == null)
    return res.status(400).json({ error: "name e price são obrigatórios" });

  const novo = {
    id: uuid(),
    name,
    description: description || "",
    price: Number(price),
    ingredients,
    category,
    imageUrl,
  };
  const saved = await Product.create(novo);
  res.status(201).json(saved);
}

async function update(req, res) {
  const data = req.body || {};
  if (data.price != null) data.price = Number(data.price);
  const updated = await Product.update(req.params.id, data);
  if (!updated)
    return res.status(404).json({ error: "Produto não encontrado" });
  res.json(updated);
}

async function remove(req, res) {
  const ok = await Product.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Produto não encontrado" });
  res.status(204).send();
}

module.exports = { list, getById, create, update, remove };
