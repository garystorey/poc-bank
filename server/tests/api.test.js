const { before, after, describe, it } = require('node:test');
const assert = require('node:assert');
const { app } = require('../app');
const { seedDatabase } = require('../database');

let server;
let baseUrl;

describe('API', () => {
  before(() => {
    seedDatabase();
    server = app.listen(0);
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  after(() => {
    server?.close();
  });

  it('lists users with pagination', async () => {
    const response = await fetch(`${baseUrl}/api/users?page=1&pageSize=2`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.data.length, 2);
    assert.ok(body.pagination.total >= 3);
  });

  it('returns a single user with accounts', async () => {
    const response = await fetch(`${baseUrl}/api/users/1`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.user.id, 1);
    assert.ok(Array.isArray(body.accounts));
  });

  it('filters transactions by account', async () => {
    const response = await fetch(`${baseUrl}/api/transactions?accountId=1&pageSize=5`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.ok(body.data.every((txn) => txn.accountId === 1));
  });
});
