import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, runMigrations } from './database.ts';

type UserSeed = { name: string; email: string };
type AccountSeed = { userId: number; type: string; balance: number };

type SeedSummary = { users: number; accounts: number; transactions: number };

function resetTables() {
  db.exec(`
    DELETE FROM transactions;
    DELETE FROM accounts;
    DELETE FROM users;
    DELETE FROM sqlite_sequence WHERE name IN ('users', 'accounts', 'transactions');
  `);
}

export function seedDatabase(): SeedSummary {
  runMigrations();
  resetTables();

  db.exec('BEGIN');

  try {
    const userStmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const users: UserSeed[] = [
      { name: 'Asha Patel', email: 'asha@example.com' },
      { name: 'Miguel Santos', email: 'miguel@example.com' },
      { name: 'Taylor Kim', email: 'taylor@example.com' },
    ];
    users.forEach((u) => userStmt.run(u.name, u.email));

    const accountStmt = db.prepare('INSERT INTO accounts (userId, type, balance) VALUES (?, ?, ?)');
    const accounts: AccountSeed[] = [
      { userId: 1, type: 'checking', balance: 1250.35 },
      { userId: 1, type: 'savings', balance: 8400.12 },
      { userId: 2, type: 'checking', balance: 220.45 },
      { userId: 2, type: 'savings', balance: 5200.55 },
      { userId: 3, type: 'checking', balance: 900.0 },
      { userId: 3, type: 'savings', balance: 3100.2 },
    ];
    accounts.forEach((a) => accountStmt.run(a.userId, a.type, a.balance));

    const seededAccounts = db
      .prepare('SELECT id, userId, type, balance FROM accounts ORDER BY id')
      .all() as { id: number; userId: number; type: string; balance: number }[];

    const descriptions = ['Payroll deposit', 'Coffee shop', 'Grocery store', 'Utilities', 'Transfer', 'Gym membership'];
    const locations = ['New York', 'Austin', 'Seattle', 'Remote', 'Portland', 'Chicago'];
    const types = ['deposit', 'withdrawal', 'transfer'];
    const transactionsPerAccount = 20;

    const txnStmt = db.prepare(
      'INSERT INTO transactions (accountId, type, amount, description, location, postedAt) VALUES (?, ?, ?, ?, ?, ?)',
    );
    seededAccounts.forEach((account, accountIndex) => {
      for (let i = 0; i < transactionsPerAccount; i++) {
        const sequence = accountIndex * transactionsPerAccount + i;
        const type = types[sequence % types.length];
        const amountBase = 45 + (sequence % 12) * 7;
        const amount = type === 'deposit' ? amountBase : -1 * (amountBase + 15);
        txnStmt.run(
          account.id,
          type,
          Math.round(amount * 100) / 100,
          descriptions[sequence % descriptions.length],
          locations[sequence % locations.length],
          new Date(Date.now() - sequence * 86400000).toISOString(),
        );
      }
    });

    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    const accountCount = db.prepare('SELECT COUNT(*) as count FROM accounts').get() as { count: number };
    const transactionCount = db.prepare('SELECT COUNT(*) as count FROM transactions').get() as { count: number };

    db.exec('COMMIT');

    return { users: userCount.count, accounts: accountCount.count, transactions: transactionCount.count };
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

const currentFile = fileURLToPath(import.meta.url);

if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  const summary = seedDatabase();
  console.log('Database reseeded', summary);
}
