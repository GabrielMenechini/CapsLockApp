const path = require('path');
const { readJSON, writeJSON } = require('./fileDb');
const bcrypt = require('bcryptjs');

async function ensureSeed(dataDir) {
  const usersFile = path.join(dataDir, 'users.json');
  const productsFile = path.join(dataDir, 'products.json');

  const users = await readJSON(usersFile);
  if (!users.find(u => u.role === 'admin')) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    users.push({
      id: 'admin-1',
      name: 'Administrador',
      email: process.env.ADMIN_EMAIL,
      passwordHash: hash,
      role: 'admin'
    });
    await writeJSON(usersFile, users);
    console.log('✔ Admin seed criado');
  }

  const products = await readJSON(productsFile);
  if (products.length === 0) {
    await writeJSON(productsFile, [
      {
        id: 'p-1',
        name: 'IPA da Casa',
        description: 'IPA aromática, 6.5% ABV',
        price: 24.9,
        ingredients: ['água', 'malte', 'lúpulo', 'levedura'],
        category: 'Cervejas'
      }
    ]);
    console.log('✔ Produto seed criado');
  }
}

module.exports = { ensureSeed };
