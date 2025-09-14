const path = require('path');
const { readJSON, writeJSON } = require('../utils/fileDb');

const usersFile = path.join(__dirname, '..', 'data', 'users.json');

async function findByEmail(email) {
  const users = await readJSON(usersFile);
  return users.find(u => u.email === email) || null;
}

module.exports = { findByEmail };
