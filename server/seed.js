const { seedDatabase } = require('./database');

const summary = seedDatabase();
console.log(`Seeded database with ${summary.users} users, ${summary.accounts} accounts, ${summary.transactions} transactions.`);
