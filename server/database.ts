import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

type User = { id: number; name: string; email: string };
type Account = { id: number; userId: number; type: string; balance: number };
type Transaction = {
  id: number;
  accountId: number;
  type: string;
  amount: number;
  description: string;
  location: string;
  postedAt: string;
};

type Paginated<T> = { data: T[]; total: number };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'data', 'bank.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new DatabaseSync(dbPath);
db.exec('PRAGMA foreign_keys = ON;');

type Pagination = { page: number; pageSize: number };

function offsetFor({ page, pageSize }: Pagination): number {
  return (page - 1) * pageSize;
}

export function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      balance REAL NOT NULL DEFAULT 0,
      CHECK (balance IS NOT NULL)
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      accountId INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      location TEXT,
      postedAt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_accounts_userId ON accounts(userId);
    CREATE INDEX IF NOT EXISTS idx_transactions_accountId ON transactions(accountId);
  `);
}

export function listUsers(pagination: Pagination): Paginated<User> {
  const total = (db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }).count;
  const data = db
    .prepare('SELECT id, name, email FROM users ORDER BY id LIMIT ? OFFSET ?')
    .all(pagination.pageSize, offsetFor(pagination)) as User[];
  return { data, total };
}

export function findUserWithAccounts(id: number): { user?: User; accounts: Account[] } {
  const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(id) as User | undefined;
  const accounts = db
    .prepare('SELECT id, userId, type, balance FROM accounts WHERE userId = ? ORDER BY id')
    .all(id) as Account[];
  return { user, accounts };
}

export function listAccounts(pagination: Pagination, userId?: number): Paginated<Account> {
  const whereClause = userId ? 'WHERE userId = ?' : '';
  const params: number[] = [];
  if (userId) params.push(userId);
  const total = (db.prepare(`SELECT COUNT(*) as count FROM accounts ${whereClause}`).get(...params) as { count: number }).count;
  const data = db
    .prepare(`SELECT id, userId, type, balance FROM accounts ${whereClause} ORDER BY id LIMIT ? OFFSET ?`)
    .all(...params, pagination.pageSize, offsetFor(pagination)) as Account[];
  return { data, total };
}

export function listTransactions(
  pagination: Pagination,
  filters: { accountId?: number; userId?: number },
): Paginated<Transaction> {
  const predicates: string[] = [];
  const params: number[] = [];

  if (filters.accountId) {
    predicates.push('t.accountId = ?');
    params.push(filters.accountId);
  }
  if (filters.userId) {
    predicates.push('a.userId = ?');
    params.push(filters.userId);
  }

  const where = predicates.length ? `WHERE ${predicates.join(' AND ')}` : '';
  const total = (
    db
      .prepare(`SELECT COUNT(*) as count FROM transactions t JOIN accounts a ON a.id = t.accountId ${where}`)
      .get(...params) as { count: number }
  ).count;

  const data = db
    .prepare(
      `SELECT t.id, t.accountId, t.type, t.amount, t.description, t.location, t.postedAt
       FROM transactions t
       JOIN accounts a ON a.id = t.accountId
       ${where}
       ORDER BY t.postedAt DESC, t.id DESC
       LIMIT ? OFFSET ?`,
    )
    .all(...params, pagination.pageSize, offsetFor(pagination)) as Transaction[];

  return { data, total };
}
