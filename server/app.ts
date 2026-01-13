import express from 'express';
import cors from 'cors';
import {
  createAccountWithDeposit,
  findUserWithAccounts,
  findUserByEmail,
  listAccounts,
  listTransactions,
  listUsers,
  runMigrations,
} from './database.ts';
import { z, ZodError } from 'zod';
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
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(10),
});

type PaginationParams = { page: number; pageSize: number };

const userFilterSchema = z.object({ userId: z.coerce.number().int().positive().optional() });
const accountFilterSchema = z.object({
  accountId: z.coerce.number().int().positive().optional(),
  userId: z.coerce.number().int().positive().optional(),
});
type AccountFilters = { accountId?: number; userId?: number };

function buildPaginatedResponse<T>(rows: T[], page: number, pageSize: number, total: number) {
  return { data: rows, pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) } };
}

app.get('/api/users', (req, res, next) => {
  try {
    const params = paginationSchema.parse(req.query) as PaginationParams;
    const { data, total } = listUsers({ page: params.page, pageSize: params.pageSize });
    res.json(buildPaginatedResponse(data, params.page, params.pageSize, total));
  } catch (error) {
    next(error);
  }
});

app.get('/api/users/:id', (req, res, next): void => {
  try {
    const id = Number(req.params.id);
    const { user, accounts } = findUserWithAccounts(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ user, accounts });
  } catch (error) {
    next(error);
  }
});

app.get('/api/accounts', (req, res, next): void => {
  try {
    const pagination = paginationSchema.parse(req.query) as PaginationParams;
    const filters = userFilterSchema.parse(req.query) as { userId?: number };
    const { data, total } = listAccounts({ page: pagination.page, pageSize: pagination.pageSize }, filters.userId);
    res.json(buildPaginatedResponse(data, pagination.page, pagination.pageSize, total));
  } catch (error) {
    return next(error);
  }
});

app.get('/api/transactions', (req, res, next): void => {
  try {
    const pagination = paginationSchema.parse(req.query) as PaginationParams;
    const filters = accountFilterSchema.parse(req.query) as AccountFilters;
    const { data, total } = listTransactions({ page: pagination.page, pageSize: pagination.pageSize }, filters);
    res.json(buildPaginatedResponse(data, pagination.page, pagination.pageSize, total));
  } catch (error) {
    return next(error);
  }
});

const createAccountSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  accountType: z.string().trim().min(1),
  initialDeposit: z.coerce.number().min(0),
});

app.post('/api/accounts', (req, res, next): void => {
  try {
    const payload = createAccountSchema.parse(req.body);
    const existing = findUserByEmail(payload.email);
    if (existing) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const result = createAccountWithDeposit(payload);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction): void => {
  if (err instanceof ZodError) {
    res.status(400).json({ message: 'Invalid request', issues: err.issues });
    return;
  }
  console.error(err);
  res.status(500).json({ message: 'Unexpected error' });
});

export { app };
