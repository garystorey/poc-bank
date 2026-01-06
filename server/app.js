const express = require('express');
const cors = require('cors');
const { db, runMigrations, seedDatabase } = require('./database');
const { z, ZodError } = require('./lib/zod');

runMigrations();

const app = express();
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.info(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

const paginationSchema = z.object({
  page: z.number().optional().default(1).transform((value) => Math.max(1, value)),
  pageSize: z.number().optional().default(10).transform((value) => Math.min(Math.max(1, value), 50)),
});

const userFilterSchema = z.object({ userId: z.number().optional() });
const accountFilterSchema = z.object({ accountId: z.number().optional(), userId: z.number().optional() });

function buildPaginatedResponse(rows, page, pageSize, total) {
  return { data: rows, pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) } };
}

app.get('/api/users', (req, res, next) => {
  try {
    const params = paginationSchema.parse(req.query);
    const { data, total } = db.paginate('users', { page: params.page, pageSize: params.pageSize });
    res.json(buildPaginatedResponse(data, params.page, params.pageSize, total));
  } catch (error) {
    next(error);
  }
});

app.get('/api/users/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = db.findById('users', id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const accounts = db.all('accounts', (acc) => acc.userId === id);
    res.json({ user, accounts });
  } catch (error) {
    next(error);
  }
});

app.get('/api/accounts', (req, res, next) => {
  try {
    const pagination = paginationSchema.parse(req.query);
    const filters = userFilterSchema.parse(req.query);
    const predicate = filters.userId ? (acc) => acc.userId === filters.userId : undefined;
    const { data, total } = db.paginate('accounts', { page: pagination.page, pageSize: pagination.pageSize, predicate });
    res.json(buildPaginatedResponse(data, pagination.page, pagination.pageSize, total));
  } catch (error) {
    next(error);
  }
});

app.get('/api/transactions', (req, res, next) => {
  try {
    const pagination = paginationSchema.parse(req.query);
    const filters = accountFilterSchema.parse(req.query);
    const predicate = (txn) => {
      if (filters.accountId && txn.accountId !== filters.accountId) return false;
      if (filters.userId) {
        const account = db.findById('accounts', txn.accountId);
        if (!account || account.userId !== filters.userId) return false;
      }
      return true;
    };
    const { data, total } = db.paginate('transactions', { page: pagination.page, pageSize: pagination.pageSize, predicate });
    res.json(buildPaginatedResponse(data, pagination.page, pagination.pageSize, total));
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/seed', (req, res, next) => {
  try {
    const summary = seedDatabase();
    res.json({ message: 'Database reseeded', summary });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'Invalid request', issues: err.issues });
  }
  console.error(err);
  res.status(500).json({ message: 'Unexpected error' });
});

module.exports = { app };
