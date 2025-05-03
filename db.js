const { Pool } = require('pg');

// Create a new PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'book_notes_db',
  password: '078653',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};