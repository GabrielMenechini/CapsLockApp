const path = require("path");
const { readJSON, writeJSON } = require("../utils/fileDb");

const file = path.join(__dirname, "../data/orders.json");

async function findAll() {
  return readJSON(file);
}

async function create(order) {
  const orders = await findAll();
  orders.push(order);
  await writeJSON(file, orders);
  return order;
}

module.exports = { findAll, create };
