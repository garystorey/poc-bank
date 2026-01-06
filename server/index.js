const { app } = require('./app');
const { seedDatabase } = require('./database');

const port = process.env.PORT || 4000;
seedDatabase();

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
