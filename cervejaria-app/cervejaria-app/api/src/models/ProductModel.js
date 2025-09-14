const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileDb');

const productsFile = path.join(__dirname, '..', 'data', 'products.json');

async function findAll() {
  return readJSON(productsFile);
}

async function findById(id) {
  const all = await readJSON(productsFile);
  return all.find(p => p.id === id) || null;
}

async function create(product) {
  const all = await readJSON(productsFile);
  all.push(product);
  await writeJSON(productsFile, all);
  return product;
}

async function update(id, data) {
  const all = await readJSON(productsFile);
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  await writeJSON(productsFile, all);
  return all[idx];
}

async function remove(id) {
  const all = await readJSON(productsFile);
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) return false;
  all.splice(idx, 1);
  await writeJSON(productsFile, all);
  return true;
}

module.exports = { findAll, findById, create, update, remove };
