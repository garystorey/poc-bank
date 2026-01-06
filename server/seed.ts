import { seedDatabase } from './database.ts';

const summary = seedDatabase();
console.log('Database reseeded', summary);
