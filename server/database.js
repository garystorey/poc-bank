const path = require('path');
const Database = require('./lib/better-sqlite3');

const dbFile = path.join(__dirname, 'data', 'bank.db.json');
const db = new Database(dbFile);

function runMigrations() {
  // The file-backed store ensures tables exist; this provides an explicit hook.
  if (!db.data.users) db.data.users = [];
  if (!db.data.accounts) db.data.accounts = [];
  if (!db.data.transactions) db.data.transactions = [];
  if (!db.data.sequences) db.data.sequences = {};
}

function seedDatabase() {
  db.reset();
  runMigrations();

  const users = [
    { name: 'Asha Patel', email: 'asha@example.com' },
    { name: 'Miguel Santos', email: 'miguel@example.com' },
    { name: 'Taylor Kim', email: 'taylor@example.com' },
  ];

  users.forEach((user) => db.insert('users', user));

  const accounts = [
    { userId: 1, type: 'checking', balance: 1250.35 },
    { userId: 1, type: 'savings', balance: 8400.12 },
    { userId: 2, type: 'checking', balance: 220.45 },
    { userId: 2, type: 'credit', balance: -1200.0 },
    { userId: 3, type: 'checking', balance: 900.0 },
  ];

  accounts.forEach((account) => db.insert('accounts', account));

  const transactions = [];
  const descriptions = ['Payroll deposit', 'Coffee shop', 'Grocery store', 'Utilities', 'Transfer', 'Gym membership'];
  const locations = ['New York', 'Austin', 'Seattle', 'Remote', 'Portland', 'Chicago'];
  const types = ['deposit', 'withdrawal', 'transfer'];

  for (let i = 0; i < 36; i++) {
    const account = accounts[i % accounts.length];
    const type = types[i % types.length];
    const amount = type === 'deposit' ? 100 + i * 3 : -1 * (20 + i * 2);
    transactions.push({
      accountId: account.id ?? (i % accounts.length) + 1,
      type,
      amount: Math.round(amount * 100) / 100,
      description: descriptions[i % descriptions.length],
      location: locations[i % locations.length],
      postedAt: new Date(Date.now() - i * 86400000).toISOString(),
    });
  }

  transactions.forEach((txn) => db.insert('transactions', txn));
  return { users: db.data.users.length, accounts: db.data.accounts.length, transactions: db.data.transactions.length };
}

module.exports = { db, runMigrations, seedDatabase };
